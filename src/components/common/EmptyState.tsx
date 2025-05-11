import React from 'react';
import { FolderOpen } from 'lucide-react';
import Button from './Button';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionLabel,
  onAction,
  icon = <FolderOpen className="h-12 w-12 text-gray-400" />
}) => {
  return (
    <div className="flex h-64 flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-center">
      <div className="mb-4">{icon}</div>
      <h3 className="mb-2 text-lg font-medium text-gray-700">{title}</h3>
      <p className="mb-4 max-w-md text-sm text-gray-500">{description}</p>
      
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="primary">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;