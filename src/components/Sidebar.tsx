import React from 'react';
import { X } from 'lucide-react';
import NewChatButton from './NewChatButton';
import ChatList from './ChatList';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <div
      className={`fixed inset-y-0 left-0 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } w-64 bg-gray-800 p-4 transition-transform duration-200 ease-in-out md:relative md:translate-x-0`}
    >
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-purple-400">GroupPromptZ</h1>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-700 rounded-lg md:hidden"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <NewChatButton />
      <ChatList />
    </div>
  );
}