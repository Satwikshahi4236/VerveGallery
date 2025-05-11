import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FolderOpen, File, X, Check } from 'lucide-react';
import { usePhotoStore } from '../../store/photoStore';
import { Category } from '../../types';

interface UploadFormProps {
  categories: Category[];
}

const UploadForm = ({ categories }: UploadFormProps) => {
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { uploadPhoto, uploadStatus } = usePhotoStore();
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList) {
      const filesArray = Array.from(fileList);
      setSelectedFiles((prevFiles) => [...prevFiles, ...filesArray]);
    }
  };
  
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };
  
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = Array.from(event.dataTransfer.files);
    const imageFiles = droppedFiles.filter(file => file.type.startsWith('image/'));
    
    setSelectedFiles((prevFiles) => [...prevFiles, ...imageFiles]);
  };
  
  const handleRemoveFile = (indexToRemove: number) => {
    setSelectedFiles(selectedFiles.filter((_, index) => index !== indexToRemove));
  };
  
  const handleBrowseFiles = () => {
    fileInputRef.current?.click();
  };
  
  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;
    
    try {
      // Upload each file
      for (const file of selectedFiles) {
        await uploadPhoto(file, selectedCategory || undefined);
      }
      
      // Navigate to gallery or category
      if (selectedCategory) {
        navigate(`/category/${selectedCategory}`);
      } else {
        navigate('/gallery');
      }
    } catch (error) {
      console.error('Upload error:', error);
    }
  };
  
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    else if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    else return (bytes / (1024 * 1024 * 1024)).toFixed(1) + ' GB';
  };
  
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6 rounded-lg bg-white p-6 shadow-smooth dark:bg-secondary-800">
        <h2 className="mb-4 text-xl font-medium">Upload Photos</h2>
        
        {/* File Drop Area */}
        <div
          className={`mb-6 flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors ${
            isDragging
              ? 'border-primary-400 bg-primary-50 dark:border-primary-500 dark:bg-primary-900/20'
              : 'border-secondary-300 dark:border-secondary-700'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            multiple
            className="hidden"
          />
          
          <Upload className="mb-3 h-12 w-12 text-secondary-400" />
          <p className="mb-2 text-lg font-medium">Drag and drop your photos here</p>
          <p className="mb-4 text-center text-sm text-secondary-600 dark:text-secondary-400">
            Or click the button below to browse your files
          </p>
          <button 
            type="button"
            onClick={handleBrowseFiles}
            className="btn btn-primary"
          >
            <FolderOpen className="mr-2 h-4 w-4" />
            Browse Files
          </button>
        </div>
        
        {/* Category Selection */}
        <div className="mb-6">
          <label 
            htmlFor="category" 
            className="mb-2 block font-medium"
          >
            Select Category (Optional)
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="input"
          >
            <option value="">No Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        
        {/* Selected Files */}
        {selectedFiles.length > 0 && (
          <div className="mb-6">
            <h3 className="mb-3 font-medium">Selected Files ({selectedFiles.length})</h3>
            <div className="max-h-60 overflow-y-auto rounded-lg border border-secondary-200 dark:border-secondary-700">
              <ul className="divide-y divide-secondary-200 dark:divide-secondary-700">
                {selectedFiles.map((file, index) => (
                  <li key={index} className="flex items-center p-3">
                    <div className="mr-3 rounded-md bg-secondary-100 p-2 dark:bg-secondary-700">
                      <File className="h-5 w-5 text-secondary-600 dark:text-secondary-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="truncate font-medium">{file.name}</p>
                      <p className="text-sm text-secondary-600 dark:text-secondary-400">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(index)}
                      className="ml-2 rounded-full p-1 text-secondary-500 hover:bg-secondary-100 hover:text-error-500 dark:hover:bg-secondary-700"
                      aria-label="Remove file"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        
        {/* Upload Progress */}
        {uploadStatus && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">Uploading</h3>
              <span className="text-sm font-medium">
                {uploadStatus.progress}%
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-secondary-100 dark:bg-secondary-700">
              <div 
                className={`h-full rounded-full ${
                  uploadStatus.status === 'error' 
                    ? 'bg-error-500' 
                    : uploadStatus.status === 'completed'
                    ? 'bg-success-500'
                    : 'bg-primary-500'
                }`} 
                style={{ width: `${uploadStatus.progress}%` }}
              />
            </div>
            <div className="mt-2 flex items-center text-sm">
              {uploadStatus.status === 'completed' ? (
                <span className="flex items-center text-success-500">
                  <Check className="mr-1 h-4 w-4" />
                  Upload complete
                </span>
              ) : uploadStatus.status === 'error' ? (
                <span className="flex items-center text-error-500">
                  <X className="mr-1 h-4 w-4" />
                  Upload failed
                </span>
              ) : (
                <span className="text-secondary-600 dark:text-secondary-400">
                  Uploading {uploadStatus.fileName}...
                </span>
              )}
            </div>
          </div>
        )}
        
        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleUpload}
            disabled={selectedFiles.length === 0 || (uploadStatus?.status === 'uploading')}
            className="btn btn-primary"
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload {selectedFiles.length > 0 ? `(${selectedFiles.length})` : ''}
          </button>
          
          <button
            type="button"
            onClick={() => setSelectedFiles([])}
            disabled={selectedFiles.length === 0}
            className="btn btn-outline"
          >
            Clear Selection
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadForm;