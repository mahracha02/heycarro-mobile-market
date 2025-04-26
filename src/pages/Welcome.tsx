
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';
import { ShoppingCart } from 'lucide-react';

const Welcome = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/home');
  };

  return (
    <div className="h-full flex flex-col items-center justify-center bg-white p-6 animate-fade-in space-y-10">
      <div className="bg-white rounded-full p-8 shadow-md">
        <ShoppingCart size={100} className="text-heycarro-orange" />
      </div>
      
      <Logo size="large" />
      
      <p className="text-gray-600 text-center max-w-xs">
        Tu supermercado online favorito. Compra productos frescos y recíbelos en casa.
      </p>
      
      <Button 
        onClick={handleStart}
        className="w-full bg-heycarro-blue hover:bg-heycarro-orange text-white"
        size="lg"
      >
        Empezar
      </Button>
    </div>
  );
};

export default Welcome;
