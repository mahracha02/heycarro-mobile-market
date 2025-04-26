
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search, Bell } from 'lucide-react';
import Logo from '@/components/Logo';
import BannerCarousel from '@/components/BannerCarousel';
import CategoryList from '@/components/CategoryList';
import ProductList from '@/components/ProductList';
import { products } from '@/data/sampleData';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';

const Home = () => {
  const navigate = useNavigate();
  const { setSearchQuery } = useCart();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (e.target.value.trim()) {
      navigate('/search');
    }
  };

  const handleSearchFocus = () => {
    navigate('/search');
  };

  // Filtrar productos con descuento
  const discountedProducts = products.filter(product => product.discount);
  
  // Filtrar productos nuevos
  const newProducts = products.filter(product => product.isNew);

  // Productos mejor valorados
  const topRatedProducts = [...products]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 6);

  return (
    <div className="pb-16 animate-fade-in">
      {/* Header */}
      <div className="px-4 pt-4 pb-3 flex items-center justify-between">
        <Logo size="small" />
        <Bell size={24} className="text-gray-600" />
      </div>

      {/* Search Bar */}
      <div className="px-4 mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <Input
            type="search"
            placeholder="¿Qué estás buscando hoy?"
            className="pl-10 pr-4 py-6 rounded-full bg-gray-100 border-gray-200"
            onChange={handleSearchChange}
            onFocus={handleSearchFocus}
          />
        </div>
      </div>

      {/* Banners */}
      <div className="px-4 mb-4">
        <BannerCarousel />
      </div>

      {/* Categories */}
      <CategoryList />

      {/* Discounted Products */}
      <ProductList 
        title="Ofertas destacadas" 
        products={discountedProducts}
        showSeeAll
        onSeeAllClick={() => navigate('/offers')}
      />

      {/* New Products */}
      <ProductList 
        title="Novedades" 
        products={newProducts}
        showSeeAll
        onSeeAllClick={() => navigate('/new')}
      />

      {/* Top Rated Products */}
      <ProductList 
        title="Los más populares" 
        products={topRatedProducts}
        showSeeAll
        onSeeAllClick={() => navigate('/popular')}
      />
    </div>
  );
};

export default Home;
