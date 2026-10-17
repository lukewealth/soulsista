import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { BlogPage } from './BlogPage';
import { BlogPostPage } from './BlogPostPage';

interface BlogWrapperProps {
  onOpenBooking: () => void;
}

export const BlogWrapper: React.FC<BlogWrapperProps> = ({ onOpenBooking }) => {
  return (
    <Routes>
      <Route 
        path="/blog" 
        element={<BlogPage onOpenBooking={onOpenBooking} />} 
      />
      <Route 
        path="/blog/:slug" 
        element={<BlogPostPage onOpenBooking={onOpenBooking} />} 
      />
      {/* Default route for root path - redirects to blog */}
      <Route 
        path="/" 
        element={<BlogPage onOpenBooking={onOpenBooking} />} 
      />
    </Routes>
  );
};