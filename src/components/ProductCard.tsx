
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Star } from 'lucide-react';
import { type Product, useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
  showAddToCart?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, showAddToCart = true }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  // Calcular precio con descuento si existe
  const finalPrice = product.discount 
    ? product.price * (1 - product.discount / 100)
    : product.price;

  return (
    <div 
      className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
      onClick={handleClick}
    >
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-36 object-cover"
        />
        
        {product.discount && (
          <div className="absolute top-2 right-2 bg-heycarro-orange text-white text-xs font-bold px-2 py-1 rounded">
            -{product.discount}%
          </div>
        )}
        
        {product.isNew && (
          <div className="absolute top-2 left-2 bg-heycarro-blue text-white text-xs font-bold px-2 py-1 rounded">
            Nuevo
          </div>
        )}
      </div>

      <div className="p-3">
        <h3 className="text-sm font-medium line-clamp-2 mb-1">{product.name}</h3>
        
        <div className="flex items-center mb-1">
          <Star size={14} className="text-yellow-400 fill-yellow-400" />
          <span className="text-xs text-gray-600 ml-1">{product.rating}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="font-bold text-lg">{finalPrice.toFixed(2)}€</span>
            {product.discount && (
              <span className="text-xs text-gray-500 line-through ml-2">
                {product.price.toFixed(2)}€
              </span>
            )}
          </div>
          
          {showAddToCart && (
            <Button 
              size="icon" 
              className="w-8 h-8 bg-heycarro-blue hover:bg-heycarro-orange"
              onClick={handleAddToCart}
            >
              <ShoppingCart size={16} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
