import { Photo, Category } from '../types';

/// <reference types="gapi" />
/// <reference types="gapi.auth2" />

// Declare gapi as a global variable
declare const gapi: any;

// Utility function to ensure gapi is initialized
const ensureGapiInitialized = async () => {
  if (!gapi || !gapi.client) {
    throw new Error('Google API client is not initialized. Call loadGapiClient first.');
  }
};

// Initialize the Google API client
export const loadGapiClient = async () => {
  return new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      gapi.load('client:auth2', async () => {
        try {
          await gapi.client.init({
            apiKey: 'AIzaSyCu9xr_wgcIotbszTls6NvxRETp_LTfgnY',
            clientId: '60929385340-2m1820t2sl55eih9qjhett3g1164hkvk.apps.googleusercontent.com',
            scope: 'https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.metadata.readonly',
            discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
          });
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    };
    script.onerror = () => reject(new Error('Failed to load Google API script'));
    document.body.appendChild(script);
  });
};

// Fetch photos from Google Drive
export const fetchPhotos = async (folderId?: string, limit = 100): Promise<Photo[]> => {
  try {
    await ensureGapiInitialized();

    let query = "mimeType contains 'image/' and trashed = false";
    if (folderId) {
      query += ` and '${folderId}' in parents`;
    }

    const response = await gapi.client.drive.files.list({
      q: query,
      fields: 'files(id, name, mimeType, thumbnailLink, imageMediaMetadata, webContentLink, createdTime)',
      pageSize: limit,
      orderBy: 'createdTime desc',
    });

    if (response.status !== 200) {
      throw new Error(`Error fetching photos: ${response.statusText}`);
    }

    const files = response.result.files || [];
    return files.map((file: any) => ({
      id: file.id,
      name: file.name,
      thumbnailUrl: file.thumbnailLink || '',
      fullImageUrl: `https://drive.google.com/uc?id=${file.id}`,
      downloadUrl: file.webContentLink || '',
      dateCreated: file.createdTime,
      width: file.imageMediaMetadata?.width || 0,
      height: file.imageMediaMetadata?.height || 0,
      size: file.size || 0,
      type: file.mimeType || '',
    }));
  } catch (error) {
    console.error('Error fetching photos:', error);
    throw error;
  }
};

export const getFoldersByCategory = async (categoryName: string): Promise<Category[]> => {
  try {
    await ensureGapiInitialized();

    const query = `mimeType = 'application/vnd.google-apps.folder' and name contains '${categoryName}' and trashed = false`;

    const response = await gapi.client.drive.files.list({
      q: query,
      fields: 'files(id, name)',
    });

    if (response.status !== 200) {
      throw new Error(`Error fetching folders: ${response.statusText}`);
    }

    const folders = response.result.files || [];

    const folderPromises = folders.map(async (folder: any) => {
      const photosResponse = await gapi.client.drive.files.list({
        q: `'${folder.id}' in parents and mimeType contains 'image/' and trashed = false`,
        fields: 'files(id, thumbnailLink), nextPageToken',
        pageSize: 1,
      });

      const photoCount = photosResponse.result.files?.length || 0;
      const coverImage = photoCount > 0 ? photosResponse.result.files[0].thumbnailLink : '';

      return {
        id: folder.id,
        name: folder.name,
        count: photoCount,
        coverImage,
      };
    });

    return Promise.all(folderPromises);
  } catch (error) {
    console.error('Error fetching folders:', error); // Log the full error object
    throw error;
  }
};
// Upload a file to Google Drive
export const uploadFile = async (
  file: File,
  folderId?: string,
  onProgress?: (progress: number) => void
): Promise<string> => {
  try {
    await ensureGapiInitialized();

    const authInstance = gapi.auth2.getAuthInstance();
    const currentUser = authInstance.currentUser.get();
    const authResponse = currentUser.getAuthResponse();
    const accessToken = authResponse.access_token;

    const metadata = {
      name: file.name,
      mimeType: file.type,
    };

    if (folderId) {
      Object.assign(metadata, { parents: [folderId] });
    }

    const form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    form.append('file', file);

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart');
      xhr.setRequestHeader('Authorization', `Bearer ${accessToken}`);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable && onProgress) {
          const progress = Math.round((event.loaded / event.total) * 100);
          onProgress(progress);
        }
      };

      xhr.onload = () => {
        if (xhr.status === 200 || xhr.status === 201) {
          const response = JSON.parse(xhr.responseText);
          resolve(response.id);
        } else {
          reject(new Error(`Upload failed with status ${xhr.status}: ${xhr.statusText}`));
        }
      };

      xhr.onerror = () => {
        reject(new Error('Upload failed'));
      };

      xhr.send(form);
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

// Get a file's details
export const getFileDetails = async (fileId: string): Promise<Photo> => {
  try {
    await ensureGapiInitialized();

    const response = await gapi.client.drive.files.get({
      fileId,
      fields: 'id, name, mimeType, thumbnailLink, imageMediaMetadata, webContentLink, createdTime, size',
    });

    if (response.status !== 200) {
      throw new Error(`Error fetching file details: ${response.statusText}`);
    }

    const file = response.result;
    return {
      id: file.id,
      name: file.name,
      thumbnailUrl: file.thumbnailLink || '',
      fullImageUrl: `https://drive.google.com/uc?id=${file.id}`,
      downloadUrl: file.webContentLink || '',
      dateCreated: file.createdTime,
      width: file.imageMediaMetadata?.width || 0,
      height: file.imageMediaMetadata?.height || 0,
      size: file.size || 0,
      type: file.mimeType || '',
    };
  } catch (error) {
    console.error('Error fetching file details:', error);
    throw error;
  }
};