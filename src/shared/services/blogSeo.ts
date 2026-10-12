/**
 * Blog SEO helpers
 *
 * Builds JSON-LD structured data for blog listing and individual articles.
 * Designed for Google rich results and LLM discovery (Perplexity,
 * ChatGPT browse, Gemini, etc).
 */

import { BlogPost } from '../services/blogStore';
import { SITE } from '../hooks/useSEO';

const absoluteUrl = (maybeRelative: string | undefined): string => {
  if (!maybeRelative) return SITE.url;
  if (/^https?:\/\//i.test(maybeRelative)) return maybeRelative;
  return `${SITE.url}${maybeRelative.startsWith('/') ? '' : '/'}${maybeRelative}`;
};

const escapeHtml = (s: string): string =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export const buildArticleSlug = (post: BlogPost): string => {
  const customSlug = (post as any).slug as string | undefined;
  if (customSlug) return customSlug;
  return post.title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const buildArticleUrl = (post: BlogPost): string =>
  `${SITE.url}/blog/${buildArticleSlug(post)}`;

export const buildMetaTitle = (post: BlogPost): string => {
  const m = (post as any).metaTitle as string | undefined;
  if (m) return m;
  return `${post.title} | ${SITE.name}`;
};

export const buildMetaDescription = (post: BlogPost): string => {
  const m = (post as any).metaDescription as string | undefined;
  if (m) return m;
  if (post.subtitle) return post.subtitle;
  if (post.content) {
    const text = post.content.replace(/\s+/g, ' ').trim();
    return text.length > 155 ? `${text.slice(0, 152)}...` : text;
  }
  return `${post.title} - insights from ${SITE.name}`;
};

export const buildCanonical = (post: BlogPost): string => {
  const c = (post as any).canonicalUrl as string | undefined;
  if (c) return c;
  return buildArticleUrl(post);
};

export const buildKeywords = (post: BlogPost): string[] => {
  const k: string[] = [];
  const focus = (post as any).focusKeyword as string | undefined;
  if (focus) k.push(focus);
  k.push(post.category.toLowerCase());
  k.push('therapy', 'wellness', 'soulsysta');
  if (post.tags?.length) k.push(...post.tags.map((t) => t.toLowerCase()));
  return Array.from(new Set(k));
};

export const buildArticleJsonLd = (post: BlogPost) => {
  const url = buildCanonical(post);
  const headline = buildMetaTitle(post);
  const description = buildMetaDescription(post);
  const image =
    ((post as any).ogImage as string | undefined) || post.coverImage || SITE.logo;
  const altText = (post as any).altText as string | undefined;
  const focus = (post as any).focusKeyword as string | undefined;

  const wordCount = post.content?.split(/\s+/).filter(Boolean).length ?? 0;

  const article: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': url,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    headline,
    description,
    image: {
      '@type': 'ImageObject',
      url: absoluteUrl(image),
      ...(altText ? { caption: altText } : {}),
    },
    datePublished: post.publishedDate,
    dateModified: (post as any).modifiedTime || post.publishedDate,
    author: {
      '@type': 'Person',
      name: post.authorName,
      ...(post.authorRole ? { jobTitle: post.authorRole } : {}),
      worksFor: {
        '@type': 'Organization',
        name: SITE.name,
        url: SITE.url,
      },
    },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl(SITE.logo),
      },
    },
    articleSection: post.category,
    keywords: buildKeywords(post).join(', '),
    wordCount,
    inLanguage: 'en-GB',
    isAccessibleForFree: true,
  };

  if (focus) {
    article.about = { '@type': 'Thing', name: focus };
  }

  if (post.tags?.length) {
    article.keywords = `${article.keywords}, ${post.tags.join(', ')}`;
  }

  return article;
};

export const buildBlogListJsonLd = (posts: BlogPost[]) => {
  const url = `${SITE.url}/blog`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': url,
    name: `${SITE.name} Journal`,
    description:
      'Daily articles on therapy, somatic healing, burnout recovery, generational healing, books, youth mentorship, and the work of Soulsysta Collective.',
    url,
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl(SITE.logo),
      },
    },
    blogPost: posts.slice(0, 20).map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      url: buildArticleUrl(p),
      datePublished: p.publishedDate,
      author: { '@type': 'Person', name: p.authorName },
      articleSection: p.category,
    })),
  };
};

export const buildBreadcrumbJsonLd = (
  items: { name: string; url: string }[]
) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, idx) => ({
    '@type': 'ListItem',
    position: idx + 1,
    name: item.name,
    item: item.url,
  })),
});

export const buildFaqJsonLdFromContent = (content: string) => {
  // Naive: find "Q:" / "?" or "## Question" patterns; fall back to empty.
  if (!content) return null;
  const lines = content.split(/\n+/);
  const faqs: { q: string; a: string }[] = [];
  for (let i = 0; i < lines.length - 1; i += 1) {
    const line = lines[i].trim();
    const next = lines[i + 1]?.trim() ?? '';
    const looksLikeHeading = /^#+\s*(.+\?)/.test(line);
    const looksLikeQA = /^q[:.)]/i.test(line) && /^a[:.)]/i.test(next);
    if (looksLikeQA) {
      const q = line.replace(/^q[:.)\s]+/i, '').trim();
      const a = next.replace(/^a[:.)\s]+/i, '').trim();
      if (q && a) faqs.push({ q, a });
    } else if (looksLikeHeading && next) {
      faqs.push({ q: line.replace(/^#+\s*/, '').trim(), a: next });
    }
  }
  if (faqs.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: a,
      },
    })),
  };
};

export const sanitizeContentForHtml = (content: string): string => {
  if (!content) return '';
  // Allow only basic markdown-ish structures; escape everything else.
  return escapeHtml(content)
    .replace(/^##\s+(.+)$/gm, '<h2 id="$1">$1</h2>')
    .replace(/^###\s+(.+)$/gm, '<h3 id="$1">$1</h3>')
    .replace(/^#\s+(.+)$/gm, '<h1 id="$1">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^/, '<p>')
    .replace(/$/, '</p>');
};

export const sanitizeAndEnhanceContentForHtml = (content: string): string => {
  if (!content) return '';
  const html = sanitizeContentForHtml(content);
  
  // Add theme-aware hover effects
  return html
    .replace(/<p>(.*?)<\/p>/g, '<p class="mb-4 text-forest/80 leading-relaxed hover:text-gold transition-colors duration-300">$1</p>')
    .replace(/<h1[^>]*>(.*?)<\/h1>/g, '<h1 class="font-serif text-4xl font-bold text-forest mb-6 hover:text-gold transition-colors duration-300" id="$1">$1</h1>')
    .replace(/<h2[^>]*>(.*?)<\/h2>/g, '<h2 class="font-serif text-3xl font-bold text-forest mb-4 mt-8 hover:text-gold transition-colors duration-300" id="$1">$1</h2>')
    .replace(/<h3[^>]*>(.*?)<\/h3>/g, '<h3 class="font-serif text-2xl font-semibold text-forest mb-3 mt-6 hover:text-gold transition-colors duration-300" id="$1">$1</h3>')
    .replace(/<li>(.*?)<\/li>/g, '<li class="mb-2 text-forest/80 hover:text-gold transition-colors duration-300">$1</li>')
    .replace(/<strong>(.*?)<\/strong>/g, '<strong class="text-gold font-semibold">$1</strong>')
    .replace(/<em>(.*?)<\/em>/g, '<em class="italic text-forest/70 hover:text-gold transition-colors duration-300">$1</em>');
};
