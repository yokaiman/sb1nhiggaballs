import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Message, Chat, Settings, LLMConfig, BlogConfig, RSSFeed } from './types';

interface AppState {
  chats: Chat[];
  currentChatId: number | null;
  settings: Settings;
  feeds: RSSFeed[];
  addChat: (title: string) => void;
  addMessage: (chatId: number, message: Omit<Message, 'id' | 'timestamp'>) => void;
  updateSettings: (settings: Partial<Settings>) => void;
  addLocalLLM: (llm: LLMConfig) => void;
  toggleLLM: (llmId: string) => void;
  addBlog: (blog: BlogConfig) => void;
  removeBlog: (blogId: string) => void;
  addFeed: (feed: Omit<RSSFeed, 'id'>) => void;
  removeFeed: (feedId: string) => void;
  updateFeedStatus: (feedId: string, status: RSSFeed['status'], error?: string) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      chats: [],
      currentChatId: null,
      settings: {
        theme: 'dark',
        language: 'en',
        saveHistory: true,
        llmPaths: [],
        blogConfigs: [],
        defaultLLMs: [],
      },
      feeds: [],
      addChat: (title) =>
        set((state) => ({
          chats: [
            ...state.chats,
            {
              id: Date.now(),
              title,
              messages: [],
              createdAt: new Date(),
              llms: state.settings.defaultLLMs,
            },
          ],
          currentChatId: Date.now(),
        })),
      addMessage: (chatId, message) =>
        set((state) => ({
          chats: state.chats.map((chat) =>
            chat.id === chatId
              ? {
                  ...chat,
                  messages: [
                    ...chat.messages,
                    {
                      ...message,
                      id: Date.now(),
                      timestamp: new Date(),
                    },
                  ],
                }
              : chat
          ),
        })),
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),
      addLocalLLM: (llm) =>
        set((state) => ({
          settings: {
            ...state.settings,
            llmPaths: [...state.settings.llmPaths, llm],
          },
        })),
      toggleLLM: (llmId) =>
        set((state) => ({
          settings: {
            ...state.settings,
            defaultLLMs: state.settings.defaultLLMs.includes(llmId)
              ? state.settings.defaultLLMs.filter((id) => id !== llmId)
              : [...state.settings.defaultLLMs, llmId],
          },
        })),
      addBlog: (blog) =>
        set((state) => ({
          settings: {
            ...state.settings,
            blogConfigs: [...state.settings.blogConfigs, blog],
          },
        })),
      removeBlog: (blogId) =>
        set((state) => ({
          settings: {
            ...state.settings,
            blogConfigs: state.settings.blogConfigs.filter((b) => b.id !== blogId),
          },
        })),
      addFeed: (feed) =>
        set((state) => ({
          feeds: [...state.feeds, { ...feed, id: crypto.randomUUID() }],
        })),
      removeFeed: (feedId) =>
        set((state) => ({
          feeds: state.feeds.filter((f) => f.id !== feedId),
        })),
      updateFeedStatus: (feedId, status, error) =>
        set((state) => ({
          feeds: state.feeds.map((f) =>
            f.id === feedId ? { ...f, status, error } : f
          ),
        })),
    }),
    {
      name: 'group-promptz-storage',
    }
  )
);