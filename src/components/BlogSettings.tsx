import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useStore } from '../lib/store';
import { BlogConfig } from '../lib/types';

export default function BlogSettings() {
  const { blogs, addBlog, removeBlog } = useStore(state => ({
    blogs: state.settings.blogConfigs,
    addBlog: state.addBlog,
    removeBlog: state.removeBlog,
  }));

  const [newBlog, setNewBlog] = useState<Partial<BlogConfig>>({
    type: 'wordpress',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newBlog.name && newBlog.apiUrl && newBlog.apiKey) {
      addBlog({
        ...newBlog,
        id: crypto.randomUUID(),
        enabled: true,
      } as BlogConfig);
      setNewBlog({ type: 'wordpress' });
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Blog Configurations</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm">Platform</label>
          <select
            value={newBlog.type}
            onChange={e => setNewBlog({ ...newBlog, type: e.target.value as any })}
            className="w-full bg-gray-800 rounded-lg px-3 py-2"
          >
            <option value="wordpress">WordPress</option>
            <option value="medium">Medium</option>
            <option value="ghost">Ghost</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm">Blog Name</label>
          <input
            type="text"
            value={newBlog.name || ''}
            onChange={e => setNewBlog({ ...newBlog, name: e.target.value })}
            className="w-full bg-gray-800 rounded-lg px-3 py-2"
            placeholder="My Blog"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm">API URL</label>
          <input
            type="url"
            value={newBlog.apiUrl || ''}
            onChange={e => setNewBlog({ ...newBlog, apiUrl: e.target.value })}
            className="w-full bg-gray-800 rounded-lg px-3 py-2"
            placeholder="https://myblog.com/wp-json/wp/v2/"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm">API Key</label>
          <input
            type="password"
            value={newBlog.apiKey || ''}
            onChange={e => setNewBlog({ ...newBlog, apiKey: e.target.value })}
            className="w-full bg-gray-800 rounded-lg px-3 py-2"
            placeholder="Enter API key"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-lg px-4 py-2"
        >
          Add Blog
        </button>
      </form>

      <div className="space-y-2">
        {blogs.map(blog => (
          <div
            key={blog.id}
            className="flex items-center justify-between p-3 bg-gray-800 rounded-lg"
          >
            <div>
              <h4 className="font-medium">{blog.name}</h4>
              <p className="text-sm text-gray-400">{blog.type}</p>
            </div>
            <button
              onClick={() => removeBlog(blog.id)}
              className="p-2 hover:bg-gray-700 rounded-lg text-red-400"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}