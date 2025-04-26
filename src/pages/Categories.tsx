
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { categories } from '@/data/sampleData';
import { Apple, Wine, Flag, Home, Sparkles, Brush, ChevronRight } from 'lucide-react';

const Categories = () => {
  const navigate = useNavigate();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Apple':
        return <Apple size={24} className="text-heycarro-blue" />;
      case 'Wine':
        return <Wine size={24} className="text-heycarro-blue" />;
      case 'Flag':
        return <Flag size={24} className="text-heycarro-blue" />;
      case 'Home':
        return <Home size={24} className="text-heycarro-blue" />;
      case 'Sparkles':
        return <Sparkles size={24} className="text-heycarro-blue" />;
      case 'Brush':
        return <Brush size={24} className="text-heycarro-blue" />;
      default:
        return <Apple size={24} className="text-heycarro-blue" />;
    }
  };

  return (
    <div className="pb-16 animate-fade-in">
      <div className="px-4 pt-6 pb-4">
        <h1 className="text-2xl font-bold font-poppins">Categorías</h1>
        <p className="text-gray-500 text-sm mt-1">Explora nuestros productos por categoría</p>
      </div>

      <div className="bg-white">
        {categories.map((category) => (
          <div 
            key={category.id}
            className="border-b border-gray-100 flex items-center px-4 py-3 cursor-pointer"
            onClick={() => navigate(`/category/${category.id}`)}
          >
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
              {getIcon(category.icon)}
            </div>
            <div className="flex-1">
              <h3 className="font-medium">{category.name}</h3>
              <p className="text-xs text-gray-500">{category.description}</p>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
