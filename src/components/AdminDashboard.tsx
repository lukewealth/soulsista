import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Lock, Mail, Eye, EyeOff, 
  LayoutDashboard, FileText, Users, Settings, 
  Plus, Edit, Trash2, Save, LogOut,
  TrendingUp, Calendar, MessageCircle, BookOpen,
  Image, Video, Palette,
  Upload, Check, Upload2
} from 'lucide-react';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

interface BlogPost {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  authorName: string;
  authorRole: string;
  publishedDate: string;
  readTimeMinutes: number;
  coverImage: string;
  content: string;
  tags: string[];
  video?: string;
  featured?: boolean;
}

interface CreatePostFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (post: BlogPost) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'posts' | 'users' | 'settings' | 'create-post'>('dashboard');
  const [loginError, setLoginError] = useState('');

  // Mock blog posts data
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([
    {
      id: '1',
      title: 'The Neuroscience of Somatic Healing',
      subtitle: 'How Body-Based Therapy Rewires Trauma',
      category: 'Therapy',
      authorName: 'Dr. Julian Vance',
      authorRole: 'Senior Clinical Psychologist',
      publishedDate: '2024-01-15',
      readTimeMinutes: 8,
      coverImage: '/images/services/therapy-session.png',
      content: 'Somatic healing represents a paradigm shift in how we understand and treat trauma...',
      tags: ['Neuroscience', 'Somatic Therapy', 'Trauma Recovery'],
      featured: false,
    },
    {
      id: '2',
      title: 'Breaking Generational Patterns',
      subtitle: 'A Guide for Modern Women',
      category: 'Wellness',
      authorName: 'Merit Nene Chuks',
      authorRole: 'Founder & Lead Psychotherapist',
      publishedDate: '2024-01-10',
      readTimeMinutes: 6,
      coverImage: '/images/founder/merit-portrait.png',
      content: 'Generational patterns are the invisible threads that weave through our families...',
      tags: ['Women Empowerment', 'Generational Healing'],
      featured: false,
    },
    {
      id: '3',
      title: 'Youth Circle Success Stories',
      subtitle: 'Empowering the Next Generation',
      category: 'Youth',
      authorName: 'Elena Rodriguez',
      authorRole: 'Program Director',
      publishedDate: '2024-01-05',
      readTimeMinutes: 5,
      coverImage: '/images/brand/brand-04.jpg',
      content: 'The Youth Circle program has been transforming lives since its inception...',
      tags: ['Youth Mentorship', 'Teen Empowerment'],
      featured: false,
    },
  ]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    // Demo credentials
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
  };

  const handleCreatePost = () => {
    setActiveTab('create-post');
  };

  const handleSavePost = (post: BlogPost) => {
    setBlogPosts([post, ...blogPosts]);
    setActiveTab('posts');
  };

  const handleDeletePost = (id: string) => {
    setBlogPosts(blogPosts.filter(post => post.id !== id));
  };

  const handleToggleStatus = (id: string) => {
    setBlogPosts(blogPosts.map(post => 
      post.id === id 
        ? { ...post, status: post.status === 'published' ? 'draft' : 'published' }
        : post
    ));
  };

  // Create Post Form State
  const [newPost, setNewPost] = useState<BlogPost>({
    id: Date.now().toString(),
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
    setNewPost(prev => ({
      ...prev,
      tags: [...prev.tags, trimmed],
    }));
    setTagsInput('');
  };

  const handleTagRemove = (tag: string) => {
    setNewPost(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag),
    }));
  };

  if (!isOpen) return null;

  // Login Screen
  if (!isLoggedIn) {
    return (
      <div className="fixed inset-0 z-50 bg-forest/90 backdrop-blur-md flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-forest/60 hover:text-forest rounded-full hover:bg-forest/10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-forest rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-gold" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-forest">Admin Login</h2>
            <p className="text-forest/60 text-sm mt-2">Access the Soulsysta CRM Dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-forest mb-2 uppercase tracking-wide">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-forest/40" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@soulsysta.com"
                  className="w-full pl-10 pr-4 py-3 border border-forest/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-forest mb-2 uppercase tracking-wide">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-forest/40" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 border border-forest/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-forest/40 hover:text-forest"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {loginError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-forest text-ivory font-semibold rounded-lg hover:bg-forest/90 transition-all"
            >
              Sign In
            </button>

            <div className="text-center text-xs text-forest/60 mt-4">
              <p>Demo: admin@soulsysta.com / admin123</p>
            </div>
          </form>
        </motion.div>
      </div>
    );
  }

  // Dashboard
  return (
    <div className="fixed inset-0 z-50 bg-ivory flex">
      {/* Sidebar */}
      <div className="w-64 bg-forest text-ivory flex flex-col">
        <div className="p-6 border-b border-ivory/10">
          <h1 className="font-serif text-xl font-bold">Soulsysta</h1>
          <p className="text-xs text-ivory/60 mt-1">Admin Dashboard</p>
        </div>

        <nav className="flex-1 p-4">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${
              activeTab === 'dashboard' ? 'bg-gold text-forest' : 'hover:bg-ivory/10'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-semibold">Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('posts')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${
              activeTab === 'posts' ? 'bg-gold text-forest' : 'hover:bg-ivory/10'
            }`}
          >
            <FileText className="w-5 h-5" />
            <span className="font-semibold">Blog Posts</span>
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${
              activeTab === 'users' ? 'bg-gold text-forest' : 'hover:bg-ivory/10'
            }`}
          >
            <Users className="w-5 h-5" />
            <span className="font-semibold">Users</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${
              activeTab === 'settings' ? 'bg-gold text-forest' : 'hover:bg-ivory/10'
            }`}
          >
            <Settings className="w-5 h-5" />
            <span className="font-semibold">Settings</span>
          </button>

          <button
            onClick={handleCreatePost}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all bg-gold text-forest ${
              activeTab === 'create-post' ? 'bg-gold text-forest' : 'hover:bg-ivory/10'
            }`}
          >
            <Plus className="w-5 h-5" />
            <span className="font-semibold">Create Post</span>
          </button>
        </nav>

        <div className="p-4 border-t border-ivory/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-ivory/10 transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-semibold">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div>
              <h2 className="font-serif text-3xl font-bold text-forest mb-8">Dashboard Overview</h2>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-gold" />
                    </div>
                    <TrendingUp className="w-5 h-5 text-green-500" />
                  </div>
                  <h3 className="text-3xl font-bold text-forest">{blogPosts.length}</h3>
                  <p className="text-sm text-forest/60 mt-1">Total Posts</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center">
                      <Eye className="w-6 h-6 text-gold" />
                    </div>
                    <TrendingUp className="w-5 h-5 text-green-500" />
                  </div>
                  <h3 className="text-3xl font-bold text-forest">
                    {blogPosts.reduce((sum, post) => sum + post.readTimeMinutes, 0)}
                  </h3>
                  <p className="text-sm text-forest/60 mt-1">Total Read Time</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-gold" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold text-forest">
                    {blogPosts.filter(p => p.publishedDate).length}
                  </h3>
                  <p className="text-sm text-forest/60 mt-1">Published</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center">
                      <MessageCircle className="w-6 h-6 text-gold" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold text-forest">42</h3>
                  <p className="text-sm text-forest/60 mt-1">Comments</p>
                </div>
              </div>

              {/* Recent Posts */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="font-serif text-xl font-bold text-forest mb-4">Recent Posts</h3>
                <div className="space-y-4">
                  {blogPosts.slice(0, 5).map((post) => (
                    <div key={post.id} className="flex items-center justify-between p-4 bg-ivory rounded-lg">
                      <div>
                        <h4 className="font-semibold text-forest">{post.title}</h4>
                        <p className="text-sm text-forest/60">{post.category} • {post.publishedDate}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        post.featured ? 'bg-gold text-forest' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {post.featured ? 'Featured' : 'Draft'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Posts Tab */}
          {activeTab === 'posts' && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-serif text-3xl font-bold text-forest">Blog Posts</h2>
                <button
                  onClick={handleCreatePost}
                  className="px-6 py-3 bg-forest text-ivory font-semibold rounded-lg hover:bg-forest/90 transition-all flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Create Post
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-forest text-ivory">
                    <tr>
                      <th className="text-left px-6 py-4 font-semibold">Title</th>
                      <th className="text-left px-6 py-4 font-semibold">Category</th>
                      <th className="text-left px-6 py-4 font-semibold">Status</th>
                      <th className="text-left px-6 py-4 font-semibold">Author</th>
                      <th className="text-left px-6 py-4 font-semibold">Views</th>
                      <th className="text-left px-6 py-4 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {blogPosts.map((post) => (
                      <tr key={post.id} className="border-b border-forest/10 hover:bg-ivory">
                        <td className="px-6 py-4 font-semibold text-forest">{post.title}</td>
                        <td className="px-6 py-4 text-forest/70">{post.category}</td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleToggleStatus(post.id)}
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              post.featured ? 'bg-gold text-forest' : post.published ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                            }`}
                          >
                            {post.featured ? 'Featured' : post.published ? 'Published' : 'Draft'}
                          </button>
                        </td>
                        <td className="px-6 py-4 text-forest/70">{post.authorName}</td>
                        <td className="px-6 py-4 text-forest/70">{post.readTimeMinutes.toLocaleString()}</td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button className="p-2 text-forest/60 hover:text-gold rounded-lg hover:bg-forest/10">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeletePost(post.id)}
                              className="p-2 text-forest/60 hover:text-red-600 rounded-lg hover:bg-red-50"
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

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div>
              <h2 className="font-serif text-3xl font-bold text-forest mb-8">User Management</h2>
              <div className="bg-white rounded-xl p-8 shadow-lg text-center">
                <Users className="w-16 h-16 text-forest/20 mx-auto mb-4" />
                <h3 className="font-serif text-xl font-bold text-forest mb-2">Coming Soon</h3>
                <p className="text-forest/60">User management features will be available in the next update.</p>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div>
              <h2 className="font-serif text-3xl font-bold text-forest mb-8">Settings</h2>
              <div className="bg-white rounded-xl p-8 shadow-lg text-center">
                <Settings className="w-16 h-16 text-forest/20 mx-auto mb-4" />
                <h3 className="font-serif text-xl font-bold text-forest mb-2">Coming Soon</h3>
                <p className="text-forest/60">Settings configuration will be available in the next update.</p>
              </div>
            </div>
          )}

          {/* Create Post Tab */}
          {activeTab === 'create-post' && (
            <div className="max-w-2xl mx-auto">
              <h2 className="font-serif text-3xl font-bold text-forest mb-6">Create New Blog Post</h2>
              
              {/* Close button */}
              <button
                onClick={() => setActiveTab('posts')}
                className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-forest hover:text-forest/60 transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Form */}
              <form className="space-y-6">
                {/* Basic Info */}
                <div>
                  <h3 className="font-serif text-lg font-bold text-forest mb-4">Post Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-forest mb-2 uppercase tracking-wide">
                        Title
                      </label>
                      <input
                        value={newPost.title}
                        onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="The Neuroscience of Somatic Healing..."
                        className="w-full px-4 py-3 border border-forest/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-forest mb-2 uppercase tracking-wide">
                        Subtitle
                      </label>
                      <input
                        value={newPost.subtitle}
                        onChange={(e) => setNewPost(prev => ({ ...prev, subtitle: e.target.value }))}
                        placeholder="A comprehensive look at how therapy transforms lives..."
                        className="w-full px-4 py-3 border border-forest/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-forest mb-2 uppercase tracking-wide">
                        Category
                      </label>
                      <select
                        value={newPost.category}
                        onChange={(e) => setNewPost(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full px-4 py-3 border border-forest/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
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
                        onChange={(e) => setNewPost(prev => ({ ...prev, featured: e.target.value === 'true' }))}
                        className="w-full px-4 py-3 border border-forest/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
                      >
                        <option value="false">Not Featured</option>
                        <option value="true">Featured</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Author & Meta */}
                <div>
                  <h3 className="font-serif text-lg font-bold text-forest mb-4">Author & Metadata</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-forest mb-2 uppercase tracking-wide">
                        Author Name
                      </label>
                      <input
                        value={newPost.authorName}
                        onChange={(e) => setNewPost(prev => ({ ...prev, authorName: e.target.value }))}
                        placeholder="Dr. Julian Vance"
                        className="w-full px-4 py-3 border border-forest/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-forest mb-2 uppercase tracking-wide">
                        Author Role
                      </label>
                      <input
                        value={newPost.authorRole}
                        onChange={(e) => setNewPost(prev => ({ ...prev, authorRole: e.target.value }))}
                        placeholder="Senior Clinical Psychologist"
                        className="w-full px-4 py-3 border border-forest/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-forest mb-2 uppercase tracking-wide">
                        Read Time (minutes)
                      </label>
                      <input
                        value={newPost.readTimeMinutes}
                        type="number"
                        onChange={(e) => setNewPost(prev => ({ ...prev, readTimeMinutes: parseInt(e.target.value) || 5 }))}
                        placeholder="5"
                        className="w-full px-4 py-3 border border-forest/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-forest mb-2 uppercase tracking-wide">
                        Published Date
                      </label>
                      <input
                        value={newPost.publishedDate}
                        onChange={(e) => setNewPost(prev => ({ ...prev, publishedDate: e.target.value }))}
                        type="date"
                        className="w-full px-4 py-3 border border-forest/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
                      />
                    </div>
                  </div>
                </div>

                {/* Content & Media */}
                <div>
                  <h3 className="font-serif text-lg font-bold text-forest mb-4">Content & Media</h3>
                  
                  {/* Cover Image */}
                  <div>
                    <label className="block text-xs font-semibold text-forest mb-2 uppercase tracking-wide">
                      Cover Image
                    </label>
                    <div className="relative">
{imagePreview && (
                          <img
                            src={imagePreview}
                            alt={newPost.title}
                            className="w-full h-48 object-cover rounded-lg mb-4"
                          />
                        )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      <button
                        type="button"
                        className="w-full px-4 py-3 bg-forest/5 text-forest/40 rounded-lg hover:bg-forest/10 transition-all flex items-center justify-center gap-3"
                      >
                        <Upload className="w-4 h-4 text-forest/40" />
                        <span>Upload Cover Image</span>
                      </button>
                      {imagePreview && (
                        <button
                          type="button"
                          className="w-full text-sm text-forest/60 hover:text-forest transition-all mt-2"
                        >
                          Change Image
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Video URL */}
                  <div>
                    <label className="block text-xs font-semibold text-forest mb-2 uppercase tracking-wide">
                      Video URL (optional)
                    </label>
                    <input
                      value={newPost.video || ''}
                      onChange={(e) => setNewPost(prev => ({ ...prev, video: e.target.value }))}
                      placeholder="https://www.youtube.com/watch?v=..."
                      className="w-full px-4 py-3 border border-forest/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
                      placeholder="YouTube or Vimeo URL for embedded video"
                    />
                    <p className="text-xs text-forest/60 mt-1">Supported: YouTube, Vimeo, MP4 links</p>
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-xs font-semibold text-forest mb-2 uppercase tracking-wide">
                      Tags (comma separated)
                    </label>
                    <div className="relative">
                      <input
                        value={tagsInput}
                        onChange={(e) => setTagsInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleTagAdd()}
                        placeholder="e.g. Neuroscience, Trauma, Healing"
                        className="w-full px-4 py-3 border border-forest/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
                      />
                      <button
                        type="button"
                        onClick={handleTagAdd}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-forest/40 hover:text-forest"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {newPost.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center rounded-full bg-forest/5 px-2.5 py-0.5 text-xs font-semibold text-forest/60"
                        >
                          #{tag}
                          <button
                            onClick={() => handleTagRemove(tag)}
                            className="ml-2 w-3 h-3 text-forest/30 hover:text-forest"
                          >
                            <X className="w-2 h-2" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Content Editor (simple textarea) */}
                <div>
                  <h3 className="font-serif text-lg font-bold text-forest mb-4">Article Content</h3>
                  <textarea
                    value={newPost.content}
                    onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                    rows={8}
                    className="w-full px-4 py-3 border border-forest/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 resize-h bg-forest/5"
                    placeholder="Write your article content here... Markdown supported"
                  ></textarea>
                </div>

                {/* Save Button */}
                <div>
                  <button
                    type="submit"
                    onClick={() => handleSavePost(newPost)}
                    className="w-full py-4 bg-forest text-ivory font-semibold rounded-lg hover:bg-forest/90 transition-all shadow-lg"
                  >
                    <Save className="w-5 h-5 mr-2" />
                    Publish Blog Post
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};