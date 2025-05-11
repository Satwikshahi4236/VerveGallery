import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FolderOpen } from 'lucide-react';
import { Category } from '../../types';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  
  const navigateToCategory = () => {
    navigate(`/category/${category.id}`);
  };
  
  const placeholderColors = [
    'bg-primary-100 text-primary-700',
    'bg-accent-100 text-accent-700',
    'bg-success-100 text-success-700',
    'bg-warning-100 text-warning-700'
  ];
  
  // Choose a color based on the category name to keep it consistent
  const colorIndex = category.name.charCodeAt(0) % placeholderColors.length;
  const placeholderColor = placeholderColors[colorIndex];
  
  return (
    <div 
      className="rounded-lg bg-white shadow-smooth transition-all hover:shadow-smooth-md dark:bg-secondary-800"
      onClick={navigateToCategory}
    >
      <div className="group relative aspect-[4/3] overflow-hidden rounded-t-lg">
        {!imageError && category.coverImage ? (
          <img
            src={category.coverImage}
            alt={category.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className={`flex h-full w-full items-center justify-center ${placeholderColor}`}>
            <FolderOpen className="h-16 w-16" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80"></div>
      </div>
      
      <div className="p-4">
        <h3 className="mb-1 font-medium">{category.name}</h3>
        <p className="text-sm text-secondary-600 dark:text-secondary-400">
          {category.count} {category.count === 1 ? 'photo' : 'photos'}
        </p>
      </div>
    </div>
  );
};

export default CategoryCard;