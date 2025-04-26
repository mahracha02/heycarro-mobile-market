
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart, CartItem } from '@/context/CartContext';

const Cart = () => {
  const { cart, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const renderCartItem = (item: CartItem) => {
    const { product, quantity } = item;
    const finalPrice = product.discount 
      ? product.price * (1 - product.discount / 100)
      : product.price;

    return (
      <div key={product.id} className="flex py-4 border-b">
        <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden mr-3 flex-shrink-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-medium">{product.name}</h3>
          <div className="flex items-center mt-1">
            <span className="font-bold">{finalPrice.toFixed(2)}€</span>
            {product.discount && (
              <span className="text-xs text-gray-500 line-through ml-2">
                {product.price.toFixed(2)}€
              </span>
            )}
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center border rounded-lg">
              <button 
                className="px-2 py-1 text-gray-600"
                onClick={() => updateQuantity(product.id, quantity - 1)}
                disabled={quantity <= 1}
              >
                <Minus size={16} />
              </button>
              <span className="px-3 py-1 text-center min-w-[32px] text-sm">{quantity}</span>
              <button 
                className="px-2 py-1 text-gray-600"
                onClick={() => updateQuantity(product.id, quantity + 1)}
                disabled={quantity >= product.stock}
              >
                <Plus size={16} />
              </button>
            </div>
            <button 
              className="text-gray-400 hover:text-red-500"
              onClick={() => removeFromCart(product.id)}
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="pb-36 animate-fade-in">
      {/* Header */}
      <div className="px-4 pt-6 pb-4 bg-white border-b">
        <h1 className="text-2xl font-bold font-poppins">Tu carrito</h1>
        <div className="flex items-center justify-between mt-2">
          <p className="text-gray-500 text-sm">{cart.length} {cart.length === 1 ? 'producto' : 'productos'}</p>
          {cart.length > 0 && (
            <button 
              className="text-sm text-heycarro-blue"
              onClick={clearCart}
            >
              Vaciar carrito
            </button>
          )}
        </div>
      </div>

      {/* Cart Items */}
      <div className="p-4">
        {cart.length > 0 ? (
          <div>
            {cart.map(renderCartItem)}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <ShoppingBag size={64} className="text-gray-300 mb-4" />
            <p className="text-lg text-gray-500 mb-2">Tu carrito está vacío</p>
            <p className="text-sm text-gray-400 mb-6 text-center">
              Añade productos para empezar a comprar
            </p>
            <Button 
              className="bg-heycarro-blue hover:bg-heycarro-orange"
              onClick={() => navigate('/home')}
            >
              Explorar productos
            </Button>
          </div>
        )}
      </div>

      {/* Summary and Checkout */}
      {cart.length > 0 && (
        <div className="fixed bottom-16 left-0 right-0 bg-white border-t p-4 max-w-md mx-auto">
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span>{cartTotal.toFixed(2)}€</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Envío</span>
              <span>Gratis</span>
            </div>
            <div className="border-t border-gray-100 pt-2 flex justify-between font-bold">
              <span>Total</span>
              <span>{cartTotal.toFixed(2)}€</span>
            </div>
          </div>
          <Button 
            className="w-full bg-heycarro-blue hover:bg-heycarro-orange text-white"
            size="lg"
            onClick={handleCheckout}
          >
            Realizar pedido
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cart;
