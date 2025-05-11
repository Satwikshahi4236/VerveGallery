import { create } from 'zustand';
import { fetchPhotos, getFoldersByCategory, uploadFile } from '../services/googleDriveService';
import { Photo, Category, UploadStatus } from '../types';

interface PhotoState {
  photos: Photo[];
  recentPhotos: Photo[];
  categories: Category[];
  selectedCategory: Category | null;
  isLoading: boolean;
  error: string | null;
  uploadStatus: UploadStatus | null;
  fetchAllPhotos: () => Promise<void>;
  fetchPhotosByCategory: (categoryId: string) => Promise<void>;
  fetchRecentPhotos: (limit?: number) => Promise<void>;
  fetchCategories: () => Promise<void>;
  setSelectedCategory: (category: Category | null) => void;
  uploadPhoto: (file: File, categoryId?: string) => Promise<void>;
  searchPhotosByFace: (faceImageData: string) => Promise<Photo[]>;
}

export const usePhotoStore = create<PhotoState>((set, get) => ({
  photos: [],
  recentPhotos: [],
  categories: [],
  selectedCategory: null,
  isLoading: false,
  error: null,
  uploadStatus: null,

  fetchAllPhotos: async () => {
    set({ isLoading: true, error: null });
    try {
      const photos = await fetchPhotos();
      set({ photos });
    } catch (error) {
      console.error('Failed to fetch photos:', error);
      set({ error: 'Failed to fetch photos' });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchPhotosByCategory: async (categoryId: string) => {
    set({ isLoading: true, error: null });
    try {
      const category = get().categories.find(c => c.id === categoryId);
      if (category) {
        set({ selectedCategory: category });
        const photos = await fetchPhotos(categoryId);
        set({ photos });
      } else {
        set({ error: 'Category not found' });
      }
    } catch (error) {
      console.error('Failed to fetch photos by category:', error);
      set({ error: 'Failed to fetch category photos' });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchRecentPhotos: async (limit = 20) => {
    set({ isLoading: true, error: null });
    try {
      const photos = await fetchPhotos(undefined, limit);
      set({ recentPhotos: photos });
    } catch (error) {
      console.error('Failed to fetch recent photos:', error);
      set({ error: 'Failed to fetch recent photos' });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchCategories: async () => {
    set({ isLoading: true, error: null });
    try {
      const categoryNames = ['Rajyotsava', 'Verve Cup', 'JSS Run', 'Verve'];
      const categoriesData = await Promise.all(
        categoryNames.map(async (name) => {
          const folders = await getFoldersByCategory(name);
          // Use the first folder found or create a placeholder
          return {
            id: folders[0]?.id || `placeholder-${name.toLowerCase().replace(/\s+/g, '-')}`,
            name,
            count: folders[0]?.count || 0,
            coverImage: folders[0]?.coverImage || ''
          };
        })
      );
      
      set({ categories: categoriesData });
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      set({ error: 'Failed to fetch categories' });
    } finally {
      set({ isLoading: false });
    }
  },

  setSelectedCategory: (category: Category | null) => {
    set({ selectedCategory: category });
  },

  uploadPhoto: async (file: File, categoryId?: string) => {
    set({ uploadStatus: { progress: 0, status: 'uploading', fileName: file.name } });
    try {
      await uploadFile(
        file, 
        categoryId,
        (progress) => {
          set({ uploadStatus: { progress, status: 'uploading', fileName: file.name } });
        }
      );
      
      set({ uploadStatus: { progress: 100, status: 'completed', fileName: file.name } });
      
      // Refresh photos if we're viewing the category we just uploaded to
      if (categoryId && get().selectedCategory?.id === categoryId) {
        get().fetchPhotosByCategory(categoryId);
      }
    } catch (error) {
      console.error('Failed to upload photo:', error);
      set({ 
        error: 'Failed to upload photo',
        uploadStatus: { progress: 0, status: 'error', fileName: file.name }
      });
    }
  },

  searchPhotosByFace: async (faceImageData: string) => {
    set({ isLoading: true, error: null });
    try {
      // In a real implementation, we would send this face data to a 
      // server for processing and then get matching photos back
      console.log('Searching photos by face data:', faceImageData);
      const allPhotos = await fetchPhotos();
      // Simulate face matching result with a random subset
      await new Promise(resolve => setTimeout(resolve, 1500));
      const matchingPhotos = allPhotos
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * 10) + 5);
      
      set({ photos: matchingPhotos });
      return matchingPhotos;
    } catch (error) {
      console.error('Face search error:', error);
      set({ error: 'Failed to search by face' });
      return [];
    } finally {
      set({ isLoading: false });
    }
  }
}));