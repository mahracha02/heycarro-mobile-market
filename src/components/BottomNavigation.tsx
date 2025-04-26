
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Home, Search, ShoppingCart, User, Menu } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItemCount } = useCart();
  
  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    {
      path: '/home',
      label: 'Inicio',
      icon: <Home size={20} />
    },
    {
      path: '/search',
      label: 'Buscar',
      icon: <Search size={20} />
    },
    {
      path: '/categories',
      label: 'Menú',
      icon: <Menu size={20} />
    },
    {
      path: '/cart',
      label: 'Carrito',
      icon: <ShoppingCart size={20} />,
      badge: cartItemCount
    },
    {
      path: '/profile',
      label: 'Perfil',
      icon: <User size={20} />
    }
  ];

  return (
    <div className="bottom-nav bg-white border-t border-gray-200 py-2">
      <div className="flex justify-between items-center px-6">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={cn(
              'flex flex-col items-center justify-center w-12 pt-1 pb-1 relative',
              isActive(item.path) ? 'text-heycarro-blue' : 'text-gray-500'
            )}
          >
            {item.badge && item.badge > 0 && (
              <div className="absolute -top-1 -right-1 bg-heycarro-orange text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                {item.badge}
              </div>
            )}
            {item.icon}
            <span className="text-[10px] mt-1">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;
