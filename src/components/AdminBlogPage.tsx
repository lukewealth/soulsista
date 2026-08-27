import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Loader2, Image, Video, Calendar, Clock, Tag, TrendingUp, Menu, Upload, Folder, Eye, EyeOff, Flag, Link, ArrowDown, ArrowUp, Search, Sun, Moon } from 'lucide-react';

interface BlogPostFormValues {
  title: string;
  excerpt: string;
  content: string;
  category: 'Therapy' | 'Wellness' | 'Youth' | 'Books';
  author: string;
  date: string;
  readTime: string;
  image: string;
  video?: string;
  tags: string[];
  status: 'draft' | 'published';
}

interface AdminBlogPageProps {
  initialPost?: BlogPostFormValues;
  onSave: (post: BlogPostFormValues) => void;
  onCancel: () => void;
  postId?: string;
  initialData?: BlogPostFormValues;
}

export const AdminBlogPage: React.FC<AdminBlogPageProps> = ({
  initialPost,
  onSave,
  onCancel,
  postId,
  initialData
}) => {
  const [form, setForm] = useState<BlogPostFormValues>({
    title: '',
    excerpt: '',
    content: '',
    category: 'Wellness',
    author: '',
    date: new Date().toISOString().split('T')[0],
    readTime: '5 min read',
    image: '',
    tags: [],
    status: 'draft'
  });

  const [isSaving, setIsSaving] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(null);
  const [showVideoUpload, setShowVideoUpload] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [isPreview, setIsPreview] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string>('');

  const [visibleTabs, setVisibleTabs] = useState<('form' | 'posts' | 'settings')[]>(['form']);
  const [postsTab, setPostsTab] = useState<BlogPostFormValues[]>([]);

  // Initialize form with initial data if provided
  const initForm = useRef(false);
  if (initialData && !initForm.current) {
    setForm(initialData);
    initForm.current = true;
  }
  if (postId && !initForm.current) {
    const mockPost: BlogPostFormValues = {
      title: 'New Blog Post',
      excerpt: '',
      content: '',
      category: 'Wellness',
      author: 'Your Name',
      date: new Date().toISOString().split('T')[0],
      readTime: '5 min read',
      image: '',
      tags: [],
      status: 'draft'
    };
    setForm(mockPost);
    initForm.current = true;
  }

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
        setForm(prev => ({ ...prev, image: e.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle video URL change
  const handleVideoChange = (url: string) => {
    setVideoUrl(url);
    setForm(prev => ({ ...prev, video: url }));
  };

  // Toggle between draft and published
  const toggleStatus = () => {
    setForm(prev => ({ ...prev, status: prev.status === 'published' ? 'draft' : 'published' }));
  };

  // Add tag
  const addTag = (tag: string) => {
    setForm(prev => ({ ...prev, tags: [...new Set([...prev.tags, tag])] }));
  };

  // Remove tag
  const removeTag = (tagToRemove: string) => {
    setForm(prev => ({ ...prev, tags: prev.tags.filter(tag => tag !== tagToRemove) }));
  };

  // Save post
  const handleSave = async () => {
    setIsSaving(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      const postData: BlogPostFormValues = {
        ...form,
        id: postId || Date.now().toString()
      };

      onSave(postData);
      setIsSaving(false);
      setShowSuccess(true);

      // Reset form after a delay
      setTimeout(() => {
        setShowSuccess(false);
        onCancel();
      }, 2000);
    } catch (err) {
      setIsSaving(false);
      setError('Failed to save post. Please try again.');
    }
  };

  // Delete post confirmation
  const handleDelete = () => {
    setShowDeleteConfirmation(false);
    onCancel();
    // In a real app, would call delete API
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 1000);
  };

  return (
    <section className="py-24 bg-surface-container">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <span className="text-gold text-sm font-semibold uppercase tracking-widest">
            Blog CMS
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-forest mt-4">
            {postId ? 'Edit Blog Post' : 'New Blog Post'}
          </h2>
          <p className="text-forest/70 mt-2">
            Create and manage your blog articles with rich content, images, and videos
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex mb-8 rounded-xl bg-white shadow-sm overflow-hidden">
          {visibleTabs.map((tab, idx) => (
            <button
              key={tab}
              onClick={() => setVisibleTabs(tab === 'form' ? ['form'] : ['posts', 'settings'])}
              className={`flex-1 py-3 px-2 text-sm font-medium transition-all ${
                visibleTabs[0] === tab 
                  ? 'bg-forest text-ivory' 
                  : 'text-forest/60 hover:bg-ivory/10'
              }`}
            >
              {tab === 'form' ? 'New Post' : tab === 'posts' ? 'Posts (' + (postsTab.length || 0) + ')' : 'Settings'}
            </button>
          ))}
        </div>

        {/* Form Tab */}
        {visibleTabs[0] === 'form' && (
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            {/* Post Status */}
            <div className="flex items-center gap-4 mb-8 pt-8 border-t border-forest/10">
              <span className="text-xs font-semibold uppercase tracking-wide text-forest/60">Status</span>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleStatus()}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                    form.status === 'published' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {form.status}
                </button>
              </div>
            </div>

            {/* Form Sections */}
            <div className="space-y-6">
              {/* Title Section */}
              <div>
                <label className="block text-xs font-semibold text-forest mb-2 uppercase tracking-wide">
                  Title
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-3 border border-forest/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 transition-colors"
                  placeholder="Enter post title"
                  required
                />
              </div>

              {/* Excerpt Section */}
              <div>
                <label className="block text-xs font-semibold text-forest mb-2 uppercase tracking-wide">
                  Excerpt (brief summary)
                </label>
                <textarea
                  rows={3}
                  value={form.excerpt}
                  onChange={(e) => setForm(prev => ({ ...prev, excerpt: e.target.value }))}
                  className="w-full px-4 py-3 border border-forest/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 transition-colors resize-none"
                  placeholder="Write a brief excerpt (appears in blog grid)"
                  required
                ></textarea>
              </div>

              {/* Content Section */}
              <div>
                <label className="block text-xs font-semibold text-forest mb-2 uppercase tracking-wide">
                  Content
                </label>
                <textarea
                  rows={8}
                  value={form.content}
                  onChange={(e) => setForm(prev => ({ ...prev, content: e.target.value }))}
                  className="w-full px-4 py-3 border border-forest/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 transition-colors resize-y"
                  placeholder="Write your full article content (supports markdown, images, and video embeds)"
                  required
                ></textarea>
                <p className="text-xs mt-2 text-forest/60">
                  Tips: Use ## for headings, *italic* or **bold**, and add image URLs starting with http
                </p>
              </div>

              {/* Meta Information Section */}
              <div className="grid grid-cols-2 gap-6">
                {/* Category */}
                <div>
                  <label className="block text-xs font-semibold text-forest mb-2 uppercase tracking-wide">
                    Category
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm(prev => ({ ...prev, category: e.target.value as any }))}
                    className="w-full px-4 py-3 border border-forest/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 transition-colors"
                  >
                    <option value="Therapy">Therapy</option>
                    <option value="Wellness">Wellness</option>
                    <option value="Youth">Youth</option>
                    <option value="Books">Books</option>
                  </select>
                </div>

                {/* Author */}
                <div>
                  <label className="block text-xs font-semibold text-forest mb-2 uppercase tracking-wide">
                    Author
                  </label>
                  <input
                    type="text"
                    value={form.author}
                    onChange={(e) => setForm(prev => ({ ...prev, author: e.target.value }))}
                    className="w-full px-4 py-3 border border-forest/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 transition-colors"
                    placeholder="Author name"
                    required
                  />
                </div>

                {/* Date */}
                <div>
                  <label className="block text-xs font-semibold text-forest mb-2 uppercase tracking-wide">
                    Date
                  </label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full px-4 py-3 border border-forest/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 transition-colors"
                  />
                </div>

                {/* Read Time */}
                <div>
                  <label className="block text-xs font-semibold text-forest mb-2 uppercase tracking-wide">
                    Read Time
                  </label>
                  <input
                    type="text"
                    value={form.readTime}
                    onChange={(e) => setForm(prev => ({ ...prev, readTime: e.target.value }))}
                    className="w-full px-4 py-3 border border-forest/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 transition-colors"
                    placeholder="e.g., 5 min read"
                    required
                  />
                </div>
              </div>

              {/* Image & Video Section */}
              <div>
                <label className="block text-xs font-semibold text-forest mb-2 uppercase tracking-wide">
                  Featured Image & Video
                </label>
                
                {/* Image Upload */}
                <div className="mb-4 p-4 bg-ivory/50 rounded-2xl border border-ivory/20 hover:bg-ivory/60 transition-colors cursor-pointer">
                  {imagePreview ? (
                    <img
                      src={imagePreview as string}
                      alt="Preview"
                      className="w-full h-40 object-cover rounded-md"
                    />
                  ) : (
                    <div className="w-full h-40 flex items-center justify-center text-forest/40 rounded-md">
                      <Upload className="w-6 h-6 mb-2" />
                      <span>Click to upload or drag image</span>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>

                {/* Video URL */}
                {videoUrl ? (
                  <div className="mb-3 flex items-center gap-3">
                    <Video className="w-5 h-5 text-gold" />
                    <div>
                      <p className="text-sm text-forest">{videoUrl.substring(0, 50) + (videoUrl.length > 50 ? '...' : '')}</p>
                      <button
                        onClick={() => setVideoUrl('')}
                        className="text-xs text-forest/40 hover:text-gold transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mb-3 flex items-center gap-3 text-forest/50">
                    <Upload className="w-5 h-5 text-gold" />
                    <span>Add video URL (YouTube, Vimeo, or direct MP4)</span>
                  </div>
                )}

                <button
                  onClick={() => setShowVideoUpload(true)}
                  className="mt-3 w-full py-2.5 bg-forest/10 text-forest/60 rounded-lg hover:bg-forest/20 transition-all flex items-center justify-center gap-2"
                >
                  <Video className="w-4 h-4" />
                  Add Video
                </button>
              </div>

              {/* Tags Section */}
              <div>
                <label className="block text-xs font-semibold text-forest mb-2 uppercase tracking-wide">
                  Tags (comma-separated)
                </label>
                <div className="flex flex-wrap gap-2">
                  {form.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 text-xs font-medium bg-forest/5 text-forest rounded-full"
                    >
                      #{tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="ml-2 text-forest/40 hover:text-forest transition-all"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                  <input
                    placeholder="Add tags (e.g. #therapy, #wellness)"
                    onChange={(e) => {
                      const value = e.target.value;
      const tags = value.split(',').map((t: string) => t.trim()).filter((t: string) => t.length > 0);
      if (tags.length > 0) {
        addTag(tags[0]);
      }
    }}
                    className="px-4 py-2 border border-forest/20 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-gold/50"
                    value={form.tags.join(', ')}
                    onChange={(e) => setForm(prev => ({ ...prev, tags: e.target.value.split(',').map((t: string) => t.trim()).filter((t: string) => t.length > 0) }))}
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-8 border-t border-forest/10 flex justify-end gap-3">
              <button
                onClick={onCancel}
                className="px-6 py-3 bg-white text-forest font-medium rounded-lg hover:bg-forest/5 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className={`px-6 py-3 bg-forest text-ivory font-semibold rounded-lg hover:bg-forest/90 transition-all shadow-lg ${
                  isSaving ? 'opacity-60 cursor-not-allowed' : ''
                }`}
              >
                {isSaving ? 'Saving...' : 'Save Post'}
              </button>
            </div>
          </div>
        )}

        {/* Posts Tab */}
        {visibleTabs[1] === 'posts' && postsTab.length > 0 && (
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="font-serif text-2xl font-bold text-forest mb-6">Your Posts</h3>
            <div className="space-y-4">
              {postsTab.map((post) => (
                <div key={post.id} className="flex items-center justify-between p-4 bg-ivory rounded-lg transition-colors hover:bg-forest/5">
                  <div>
                    <h4 className="font-semibold text-forest">{post.title.substring(0, 40) + (post.title.length > 40 ? '...' : '')}</h4>
                    <p className="text-forest/60 text-sm">{post.category} • {post.date}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="p-2 text-forest/60 rounded-lg hover:bg-forest/10 transition-all"
                      aria-label="Edit post"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 text-red-500 rounded-lg hover:bg-red-50 transition-all"
                      aria-label="Delete post"
                      onClick={() => setShowDeleteConfirmation(true)}
                    >
                      <Loader2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Delete Confirmation */}
        {showDeleteConfirmation && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-xl"
            >
              <h3 className="font-serif text-xl font-bold text-forest mb-4 text-center">
                Delete Post
              </h3>
              <p className="text-forest/60 mb-6 text-center">
                Are you sure you want to delete this post? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowDeleteConfirmation(false)}
                  className="px-6 py-3 bg-white text-forest rounded-lg hover:bg-forest/5 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-6 py-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-all"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Success Toast */}
        {showSuccess && (
          <div className="fixed bottom-6 left-1/2 transform -x-1/2 z-50">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 1, y: -10 }}
              className="bg-forest text-ivory px-6 py-3 rounded-lg text-sm flex items-center gap-3 shadow-lg"
            >
              <Check className="w-4 h-4" />
              <span>Post saved successfully!</span>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};