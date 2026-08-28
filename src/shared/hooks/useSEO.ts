/**
 * useSEO - dynamic document head management
 *
 * Updates <title>, meta tags, canonical, and injects JSON-LD structured
 * data so each page is properly indexable by Google and discoverable by
 * LLMs (ChatGPT, Perplexity, Gemini, etc.).
 */

import { useEffect } from 'react';

export interface SeoConfig {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string[];
  image?: string;
  imageAlt?: string;
  type?: 'website' | 'article';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  jsonLd?: Record<string, any> | Record<string, any>[];
  noindex?: boolean;
}

const SITE_NAME = 'Soulsysta Collective';
const SITE_URL = 'https://soulsysta.com';
const TWITTER_HANDLE = '@soulsysta';

const upsertMeta = (selector: string, attr: string, value: string) => {
  if (typeof document === 'undefined') return;
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    const [, key, val] = selector.match(/\[(.*?)="(.*?)"\]/) || [];
    if (key && val) {
      el.setAttribute(key, val);
    }
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
};

const upsertLink = (rel: string, href: string) => {
  if (typeof document === 'undefined') return;
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
};

const removeJsonLd = (id: string) => {
  if (typeof document === 'undefined') return;
  const el = document.getElementById(id);
  if (el) el.remove();
};

const injectJsonLd = (id: string, data: Record<string, any> | Record<string, any>[]) => {
  if (typeof document === 'undefined') return;
  removeJsonLd(id);
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = id;
  script.text = JSON.stringify(data);
  document.head.appendChild(script);
};

const resolveUrl = (maybeRelative: string | undefined): string | undefined => {
  if (!maybeRelative) return undefined;
  if (/^https?:\/\//i.test(maybeRelative)) return maybeRelative;
  return `${SITE_URL}${maybeRelative.startsWith('/') ? '' : '/'}${maybeRelative}`;
};

export const useSEO = (config: SeoConfig) => {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const fullTitle = config.title.includes(SITE_NAME)
      ? config.title
      : `${config.title} | ${SITE_NAME}`;

    document.title = fullTitle;

    const canonical = config.canonical
      ? resolveUrl(config.canonical)
      : undefined;

    // Core meta
    upsertMeta('meta[name="title"]', 'content', fullTitle);
    upsertMeta('meta[name="description"]', 'content', config.description);
    upsertMeta(
      'meta[name="robots"]',
      'content',
      config.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'
    );
    if (config.keywords && config.keywords.length) {
      upsertMeta('meta[name="keywords"]', 'content', config.keywords.join(', '));
    }
    if (config.author) {
      upsertMeta('meta[name="author"]', 'content', config.author);
    }

    if (canonical) {
      upsertLink('canonical', canonical);
    }

    // Open Graph
    const ogType = config.type ?? 'website';
    upsertMeta('meta[property="og:type"]', 'content', ogType);
    upsertMeta('meta[property="og:title"]', 'content', fullTitle);
    upsertMeta('meta[property="og:description"]', 'content', config.description);
    upsertMeta('meta[property="og:site_name"]', 'content', SITE_NAME);
    if (canonical) {
      upsertMeta('meta[property="og:url"]', 'content', canonical);
    }
    if (config.image) {
      const imageUrl = resolveUrl(config.image)!;
      upsertMeta('meta[property="og:image"]', 'content', imageUrl);
      if (config.imageAlt) {
        upsertMeta('meta[property="og:image:alt"]', 'content', config.imageAlt);
      }
    }
    if (ogType === 'article') {
      if (config.publishedTime) {
        upsertMeta('meta[property="article:published_time"]', 'content', config.publishedTime);
      }
      if (config.modifiedTime) {
        upsertMeta('meta[property="article:modified_time"]', 'content', config.modifiedTime);
      }
      if (config.author) {
        upsertMeta('meta[property="article:author"]', 'content', config.author);
      }
      if (config.section) {
        upsertMeta('meta[property="article:section"]', 'content', config.section);
      }
      if (config.tags && config.tags.length) {
        // remove old article:tag entries then add new ones
        document.head
          .querySelectorAll('meta[property="article:tag"]')
          .forEach((n) => n.remove());
        config.tags.forEach((tag) => {
          const m = document.createElement('meta');
          m.setAttribute('property', 'article:tag');
          m.setAttribute('content', tag);
          document.head.appendChild(m);
        });
      }
    }

    // Twitter
    upsertMeta('meta[name="twitter:card"]', 'content', 'summary_large_image');
    upsertMeta('meta[name="twitter:title"]', 'content', fullTitle);
    upsertMeta('meta[name="twitter:description"]', 'content', config.description);
    upsertMeta('meta[name="twitter:site"]', 'content', TWITTER_HANDLE);
    upsertMeta('meta[name="twitter:creator"]', 'content', TWITTER_HANDLE);
    if (config.image) {
      upsertMeta('meta[name="twitter:image"]', 'content', resolveUrl(config.image)!);
      if (config.imageAlt) {
        upsertMeta('meta[name="twitter:image:alt"]', 'content', config.imageAlt);
      }
    }

    // JSON-LD
    if (config.jsonLd) {
      injectJsonLd('dynamic-jsonld', config.jsonLd);
    } else {
      removeJsonLd('dynamic-jsonld');
    }

    return () => {
      // Clean up article:tag we added
      if (config.tags && config.tags.length) {
        document.head
          .querySelectorAll('meta[property="article:tag"]')
          .forEach((n) => n.remove());
      }
      removeJsonLd('dynamic-jsonld');
    };
  }, [
    config.title,
    config.description,
    config.canonical,
    config.image,
    config.imageAlt,
    config.type,
    config.author,
    config.publishedTime,
    config.modifiedTime,
    config.section,
    JSON.stringify(config.keywords),
    JSON.stringify(config.tags),
    JSON.stringify(config.jsonLd),
    config.noindex,
  ]);
};

export const SITE = {
  name: SITE_NAME,
  url: SITE_URL,
  twitter: TWITTER_HANDLE,
  logo: '/images/soulsysta-logo.jpg',
};
