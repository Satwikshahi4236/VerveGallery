import React from 'react';
import { Download, Play } from 'lucide-react';
import { MediaItem } from '../../types';
import Button from './Button';

interface MediaCardProps {
  item: MediaItem;
  onDownload: (item: MediaItem) => void;
}

const MediaCard: React.FC<MediaCardProps> = ({ item, onDownload }) => {
  const isVideo = item.mimeType.includes('video');
  
  return (
    <div className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={item.thumbnailUrl}
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {isVideo && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
            <div className="rounded-full bg-black bg-opacity-50 p-3">
              <Play className="h-6 w-6 text-white" />
            </div>
          </div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        
        <div className="absolute bottom-0 left-0 right-0 p-3 transform translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <Button
            onClick={() => onDownload(item)}
            variant="primary"
            size="sm"
            className="w-full"
            icon={<Download size={16} />}
          >
            Download
          </Button>
        </div>
      </div>
      
      <div className="p-3">
        <h3 className="mb-1 truncate text-sm font-medium text-gray-800">{item.name}</h3>
        <p className="text-xs text-gray-500">
          {new Date(item.createdTime).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default MediaCard;