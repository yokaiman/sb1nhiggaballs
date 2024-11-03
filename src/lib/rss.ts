import { RSSFeed } from './types';

export async function fetchRSSFeed(feed: RSSFeed) {
  try {
    const response = await fetch(feed.url);
    const text = await response.text();
    
    // Parse RSS feed
    const parser = new DOMParser();
    const xml = parser.parseFromString(text, 'text/xml');
    const items = xml.querySelectorAll('item');
    
    const posts = Array.from(items).map(item => ({
      title: item.querySelector('title')?.textContent || '',
      content: item.querySelector('description')?.textContent || '',
      link: item.querySelector('link')?.textContent || '',
      pubDate: item.querySelector('pubDate')?.textContent || '',
    }));

    return posts;
  } catch (error) {
    console.error(`Failed to fetch RSS feed: ${feed.url}`, error);
    throw error;
  }
}

export async function processFeedContent(content: string, llms: string[]) {
  // Process content with selected LLMs
  const processedContent = await processWithLLM(content, llms);
  return processedContent;
}