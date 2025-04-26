
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { toast } from '@/components/ui/use-toast';

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  stock: number;
  discount?: number;
  isNew?: boolean;
  rating?: number;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

type OrderStatus = 'Confirmado' | 'En preparación' | 'En camino' | 'Entregado';

export type Order = {
  id: string;
  items: CartItem[];
  total: number;
  date: Date;
  address: string;
  status: OrderStatus;
  paymentMethod: 'tarjeta' | 'contra-entrega';
};

type UserData = {
  name: string;
  phone: string;
  addresses: string[];
  orders: Order[];
};

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartItemCount: number;
  userData: UserData | null;
  setUserData: (data: UserData) => void;
  orders: Order[];
  addOrder: (order: Order) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Simular datos del usuario para la demo
    setUserData({
      name: 'Usuario Demo',
      phone: '600123456',
      addresses: ['Calle Principal 123, Madrid'],
      orders: []
    });

    // Cargar carrito del localStorage si existe
    const savedCart = localStorage.getItem('heycarro-cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
      } catch (error) {
        console.error('Error parsing cart from localStorage', error);
      }
    }
  }, []);

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('heycarro-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, quantity = 1) => {
    setCart(currentCart => {
      const existingItemIndex = currentCart.findIndex(
        item => item.product.id === product.id
      );

      if (existingItemIndex >= 0) {
        const newCart = [...currentCart];
        newCart[existingItemIndex] = {
          ...newCart[existingItemIndex],
          quantity: newCart[existingItemIndex].quantity + quantity
        };
        
        toast({
          title: "Producto actualizado",
          description: `${product.name} actualizado en el carrito`
        });
        
        return newCart;
      } else {
        toast({
          title: "Producto añadido",
          description: `${product.name} añadido al carrito`
        });
        
        return [...currentCart, { product, quantity }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(currentCart => {
      const product = currentCart.find(item => item.product.id === productId)?.product;
      
      if (product) {
        toast({
          title: "Producto eliminado",
          description: `${product.name} eliminado del carrito`
        });
      }
      
      return currentCart.filter(item => item.product.id !== productId);
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    
    setCart(currentCart => {
      return currentCart.map(item => {
        if (item.product.id === productId) {
          return { ...item, quantity };
        }
        return item;
      });
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce(
    (total, item) => {
      const price = item.product.discount 
        ? item.product.price * (1 - item.product.discount / 100) 
        : item.product.price;
      return total + price * item.quantity;
    }, 0
  );

  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  const addOrder = (order: Order) => {
    setOrders(current => [...current, order]);
    if (userData) {
      setUserData({
        ...userData,
        orders: [...userData.orders, order]
      });
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartItemCount,
        userData,
        setUserData,
        orders,
        addOrder,
        searchQuery,
        setSearchQuery
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
