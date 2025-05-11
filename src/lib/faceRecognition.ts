import axios from 'axios';
import { MediaItem, SearchResult } from '../types';

// This is a mock implementation since actual face recognition would require a backend
export const searchByFace = async (
  faceImage: File,
  allMedia: MediaItem[]
): Promise<SearchResult[]> => {
  console.log('Searching for face matches...', faceImage.name);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock results - in a real app, this would call a backend API
  const mockResults: SearchResult[] = [];
  
  // Select random items as "matches" for demo purposes
  const sampleSize = Math.min(5, allMedia.length);
  const shuffled = [...allMedia].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, sampleSize);
  
  if (selected.length > 0) {
    mockResults.push({
      mediaItems: selected,
      matchConfidence: 0.85
    });
  }
  
  return mockResults;
};