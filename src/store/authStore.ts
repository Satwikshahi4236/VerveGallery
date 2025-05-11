import { create } from 'zustand';

// Declare gapi as a global variable
declare const gapi: any;

interface AuthState {
  isAuthenticated: boolean;
  user: {
    id: string;
    name: string;
    email: string;
    photoUrl: string;
  } | null;
  accessToken: string | null;
  isLoading: boolean;
  error: string | null;
  initAuth: () => Promise<void>;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  accessToken: null,
  isLoading: false,
  error: null,

  initAuth: async () => {
    set({ isLoading: true, error: null });
    try {
      // Load Google Auth library
      await new Promise<void>((resolve) => {
        gapi.load('client:auth2', resolve);
      });

      await gapi.client.init({
        apiKey: 'AIzaSyCu9xr_wgcIotbszTls6NvxRETp_LTfgnY',
        clientId: '60929385340-2m1820t2sl55eih9qjhett3g1164hkvk.apps.googleusercontent.com',
        scope: 'https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.photos.readonly',
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest']
      });

      const authInstance = gapi.auth2.getAuthInstance();
      const isSignedIn = authInstance.isSignedIn.get();

      if (isSignedIn) {
        const googleUser = authInstance.currentUser.get();
        const profile = googleUser.getBasicProfile();
        const authResponse = googleUser.getAuthResponse();
        
        set({
          isAuthenticated: true,
          user: {
            id: profile.getId(),
            name: profile.getName(),
            email: profile.getEmail(),
            photoUrl: profile.getImageUrl(),
          },
          accessToken: authResponse.access_token,
        });
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
      set({ error: 'Failed to initialize authentication' });
    } finally {
      set({ isLoading: false });
    }
  },

  signIn: async () => {
    set({ isLoading: true, error: null });
    try {
      const authInstance = gapi.auth2.getAuthInstance();
      const googleUser = await authInstance.signIn();
      
      const profile = googleUser.getBasicProfile();
      const authResponse = googleUser.getAuthResponse();
      
      set({
        isAuthenticated: true,
        user: {
          id: profile.getId(),
          name: profile.getName(),
          email: profile.getEmail(),
          photoUrl: profile.getImageUrl(),
        },
        accessToken: authResponse.access_token,
      });
    } catch (error) {
      console.error('Sign in error:', error);
      set({ error: 'Failed to sign in' });
    } finally {
      set({ isLoading: false });
    }
  },

  signOut: async () => {
    set({ isLoading: true, error: null });
    try {
      const authInstance = gapi.auth2.getAuthInstance();
      await authInstance.signOut();
      
      set({
        isAuthenticated: false,
        user: null,
        accessToken: null,
      });
    } catch (error) {
      console.error('Sign out error:', error);
      set({ error: 'Failed to sign out' });
    } finally {
      set({ isLoading: false });
    }
  },
}));