
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Filter } from 'lucide-react';
import { categories, products } from '@/data/sampleData';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/context/CartContext';

type SortOption = 'price-asc' | 'price-desc' | 'rating' | 'name';

const CategoryDetail = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('rating');
  const [showSortOptions, setShowSortOptions] = useState(false);
  
  const category = categories.find(c => c.id === categoryId);

  useEffect(() => {
    if (categoryId) {
      const filtered = products.filter(product => product.category === categoryId);
      sortProducts(filtered, sortBy);
    }
  }, [categoryId, sortBy]);

  const sortProducts = (productsToSort: Product[], option: SortOption) => {
    let sorted: Product[] = [...productsToSort];
    
    switch (option) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }
    
    setCategoryProducts(sorted);
  };

  const handleSortChange = (option: SortOption) => {
    setSortBy(option);
    setShowSortOptions(false);
  };

  if (!category) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-gray-500">Categoría no encontrada</p>
        <button 
          className="text-heycarro-blue mt-2"
          onClick={() => navigate('/categories')}
        >
          Volver a categorías
        </button>
      </div>
    );
  }

  return (
    <div className="pb-16 animate-fade-in">
      {/* Header */}
      <div className="bg-white border-b px-4 py-3 flex items-center">
        <button onClick={() => navigate(-1)} className="mr-4">
          <ChevronLeft size={24} className="text-gray-500" />
        </button>
        <div>
          <h1 className="text-xl font-medium font-poppins">{category.name}</h1>
          <p className="text-xs text-gray-500">{categoryProducts.length} productos</p>
        </div>
      </div>

      {/* Sort Bar */}
      <div className="bg-white px-4 py-3 border-b flex justify-between items-center">
        <div className="relative">
          <button 
            className="flex items-center space-x-2 text-sm"
            onClick={() => setShowSortOptions(!showSortOptions)}
          >
            <Filter size={16} />
            <span>Ordenar por: {getSortLabel(sortBy)}</span>
          </button>
          
          {showSortOptions && (
            <div className="absolute top-full left-0 mt-1 bg-white shadow-md rounded-md border border-gray-200 z-20 w-48">
              {sortOptions.map(option => (
                <button
                  key={option.value}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${sortBy === option.value ? 'font-medium text-heycarro-blue' : ''}`}
                  onClick={() => handleSortChange(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 gap-4 p-4">
        {categoryProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Empty State */}
      {categoryProducts.length === 0 && (
        <div className="flex flex-col items-center justify-center p-8">
          <p className="text-gray-500 text-center">
            No hay productos disponibles en esta categoría en este momento.
          </p>
        </div>
      )}
    </div>
  );
};

const sortOptions = [
  { label: 'Valoración', value: 'rating' as SortOption },
  { label: 'Precio: menor a mayor', value: 'price-asc' as SortOption },
  { label: 'Precio: mayor a menor', value: 'price-desc' as SortOption },
  { label: 'Nombre', value: 'name' as SortOption },
];

const getSortLabel = (value: SortOption): string => {
  return sortOptions.find(option => option.value === value)?.label || 'Relevancia';
};

export default CategoryDetail;
