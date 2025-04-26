
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { categories } from '@/data/sampleData';
import { Apple, Wine, Flag, Home, Sparkles, Brush } from 'lucide-react';

const CategoryList = () => {
  const navigate = useNavigate();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Apple':
        return <Apple size={24} />;
      case 'Wine':
        return <Wine size={24} />;
      case 'Flag':
        return <Flag size={24} />;
      case 'Home':
        return <Home size={24} />;
      case 'Sparkles':
        return <Sparkles size={24} />;
      case 'Brush':
        return <Brush size={24} />;
      default:
        return <Apple size={24} />;
    }
  };

  return (
    <div className="py-4">
      <h2 className="font-poppins text-lg font-medium mb-3 px-4">Categorías</h2>
      <div className="flex overflow-x-auto space-x-4 pb-2 px-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="min-w-[80px] flex flex-col items-center cursor-pointer"
            onClick={() => navigate(`/category/${category.id}`)}
          >
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-heycarro-blue mb-2">
              {getIcon(category.icon)}
            </div>
            <span className="text-sm text-center">{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
