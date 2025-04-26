
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Check, Package, Truck, Home } from 'lucide-react';
import { useCart, Order } from '@/context/CartContext';

const OrderStatus = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const { userData } = useCart();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (userData && orderId) {
      const foundOrder = userData.orders.find(o => o.id === orderId);
      if (foundOrder) {
        setOrder(foundOrder);
      }
    }
  }, [orderId, userData]);

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4">
        <p className="text-gray-500">Pedido no encontrado</p>
        <button 
          className="text-heycarro-blue mt-2"
          onClick={() => navigate('/profile')}
        >
          Ver mis pedidos
        </button>
      </div>
    );
  }

  const statusSteps = [
    { status: 'Confirmado', icon: <Check size={24} />, label: 'Pedido confirmado' },
    { status: 'En preparación', icon: <Package size={24} />, label: 'En preparación' },
    { status: 'En camino', icon: <Truck size={24} />, label: 'En camino' },
    { status: 'Entregado', icon: <Home size={24} />, label: 'Entregado' },
  ];

  const currentStepIndex = statusSteps.findIndex(step => step.status === order.status);

  return (
    <div className="pb-16 animate-fade-in">
      {/* Header */}
      <div className="bg-white p-4 flex items-center border-b">
        <button onClick={() => navigate(-1)} className="mr-3">
          <ChevronLeft size={24} className="text-gray-500" />
        </button>
        <div>
          <h1 className="text-lg font-medium font-poppins">Estado del pedido</h1>
          <p className="text-sm text-gray-500">{order.id}</p>
        </div>
      </div>

      {/* Status Tracker */}
      <div className="p-6 bg-white mb-4">
        <div className="relative">
          {/* Progress Bar */}
          <div className="absolute left-6 top-0 w-0.5 h-full bg-gray-200 z-0"></div>
          
          {/* Steps */}
          <div className="relative z-10">
            {statusSteps.map((step, index) => {
              const isCompleted = index <= currentStepIndex;
              const isCurrent = index === currentStepIndex;
              
              return (
                <div key={step.status} className="flex mb-8 last:mb-0 items-start">
                  <div 
                    className={`rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 mr-4 ${
                      isCompleted 
                        ? 'bg-heycarro-blue text-white' 
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {step.icon}
                  </div>
                  <div className="flex-1 pt-1">
                    <div className={`font-medium ${isCurrent ? 'text-heycarro-blue' : ''}`}>
                      {step.label}
                    </div>
                    {isCurrent && (
                      <p className="text-sm text-gray-500 mt-1">
                        {step.status === 'Confirmado' && 'Tu pedido ha sido recibido y está siendo procesado'}
                        {step.status === 'En preparación' && 'Estamos preparando tus productos'}
                        {step.status === 'En camino' && 'Tu pedido está en camino a tu dirección'}
                        {step.status === 'Entregado' && '¡Tu pedido ha sido entregado!'}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Delivery Details */}
      <div className="p-4 bg-white mb-4">
        <h2 className="text-lg font-medium mb-3">Detalles de entrega</h2>
        <div className="text-sm">
          <div className="mb-2">
            <span className="text-gray-500 block">Dirección:</span>
            <span>{order.address}</span>
          </div>
          <div className="mb-2">
            <span className="text-gray-500 block">Método de pago:</span>
            <span>
              {order.paymentMethod === 'tarjeta' ? 'Tarjeta' : 'Contra entrega'}
            </span>
          </div>
          <div>
            <span className="text-gray-500 block">Fecha del pedido:</span>
            <span>{new Date(order.date).toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="p-4 bg-white">
        <h2 className="text-lg font-medium mb-3">Resumen del pedido</h2>
        <div className="space-y-3">
          {order.items.map(item => (
            <div key={item.product.id} className="flex items-center">
              <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden mr-3 flex-shrink-0">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium">{item.product.name}</div>
                <div className="text-sm text-gray-500">Cantidad: {item.quantity}</div>
              </div>
              <div className="text-sm font-medium">
                {(item.product.price * item.quantity).toFixed(2)}€
              </div>
            </div>
          ))}
          
          <div className="pt-3 border-t border-gray-100">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-500">Subtotal</span>
              <span>{order.total.toFixed(2)}€</span>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-500">Envío</span>
              <span>Gratis</span>
            </div>
            <div className="flex justify-between font-bold mt-2">
              <span>Total</span>
              <span>{order.total.toFixed(2)}€</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="p-4">
        <Button 
          className="w-full"
          variant="outline"
          onClick={() => navigate('/home')}
        >
          Seguir comprando
        </Button>
      </div>
    </div>
  );
};

export default OrderStatus;
