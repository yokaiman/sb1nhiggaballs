export interface Message {
  id: number;
  content: string;
  isUser: boolean;
  timestamp: Date;
  llmSource?: string;
}

export interface Chat {
  id: number;
  title: string;
  messages: Message[];
  createdAt: Date;
  llms: string[];
}

export interface Settings {
  theme: 'dark' | 'light' | 'system';
  language: string;
  saveHistory: boolean;
  llmPaths: LLMConfig[];
  blogConfigs: BlogConfig[];
  defaultLLMs: string[];
}

export interface LLMConfig {
  id: string;
  name: string;
  path: string;
  type: 'local' | 'api';
  enabled: boolean;
}

export interface BlogConfig {
  id: string;
  name: string;
  type: 'wordpress' | 'medium' | 'ghost';
  apiUrl: string;
  apiKey: string;
  enabled: boolean;
}

export interface RSSFeed {
  id: string;
  url: string;
  name: string;
  lastFetched: Date | null;
  status: 'active' | 'error' | 'pending';
  error?: string;
}