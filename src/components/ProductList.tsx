
import React from 'react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/context/CartContext';

interface ProductListProps {
  title: string;
  products: Product[];
  showSeeAll?: boolean;
  onSeeAllClick?: () => void;
}

const ProductList: React.FC<ProductListProps> = ({ 
  title, 
  products, 
  showSeeAll = false,
  onSeeAllClick 
}) => {
  return (
    <div className="py-4">
      <div className="flex justify-between items-center mb-3 px-4">
        <h2 className="font-poppins text-lg font-medium">{title}</h2>
        {showSeeAll && (
          <button 
            className="text-sm text-heycarro-blue font-medium"
            onClick={onSeeAllClick}
          >
            Ver todos
          </button>
        )}
      </div>
      <div className="flex overflow-x-auto space-x-4 pb-2 px-4">
        {products.map((product) => (
          <div key={product.id} className="min-w-[160px] max-w-[160px]">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
