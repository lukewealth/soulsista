import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Lock,
  Mail,
  Eye,
  EyeOff,
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  Plus,
  Edit,
  Trash2,
  Save,
  LogOut,
  TrendingUp,
  Calendar,
  MessageCircle,
  Upload,
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Sparkles,
  Hash,
  Type,
  FileSearch,
  AlertCircle,
  CheckCircle2,
  Link as LinkIcon,
  Image,
} from 'lucide-react';
import { blogStore, BlogPost } from '../shared/services/blogStore';
import { ThemeToggle } from '../shared/theme';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

type AdminTab = 'dashboard' | 'posts' | 'users' | 'settings' | 'create-post' | 'edit-post';

interface SeoFields {
  metaTitle: string;
  metaDescription: string;
  slug: string;
  focusKeyword: string;
  canonicalUrl: string;
  altText: string;
  ogImage: string;
  socialTitle: string;
  socialDescription: string;
}

const DEFAULT_SEO: SeoFields = {
  metaTitle: '',
  metaDescription: '',
  slug: '',
  focusKeyword: '',
  canonicalUrl: '',
  altText: '',
  ogImage: '',
  socialTitle: '',
  socialDescription: '',
};

const slugify = (input: string): string =>
  input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

const SeoChecklist: React.FC<{ post: BlogPost; seo: SeoFields }> = ({ post, seo }) => {
  const checks = useMemo(() => {
    const title = (seo.metaTitle || post.title || '').trim();
    const desc = (seo.metaDescription || post.subtitle || '').trim();
    const focus = (seo.focusKeyword || '').trim().toLowerCase();
    const content = (post.content || '').trim();
    const slug = (seo.slug || '').toLowerCase();

    return [
      {
        label: 'Meta title is 50-60 characters',
        pass: title.length >= 40 && title.length <= 65,
        detail: `Currently ${title.length} characters`,
      },
      {
        label: 'Meta description is 140-160 characters',
        pass: desc.length >= 120 && desc.length <= 170,
        detail: `Currently ${desc.length} characters`,
      },
      {
        label: 'Focus keyword is set',
        pass: focus.length > 0,
        detail: focus ? `Targeting "${focus}"` : 'No focus keyword set',
      },
      {
        label: 'Focus keyword appears in title',
        pass: !!focus && title.toLowerCase().includes(focus),
        detail: focus
          ? title.toLowerCase().includes(focus)
            ? 'Keyword found in title'
            : 'Add the keyword to your title'
          : 'Set a focus keyword first',
      },
      {
        label: 'Focus keyword appears in description',
        pass: !!focus && desc.toLowerCase().includes(focus),
        detail: focus
          ? desc.toLowerCase().includes(focus)
            ? 'Keyword found in description'
            : 'Add the keyword to your description'
          : 'Set a focus keyword first',
      },
      {
        label: 'Focus keyword appears in first 100 words',
        pass:
          !!focus &&
          content
            .toLowerCase()
            .split(/\s+/)
            .slice(0, 100)
            .join(' ')
            .includes(focus),
        detail: focus ? 'LLM-friendly opening paragraph' : 'Set a focus keyword',
      },
      {
        label: 'Content length is 600+ words',
        pass: content.split(/\s+/).filter(Boolean).length >= 600,
        detail: `${content.split(/\s+/).filter(Boolean).length} words written`,
      },
      {
        label: 'URL slug is set and short',
        pass: slug.length > 0 && slug.length <= 60,
        detail: slug ? `/${slug}` : 'No slug yet',
      },
      {
        label: 'Cover image has alt text',
        pass: (seo.altText || '').trim().length > 0,
        detail: (seo.altText || '').trim() || 'No alt text',
      },
      {
        label: 'OG image is set for social sharing',
        pass: !!seo.ogImage || !!post.coverImage,
        detail: seo.ogImage || post.coverImage || 'No social image',
      },
      {
        label: 'At least 3 tags',
        pass: post.tags.length >= 3,
        detail: `${post.tags.length} tags added`,
      },
      {
        label: 'Category is selected',
        pass: !!post.category,
        detail: post.category || 'No category',
      },
    ];
  }, [post, seo]);

  const score = checks.filter((c) => c.pass).length;
  const percent = Math.round((score / checks.length) * 100);
  const grade = percent >= 85 ? 'Excellent' : percent >= 65 ? 'Good' : percent >= 40 ? 'Needs work' : 'Poor';

  return (
    <div className="bg-ivory-elevated border border-forest/15 rounded-2xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FileSearch className="w-5 h-5 text-gold" />
          <h3 className="font-serif text-lg font-bold text-forest">SEO Score</h3>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-forest">{percent}%</div>
          <div className="text-xs uppercase tracking-widest text-forest/60 font-semibold">{grade}</div>
        </div>
      </div>
      <div className="h-2 w-full bg-forest/10 rounded-full overflow-hidden mb-4">
        <div
          className={`h-full transition-all ${
            percent >= 85 ? 'bg-green-600' : percent >= 65 ? 'bg-gold' : 'bg-red-500'
          }`}
          style={{ width: `${percent}%` }}
        />
      </div>
      <ul className="space-y-2 text-sm">
        {checks.map((c) => (
          <li key={c.label} className="flex items-start gap-2">
            {c.pass ? (
              <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
            )}
            <div className="min-w-0">
              <div className={c.pass ? 'text-forest font-medium' : 'text-forest/80'}>
                {c.label}
              </div>
              {c.detail && (
                <div className="text-xs text-forest/55">{c.detail}</div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [loginError, setLoginError] = useState('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [, setEditingPostId] = useState<string | null>(null);
  const [seoFields, setSeoFields] = useState<SeoFields>(DEFAULT_SEO);
  const [seoExpanded, setSeoExpanded] = useState(true);
  const [socialExpanded, setSocialExpanded] = useState(false);
  const [saveNotice, setSaveNotice] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Blog posts from shared store (localStorage-backed)
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => blogStore.getAll());

  useEffect(() => {
    return blogStore.subscribe((next) => setBlogPosts(next));
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (email === 'admin@soulsysta.com' && password === 'admin123') {
      setIsLoggedIn(true);
    } else {
      setLoginError('Invalid credentials. Use admin@soulsysta.com / admin123');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
    setActiveTab('dashboard');
    setEditingPostId(null);
    setSeoFields(DEFAULT_SEO);
  };

  const handleCreatePost = () => {
    setEditingPostId(null);
    setSeoFields(DEFAULT_SEO);
    setNewPost({
      id: `post-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      title: '',
      subtitle: '',
      category: 'Wellness',
      authorName: '',
      authorRole: '',
      publishedDate: new Date().toISOString().split('T')[0],
      readTimeMinutes: 5,
      coverImage: '',
      content: '',
      tags: [],
      video: '',
      featured: false,
    });
    setImagePreview(null);
    setTagsInput('');
    setActiveTab('create-post');
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPostId(post.id);
    setNewPost({ ...post });
    setImagePreview(post.coverImage || null);
    setSeoFields({
      metaTitle: (post as any).metaTitle || '',
      metaDescription: (post as any).metaDescription || '',
      slug: (post as any).slug || slugify(post.title),
      focusKeyword: (post as any).focusKeyword || '',
      canonicalUrl: (post as any).canonicalUrl || '',
      altText: (post as any).altText || '',
      ogImage: (post as any).ogImage || '',
      socialTitle: (post as any).socialTitle || '',
      socialDescription: (post as any).socialDescription || '',
    });
    setActiveTab('edit-post');
  };

  const handleSavePost = (post: BlogPost) => {
    const merged: BlogPost = {
      ...post,
      ...(seoFields as any),
    };
    const existing = blogStore.getAll().find((p) => p.id === merged.id);
    if (existing) {
      blogStore.update(merged.id, merged);
      setSaveNotice({ type: 'success', message: 'Post updated successfully' });
    } else {
      const { id: _ignored, ...rest } = merged;
      const created = blogStore.add({ ...rest, status: 'published' });
      setNewPost({ ...created });
      setEditingPostId(created.id);
      setSaveNotice({ type: 'success', message: 'Post published successfully' });
    }
    setTimeout(() => setSaveNotice(null), 2500);
  };

  const handleDeletePost = (id: string) => {
    if (!window.confirm('Delete this post? This action cannot be undone.')) return;
    blogStore.remove(id);
    setSaveNotice({ type: 'success', message: 'Post deleted' });
    setTimeout(() => setSaveNotice(null), 2000);
  };

  const handleToggleStatus = (id: string) => {
    const post = blogStore.getAll().find((p) => p.id === id);
    if (!post) return;
    const nextStatus = (post.status ?? 'published') === 'published' ? 'draft' : 'published';
    blogStore.update(id, { status: nextStatus });
  };

  // Create Post Form State
  const [newPost, setNewPost] = useState<BlogPost>({
    id: `post-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    title: '',
    subtitle: '',
    category: 'Wellness',
    authorName: '',
    authorRole: '',
    publishedDate: new Date().toISOString().split('T')[0],
    readTimeMinutes: 5,
    coverImage: '',
    content: '',
    tags: [],
    video: '',
    featured: false,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [tagsInput, setTagsInput] = useState('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleTagAdd = () => {
    const trimmed = tagsInput.trim();
    if (!trimmed) return;
    setNewPost((prev) => ({
      ...prev,
      tags: [...prev.tags, trimmed],
    }));
    setTagsInput('');
  };

  const handleTagRemove = (tag: string) => {
    setNewPost((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  // Auto-derive slug when user types title (only if slug hasn't been customised)
  useEffect(() => {
    if (activeTab === 'create-post' || activeTab === 'edit-post') {
      setSeoFields((prev) => ({
        ...prev,
        slug: prev.slug && prev.slug !== slugify(prev.metaTitle)
          ? prev.slug
          : slugify(newPost.title),
        metaTitle: prev.metaTitle || newPost.title,
        metaDescription: prev.metaDescription || newPost.subtitle,
        altText: prev.altText || newPost.title,
        socialTitle: prev.socialTitle || newPost.title,
        socialDescription: prev.socialDescription || newPost.subtitle,
        ogImage: prev.ogImage || newPost.coverImage,
      }));
    }
  }, [newPost.title, newPost.subtitle, newPost.coverImage, activeTab]);

  if (!isOpen) return null;

  // ----- LOGIN -----
  if (!isLoggedIn) {
    return (
      <div className="fixed inset-0 z-50 bg-forest/95 backdrop-blur-md flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-ivory-elevated rounded-2xl p-8 max-w-md w-full shadow-2xl relative"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-forest/70 hover:text-forest rounded-full hover:bg-forest/10"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-forest rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-gold" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-forest">Admin Login</h2>
            <p className="text-forest/70 text-sm mt-2">Access the Soulsysta CRM Dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-forest mb-2 uppercase tracking-wide">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-forest/50" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@soulsysta.com"
                  className="w-full pl-10 pr-4 py-3 border-2 border-forest/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/60 focus:border-gold text-forest placeholder-forest/40"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-forest mb-2 uppercase tracking-wide">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-forest/50" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 border-2 border-forest/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/60 focus:border-gold text-forest placeholder-forest/40"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-forest/60 hover:text-forest"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {loginError && (
              <div className="bg-red-50 border-2 border-red-300 text-red-800 px-4 py-3 rounded-lg text-sm font-medium">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-forest text-ivory font-semibold rounded-lg hover:bg-forest/90 transition-all shadow-md"
            >
              Sign In
            </button>

            <div className="text-center text-xs text-forest/70 mt-4">
              <p>Demo: admin@soulsysta.com / admin123</p>
            </div>
          </form>
        </motion.div>
      </div>
    );
  }

  // ----- DASHBOARD -----
  const navItems: { id: AdminTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'posts', label: 'Blog Posts', icon: FileText },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-ivory flex">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: sidebarCollapsed ? 80 : 256 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className="bg-forest text-ivory flex flex-col flex-shrink-0 shadow-2xl overflow-hidden"
      >
        <div className="p-5 border-b border-ivory/15 flex items-center justify-between gap-2">
          {!sidebarCollapsed && (
            <div className="min-w-0">
              <h1 className="font-serif text-xl font-bold text-ivory">Soulsysta</h1>
              <p className="text-xs text-gold/90 mt-0.5">Admin Dashboard</p>
            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed((c) => !c)}
            className="p-2 rounded-lg hover:bg-ivory/15 text-ivory/80 hover:text-ivory transition-colors flex-shrink-0"
            aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            title={sidebarCollapsed ? 'Expand' : 'Collapse'}
          >
            {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                title={sidebarCollapsed ? item.label : undefined}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-gold text-forest shadow-md'
                    : 'text-ivory/90 hover:bg-ivory/10'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!sidebarCollapsed && <span className="font-semibold">{item.label}</span>}
              </button>
            );
          })}

          <button
            onClick={handleCreatePost}
            title={sidebarCollapsed ? 'Create Post' : undefined}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all mt-4 ${
              activeTab === 'create-post' || activeTab === 'edit-post'
                ? 'bg-gold text-forest shadow-md'
                : 'bg-ivory/10 text-ivory hover:bg-ivory/15 border border-ivory/15'
            }`}
          >
            <Plus className="w-5 h-5 flex-shrink-0" />
            {!sidebarCollapsed && <span className="font-semibold">Create Post</span>}
          </button>
        </nav>

        <div className="p-3 border-t border-ivory/15">
          <button
            onClick={handleLogout}
            title={sidebarCollapsed ? 'Logout' : undefined}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-ivory/10 text-ivory/90 transition-all"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!sidebarCollapsed && <span className="font-semibold">Logout</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-ivory">
        {/* Topbar */}
        <div className="sticky top-0 z-10 bg-ivory-elevated/95 backdrop-blur border-b border-forest/10 px-8 py-4 flex items-center justify-between">
          <div>
            <h2 className="font-serif text-2xl font-bold text-forest">
              {activeTab === 'dashboard' && 'Dashboard Overview'}
              {activeTab === 'posts' && 'Blog Posts'}
              {activeTab === 'users' && 'User Management'}
              {activeTab === 'settings' && 'Settings'}
              {activeTab === 'create-post' && 'Create New Blog Post'}
              {activeTab === 'edit-post' && 'Edit Blog Post'}
            </h2>
            <p className="text-sm text-forest/60 mt-0.5">
              {activeTab === 'dashboard' && `${blogPosts.length} total posts in the system`}
              {activeTab === 'posts' && 'Manage all your published and draft articles'}
              {activeTab === 'create-post' && 'Publish a new article with full SEO optimization'}
              {activeTab === 'edit-post' && 'Update content, SEO, and metadata'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle variant="menu" />
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-forest/5 rounded-full text-xs text-forest/70 font-medium">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              Admin: {email || 'admin@soulsysta.com'}
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-forest/10 rounded-lg text-forest/70 hover:text-forest transition-colors"
              aria-label="Close dashboard"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Save Notice */}
        <AnimatePresence>
          {saveNotice && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`mx-8 mt-4 px-4 py-3 rounded-lg flex items-center gap-2 font-medium shadow-md ${
                saveNotice.type === 'success'
                  ? 'bg-green-50 border-2 border-green-300 text-green-800'
                  : 'bg-red-50 border-2 border-red-300 text-red-800'
              }`}
            >
              <Check className="w-4 h-4" />
              {saveNotice.message}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="p-8">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-ivory-elevated rounded-xl p-6 shadow-sm border border-forest/10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-gold" />
                    </div>
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-forest">{blogPosts.length}</h3>
                  <p className="text-sm text-forest/70 mt-1 font-medium">Total Posts</p>
                </div>

                <div className="bg-ivory-elevated rounded-xl p-6 shadow-sm border border-forest/10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center">
                      <Eye className="w-6 h-6 text-gold" />
                    </div>
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-forest">
                    {blogPosts.reduce((sum, post) => sum + post.readTimeMinutes, 0)}
                  </h3>
                  <p className="text-sm text-forest/70 mt-1 font-medium">Total Read Time (min)</p>
                </div>

                <div className="bg-ivory-elevated rounded-xl p-6 shadow-sm border border-forest/10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-gold" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold text-forest">
                    {blogPosts.filter((p) => (p.status ?? 'published') === 'published').length}
                  </h3>
                  <p className="text-sm text-forest/70 mt-1 font-medium">Published</p>
                </div>

                <div className="bg-ivory-elevated rounded-xl p-6 shadow-sm border border-forest/10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center">
                      <MessageCircle className="w-6 h-6 text-gold" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold text-forest">42</h3>
                  <p className="text-sm text-forest/70 mt-1 font-medium">Comments</p>
                </div>
              </div>

              <div className="bg-ivory-elevated rounded-xl p-6 shadow-sm border border-forest/10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-serif text-xl font-bold text-forest">Recent Posts</h3>
                  <button
                    onClick={() => setActiveTab('posts')}
                    className="text-sm text-gold hover:text-forest font-semibold"
                  >
                    View all →
                  </button>
                </div>
                {blogPosts.length === 0 ? (
                  <div className="text-center py-12 text-forest/60">
                    <FileText className="w-12 h-12 mx-auto mb-3 text-forest/30" />
                    <p>No posts yet. Create your first one.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {blogPosts.slice(0, 5).map((post) => (
                      <div
                        key={post.id}
                        className="flex items-center justify-between p-4 bg-ivory rounded-lg border border-forest/5"
                      >
                        <div className="min-w-0 flex-1 mr-4">
                          <h4 className="font-semibold text-forest truncate">{post.title}</h4>
                          <p className="text-sm text-forest/60">
                            {post.category} • {post.publishedDate}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0 ${
                            post.featured
                              ? 'bg-gold text-forest'
                              : (post.status ?? 'published') === 'published'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {post.featured
                            ? 'Featured'
                            : (post.status ?? 'published') === 'published'
                            ? 'Published'
                            : 'Draft'}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Posts Tab */}
          {activeTab === 'posts' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-forest/70 text-sm">
                    {blogPosts.length} {blogPosts.length === 1 ? 'post' : 'posts'} •
                    {' '}
                    {blogPosts.filter((p) => (p.status ?? 'published') === 'published').length} published
                  </p>
                </div>
                <button
                  onClick={handleCreatePost}
                  className="px-6 py-3 bg-forest text-ivory font-semibold rounded-lg hover:bg-forest/90 transition-all flex items-center gap-2 shadow-sm"
                >
                  <Plus className="w-5 h-5" />
                  Create Post
                </button>
              </div>

              {blogPosts.length === 0 ? (
                <div className="bg-ivory-elevated rounded-xl p-16 shadow-sm border border-forest/10 text-center">
                  <FileText className="w-16 h-16 text-forest/20 mx-auto mb-4" />
                  <h3 className="font-serif text-xl font-bold text-forest mb-2">No blog posts yet</h3>
                  <p className="text-forest/60 mb-6">Create your first article to get started.</p>
                  <button
                    onClick={handleCreatePost}
                    className="px-6 py-3 bg-forest text-ivory font-semibold rounded-lg hover:bg-forest/90 transition-all inline-flex items-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Create First Post
                  </button>
                </div>
              ) : (
                <div className="bg-ivory-elevated rounded-xl shadow-sm border border-forest/10 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-forest text-ivory">
                        <tr>
                          <th className="text-left px-6 py-4 font-semibold">Title</th>
                          <th className="text-left px-6 py-4 font-semibold">Category</th>
                          <th className="text-left px-6 py-4 font-semibold">Status</th>
                          <th className="text-left px-6 py-4 font-semibold">Author</th>
                          <th className="text-left px-6 py-4 font-semibold">Read</th>
                          <th className="text-left px-6 py-4 font-semibold">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {blogPosts.map((post) => (
                          <tr key={post.id} className="border-b border-forest/10 hover:bg-ivory">
                            <td className="px-6 py-4 font-semibold text-forest max-w-xs">
                              <div className="truncate">{post.title}</div>
                            </td>
                            <td className="px-6 py-4 text-forest/80">{post.category}</td>
                            <td className="px-6 py-4">
                              <button
                                onClick={() => handleToggleStatus(post.id)}
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                  post.featured
                                    ? 'bg-gold text-forest'
                                    : (post.status ?? 'published') === 'published'
                                    ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                    : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                                }`}
                              >
                                {post.featured
                                  ? 'Featured'
                                  : (post.status ?? 'published') === 'published'
                                  ? 'Published'
                                  : 'Draft'}
                              </button>
                            </td>
                            <td className="px-6 py-4 text-forest/80">{post.authorName}</td>
                            <td className="px-6 py-4 text-forest/80">{post.readTimeMinutes} min</td>
                            <td className="px-6 py-4">
                              <div className="flex gap-1">
                                <button
                                  onClick={() => handleEditPost(post)}
                                  className="p-2 text-forest/70 hover:text-gold rounded-lg hover:bg-forest/10"
                                  aria-label="Edit post"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeletePost(post.id)}
                                  className="p-2 text-forest/70 hover:text-red-700 rounded-lg hover:bg-red-50"
                                  aria-label="Delete post"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div>
              <div className="bg-ivory-elevated rounded-xl p-12 shadow-sm border border-forest/10 text-center">
                <Users className="w-16 h-16 text-forest/20 mx-auto mb-4" />
                <h3 className="font-serif text-xl font-bold text-forest mb-2">Coming Soon</h3>
                <p className="text-forest/70">User management features will be available in the next update.</p>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div>
              <div className="bg-ivory-elevated rounded-xl p-12 shadow-sm border border-forest/10 text-center">
                <Settings className="w-16 h-16 text-forest/20 mx-auto mb-4" />
                <h3 className="font-serif text-xl font-bold text-forest mb-2">Coming Soon</h3>
                <p className="text-forest/70">Settings configuration will be available in the next update.</p>
              </div>
            </div>
          )}

          {/* Create / Edit Post */}
          {(activeTab === 'create-post' || activeTab === 'edit-post') && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <form
                  className="space-y-6"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const finalPost: BlogPost = {
                      ...newPost,
                      coverImage: imagePreview || newPost.coverImage,
                    };
                    handleSavePost(finalPost);
                    if (activeTab === 'create-post') {
                      setNewPost({
                        id: `post-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
                        title: '',
                        subtitle: '',
                        category: 'Wellness',
                        authorName: '',
                        authorRole: '',
                        publishedDate: new Date().toISOString().split('T')[0],
                        readTimeMinutes: 5,
                        coverImage: '',
                        content: '',
                        tags: [],
                        video: '',
                        featured: false,
                      });
                      setImagePreview(null);
                      setTagsInput('');
                      setSeoFields(DEFAULT_SEO);
                    }
                  }}
                >
                  <div className="bg-ivory-elevated rounded-2xl p-6 shadow-sm border border-forest/10">
                    <div className="flex items-center gap-2 mb-5">
                      <Type className="w-5 h-5 text-gold" />
                      <h3 className="font-serif text-lg font-bold text-forest">Post Information</h3>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-forest mb-2 uppercase tracking-wide">
                          Title *
                        </label>
                        <input
                          value={newPost.title}
                          onChange={(e) => setNewPost((prev) => ({ ...prev, title: e.target.value }))}
                          placeholder="The Neuroscience of Somatic Healing..."
                          className="w-full px-4 py-3 border-2 border-forest/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/60 focus:border-gold text-forest placeholder-forest/40"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-forest mb-2 uppercase tracking-wide">
                          Subtitle / Excerpt *
                        </label>
                        <textarea
                          value={newPost.subtitle}
                          onChange={(e) => setNewPost((prev) => ({ ...prev, subtitle: e.target.value }))}
                          placeholder="A compelling summary that hooks readers and explains the value..."
                          rows={2}
                          className="w-full px-4 py-3 border-2 border-forest/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/60 focus:border-gold text-forest placeholder-forest/40 resize-none"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-forest mb-2 uppercase tracking-wide">
                            Category *
                          </label>
                          <select
                            value={newPost.category}
                            onChange={(e) =>
                              setNewPost((prev) => ({
                                ...prev,
                                category: e.target.value as BlogPost['category'],
                              }))
                            }
                            className="w-full px-4 py-3 border-2 border-forest/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/60 focus:border-gold text-forest bg-ivory-elevated"
                          >
                            <option value="Therapy">Therapy</option>
                            <option value="Wellness">Wellness</option>
                            <option value="Youth">Youth</option>
                            <option value="Books">Books</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-forest mb-2 uppercase tracking-wide">
                            Featured
                          </label>
                          <select
                            value={newPost.featured ? 'true' : 'false'}
                            onChange={(e) =>
                              setNewPost((prev) => ({ ...prev, featured: e.target.value === 'true' }))
                            }
                            className="w-full px-4 py-3 border-2 border-forest/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/60 focus:border-gold text-forest bg-ivory-elevated"
                          >
                            <option value="false">Not Featured</option>
                            <option value="true">Featured</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-ivory-elevated rounded-2xl p-6 shadow-sm border border-forest/10">
                    <div className="flex items-center gap-2 mb-5">
                      <Users className="w-5 h-5 text-gold" />
                      <h3 className="font-serif text-lg font-bold text-forest">Author & Metadata</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-forest mb-2 uppercase tracking-wide">
                          Author Name *
                        </label>
                        <input
                          value={newPost.authorName}
                          onChange={(e) => setNewPost((prev) => ({ ...prev, authorName: e.target.value }))}
                          placeholder="Dr. Julian Vance"
                          className="w-full px-4 py-3 border-2 border-forest/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/60 focus:border-gold text-forest placeholder-forest/40"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-forest mb-2 uppercase tracking-wide">
                          Author Role
                        </label>
                        <input
                          value={newPost.authorRole}
                          onChange={(e) => setNewPost((prev) => ({ ...prev, authorRole: e.target.value }))}
                          placeholder="Senior Clinical Psychologist"
                          className="w-full px-4 py-3 border-2 border-forest/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/60 focus:border-gold text-forest placeholder-forest/40"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-forest mb-2 uppercase tracking-wide">
                          Read Time (minutes)
                        </label>
                        <input
                          value={newPost.readTimeMinutes}
                          type="number"
                          min={1}
                          onChange={(e) =>
                            setNewPost((prev) => ({
                              ...prev,
                              readTimeMinutes: parseInt(e.target.value, 10) || 5,
                            }))
                          }
                          className="w-full px-4 py-3 border-2 border-forest/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/60 focus:border-gold text-forest"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-forest mb-2 uppercase tracking-wide">
                          Published Date
                        </label>
                        <input
                          value={newPost.publishedDate}
                          onChange={(e) => setNewPost((prev) => ({ ...prev, publishedDate: e.target.value }))}
                          type="date"
                          className="w-full px-4 py-3 border-2 border-forest/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/60 focus:border-gold text-forest"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-ivory-elevated rounded-2xl p-6 shadow-sm border border-forest/10">
                    <div className="flex items-center gap-2 mb-5">
                      <FileText className="w-5 h-5 text-gold" />
                      <h3 className="font-serif text-lg font-bold text-forest">Article Content</h3>
                    </div>
                    <textarea
                      value={newPost.content}
                      onChange={(e) => setNewPost((prev) => ({ ...prev, content: e.target.value }))}
                      rows={14}
                      className="w-full px-4 py-3 border-2 border-forest/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/60 focus:border-gold text-forest bg-forest/5 font-mono text-sm leading-relaxed"
                      placeholder="Write your full article here. For LLM/Google discovery: lead with a clear answer to the reader's question, use ## subheadings every 200-300 words, include concrete examples, and target 600+ words."
                    />
                    <p className="text-xs text-forest/60 mt-2 flex items-start gap-1">
                      <Sparkles className="w-3 h-3 mt-0.5 flex-shrink-0" />
                      <span>
                        <strong>LLM/SEO tip:</strong> Open with a 40-60 word summary, use descriptive H2/H3
                        headings, answer a specific question, cite concrete data, and end with a takeaway.
                      </span>
                    </p>
                  </div>

                  {/* SEO Panel */}
                  <div className="bg-ivory-elevated rounded-2xl shadow-sm border border-forest/10 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setSeoExpanded((v) => !v)}
                      className="w-full flex items-center justify-between p-6 hover:bg-forest/5 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <FileSearch className="w-5 h-5 text-gold" />
                        <h3 className="font-serif text-lg font-bold text-forest">SEO Settings</h3>
                        <span className="text-xs text-forest/60 ml-2">Meta, slug, keywords</span>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-forest/60 transition-transform ${
                          seoExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {seoExpanded && (
                      <div className="px-6 pb-6 space-y-4 border-t border-forest/10">
                        <div>
                          <label className="block text-xs font-semibold text-forest mb-2 uppercase tracking-wide mt-4">
                            <Hash className="w-3 h-3 inline mr-1" />
                            Focus Keyword *
                          </label>
                          <input
                            value={seoFields.focusKeyword}
                            onChange={(e) =>
                              setSeoFields((prev) => ({ ...prev, focusKeyword: e.target.value }))
                            }
                            placeholder="e.g. somatic therapy for trauma"
                            className="w-full px-4 py-3 border-2 border-forest/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/60 focus:border-gold text-forest placeholder-forest/40"
                          />
                          <p className="text-xs text-forest/60 mt-1">
                            The single primary phrase you want this post to rank for.
                          </p>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-forest mb-2 uppercase tracking-wide">
                            URL Slug
                          </label>
                          <div className="flex items-center gap-2">
                            <span className="text-forest/60 text-sm">/blog/</span>
                            <input
                              value={seoFields.slug}
                              onChange={(e) =>
                                setSeoFields((prev) => ({
                                  ...prev,
                                  slug: slugify(e.target.value),
                                }))
                              }
                              placeholder="somatic-therapy-for-trauma"
                              className="flex-1 px-4 py-3 border-2 border-forest/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/60 focus:border-gold text-forest placeholder-forest/40"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-forest mb-2 uppercase tracking-wide">
                            Meta Title ({seoFields.metaTitle.length}/60)
                          </label>
                          <input
                            value={seoFields.metaTitle}
                            onChange={(e) =>
                              setSeoFields((prev) => ({ ...prev, metaTitle: e.target.value }))
                            }
                            placeholder="Somatic Therapy for Trauma | Soulsysta"
                            className="w-full px-4 py-3 border-2 border-forest/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/60 focus:border-gold text-forest placeholder-forest/40"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-forest mb-2 uppercase tracking-wide">
                            Meta Description ({seoFields.metaDescription.length}/160)
                          </label>
                          <textarea
                            value={seoFields.metaDescription}
                            onChange={(e) =>
                              setSeoFields((prev) => ({ ...prev, metaDescription: e.target.value }))
                            }
                            placeholder="How body-based therapy helps release stored trauma. Evidence-based guide with neuroscience, techniques, and practitioner insights."
                            rows={3}
                            className="w-full px-4 py-3 border-2 border-forest/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/60 focus:border-gold text-forest placeholder-forest/40 resize-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-forest mb-2 uppercase tracking-wide">
                            Canonical URL
                          </label>
                          <input
                            value={seoFields.canonicalUrl}
                            onChange={(e) =>
                              setSeoFields((prev) => ({ ...prev, canonicalUrl: e.target.value }))
                            }
                            placeholder="https://soulsysta.com/blog/somatic-therapy-for-trauma"
                            className="w-full px-4 py-3 border-2 border-forest/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/60 focus:border-gold text-forest placeholder-forest/40"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Media */}
                  <div className="bg-ivory-elevated rounded-2xl p-6 shadow-sm border border-forest/10">
                    <div className="flex items-center gap-2 mb-5">
                      <Image className="w-5 h-5 text-gold" />
                      <h3 className="font-serif text-lg font-bold text-forest">Cover Image & Media</h3>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-forest mb-2 uppercase tracking-wide">
                          Cover Image *
                        </label>
                        <div className="relative">
                          {imagePreview && (
                            <img
                              src={imagePreview}
                              alt={seoFields.altText || newPost.title}
                              className="w-full h-56 object-cover rounded-lg mb-3 border border-forest/10"
                            />
                          )}
                          <label className="block">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageChange}
                              className="hidden"
                            />
                            <span className="cursor-pointer w-full px-4 py-3 bg-forest/5 text-forest/80 rounded-lg hover:bg-forest/10 transition-all flex items-center justify-center gap-3 border-2 border-dashed border-forest/20 font-medium">
                              <Upload className="w-4 h-4" />
                              {imagePreview ? 'Change Image' : 'Upload Cover Image'}
                            </span>
                          </label>
                          <p className="text-xs text-forest/60 mt-2">
                            Recommended: 1200×630px, JPG/PNG/WebP, &lt; 500KB
                          </p>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-forest mb-2 uppercase tracking-wide">
                          Image Alt Text *
                        </label>
                        <input
                          value={seoFields.altText}
                          onChange={(e) =>
                            setSeoFields((prev) => ({ ...prev, altText: e.target.value }))
                          }
                          placeholder="Describe the image for screen readers and SEO..."
                          className="w-full px-4 py-3 border-2 border-forest/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/60 focus:border-gold text-forest placeholder-forest/40"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-forest mb-2 uppercase tracking-wide">
                          Video URL (optional)
                        </label>
                        <input
                          value={newPost.video || ''}
                          onChange={(e) =>
                            setNewPost((prev) => ({ ...prev, video: e.target.value }))
                          }
                          placeholder="https://www.youtube.com/watch?v=..."
                          className="w-full px-4 py-3 border-2 border-forest/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/60 focus:border-gold text-forest placeholder-forest/40"
                        />
                        <p className="text-xs text-forest/60 mt-1">YouTube, Vimeo, or direct MP4</p>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-forest mb-2 uppercase tracking-wide">
                          Tags (press Enter to add) *
                        </label>
                        <div className="flex gap-2">
                          <input
                            value={tagsInput}
                            onChange={(e) => setTagsInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleTagAdd();
                              }
                            }}
                            placeholder="e.g. trauma, neuroscience, somatic"
                            className="flex-1 px-4 py-3 border-2 border-forest/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/60 focus:border-gold text-forest placeholder-forest/40"
                          />
                          <button
                            type="button"
                            onClick={handleTagAdd}
                            className="px-4 py-3 bg-forest text-ivory rounded-lg hover:bg-forest/90 transition-all font-semibold"
                          >
                            Add
                          </button>
                        </div>
                        {newPost.tags.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {newPost.tags.map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex items-center gap-1.5 rounded-full bg-forest/10 px-3 py-1 text-xs font-semibold text-forest"
                              >
                                #{tag}
                                <button
                                  type="button"
                                  onClick={() => handleTagRemove(tag)}
                                  className="w-3 h-3 text-forest/60 hover:text-forest"
                                  aria-label={`Remove tag ${tag}`}
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Social sharing */}
                  <div className="bg-ivory-elevated rounded-2xl shadow-sm border border-forest/10 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setSocialExpanded((v) => !v)}
                      className="w-full flex items-center justify-between p-6 hover:bg-forest/5 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <LinkIcon className="w-5 h-5 text-gold" />
                        <h3 className="font-serif text-lg font-bold text-forest">Social Sharing</h3>
                        <span className="text-xs text-forest/60 ml-2">Open Graph & Twitter</span>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-forest/60 transition-transform ${
                          socialExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {socialExpanded && (
                      <div className="px-6 pb-6 space-y-4 border-t border-forest/10">
                        <div className="mt-4">
                          <label className="block text-xs font-semibold text-forest mb-2 uppercase tracking-wide">
                            Social Title
                          </label>
                          <input
                            value={seoFields.socialTitle}
                            onChange={(e) =>
                              setSeoFields((prev) => ({ ...prev, socialTitle: e.target.value }))
                            }
                            placeholder="OG / Twitter card title"
                            className="w-full px-4 py-3 border-2 border-forest/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/60 focus:border-gold text-forest placeholder-forest/40"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-forest mb-2 uppercase tracking-wide">
                            Social Description
                          </label>
                          <textarea
                            value={seoFields.socialDescription}
                            onChange={(e) =>
                              setSeoFields((prev) => ({ ...prev, socialDescription: e.target.value }))
                            }
                            rows={2}
                            className="w-full px-4 py-3 border-2 border-forest/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/60 focus:border-gold text-forest placeholder-forest/40 resize-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-forest mb-2 uppercase tracking-wide">
                            Social Image URL (overrides cover)
                          </label>
                          <input
                            value={seoFields.ogImage}
                            onChange={(e) =>
                              setSeoFields((prev) => ({ ...prev, ogImage: e.target.value }))
                            }
                            placeholder="https://soulsysta.com/images/og/post.jpg"
                            className="w-full px-4 py-3 border-2 border-forest/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/60 focus:border-gold text-forest placeholder-forest/40"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Save bar */}
                  <div className="flex gap-3 justify-end sticky bottom-4 bg-ivory-elevated p-4 rounded-xl border border-forest/10 shadow-lg">
                    <button
                      type="button"
                      onClick={() => setActiveTab('posts')}
                      className="px-6 py-3 bg-ivory-elevated text-forest font-medium rounded-lg hover:bg-forest/5 transition-all border border-forest/20"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-8 py-3 bg-forest text-ivory font-semibold rounded-lg hover:bg-forest/90 transition-all shadow-md inline-flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      {activeTab === 'edit-post' ? 'Update Post' : 'Publish Post'}
                    </button>
                  </div>
                </form>
              </div>

              {/* SEO sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-4">
                  <SeoChecklist post={newPost} seo={seoFields} />

                  {/* SERP Preview */}
                  <div className="bg-ivory-elevated border border-forest/15 rounded-2xl p-5 shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                      <FileSearch className="w-5 h-5 text-gold" />
                      <h3 className="font-serif text-lg font-bold text-forest">Google Preview</h3>
                    </div>
                    <div className="border border-forest/10 rounded-lg p-4 bg-ivory-elevated">
                      <div className="text-xs text-forest/60 truncate">
                        soulsysta.com › blog › {seoFields.slug || '...'}
                      </div>
                      <div className="text-[#1a0dab] text-base font-medium mt-1 hover:underline cursor-pointer line-clamp-1">
                        {seoFields.metaTitle || newPost.title || 'Your post title'}
                      </div>
                      <div className="text-xs text-forest/80 mt-1 line-clamp-3">
                        {seoFields.metaDescription ||
                          newPost.subtitle ||
                          'Your meta description will appear here. Make it compelling to improve click-through rate.'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
