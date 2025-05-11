export interface Photo {
  id: string;
  name: string;
  thumbnailUrl: string;
  fullImageUrl: string;
  downloadUrl: string;
  dateCreated: string;
  width: number;
  height: number;
  size: number;
  type: string;
}

export interface Category {
  id: string;
  name: string;
  count: number;
  coverImage: string;
}

export interface UploadStatus {
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  fileName: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  photoUrl: string;
}