
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CreditCard, Banknote, ChevronLeft } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/components/ui/use-toast';
import { paymentMethods } from '@/data/sampleData';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart, addOrder, userData } = useCart();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: userData?.name || '',
    phone: userData?.phone || '',
    address: userData?.addresses?.[0] || '',
    notes: '',
    paymentMethod: 'card' as 'card' | 'cash',
  });
  
  const [isProcessing, setIsProcessing] = useState(false);

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación simple
    if (!formData.name || !formData.phone || !formData.address) {
      toast({
        variant: "destructive",
        title: "Error en el formulario",
        description: "Por favor completa todos los campos obligatorios",
      });
      return;
    }

    setIsProcessing(true);

    // Simulamos procesamiento del pedido
    setTimeout(() => {
      // Crear nuevo pedido
      const newOrder = {
        id: `ORD-${Date.now()}`,
        items: [...cart],
        total: cartTotal,
        date: new Date(),
        address: formData.address,
        status: 'Confirmado' as const,
        paymentMethod: formData.paymentMethod === 'card' ? 'tarjeta' : 'contra-entrega'
      };
      
      // Añadir al historial de pedidos
      addOrder(newOrder);
      
      // Limpiar carrito
      clearCart();
      
      // Mostrar confirmación
      toast({
        title: "¡Pedido realizado con éxito!",
        description: "Tu pedido ha sido confirmado",
      });
      
      // Redirigir a la página de confirmación
      navigate(`/order-status/${newOrder.id}`);
      
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <div className="pb-16 animate-fade-in">
      {/* Header */}
      <div className="bg-white p-4 flex items-center border-b">
        <button onClick={() => navigate(-1)} className="mr-3">
          <ChevronLeft size={24} className="text-gray-500" />
        </button>
        <h1 className="text-lg font-medium font-poppins">Finalizar compra</h1>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-6">
        {/* Datos de contacto */}
        <div>
          <h2 className="text-lg font-medium mb-3">Datos de contacto</h2>
          <div className="space-y-3">
            <div>
              <Label htmlFor="name">Nombre completo*</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Teléfono*</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>

        {/* Dirección de entrega */}
        <div>
          <h2 className="text-lg font-medium mb-3">Dirección de entrega</h2>
          <div className="space-y-3">
            <div>
              <Label htmlFor="address">Dirección completa*</Label>
              <Textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                className="resize-none"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="notes">Notas adicionales</Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Instrucciones para la entrega, piso, etc."
                className="resize-none"
                rows={2}
              />
            </div>
          </div>
        </div>

        {/* Método de pago */}
        <div>
          <h2 className="text-lg font-medium mb-3">Método de pago</h2>
          <RadioGroup 
            defaultValue={formData.paymentMethod}
            onValueChange={(value) => setFormData(prev => ({ ...prev, paymentMethod: value as 'card' | 'cash' }))}
          >
            <div className="flex flex-col space-y-3">
              <div className="flex items-center space-x-3 border rounded-md p-3">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="flex items-center cursor-pointer">
                  <CreditCard size={20} className="mr-2 text-heycarro-blue" />
                  <span>Tarjeta de crédito/débito</span>
                </Label>
              </div>
              <div className="flex items-center space-x-3 border rounded-md p-3">
                <RadioGroupItem value="cash" id="cash" />
                <Label htmlFor="cash" className="flex items-center cursor-pointer">
                  <Banknote size={20} className="mr-2 text-heycarro-orange" />
                  <span>Pago contra entrega</span>
                </Label>
              </div>
            </div>
          </RadioGroup>
        </div>

        {/* Resumen del pedido */}
        <div>
          <h2 className="text-lg font-medium mb-3">Resumen del pedido</h2>
          <div className="bg-gray-50 rounded-md p-3">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Productos ({cart.length})</span>
                <span>{cartTotal.toFixed(2)}€</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Envío</span>
                <span>Gratis</span>
              </div>
              <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between font-bold">
                <span>Total</span>
                <span className="text-heycarro-blue">{cartTotal.toFixed(2)}€</span>
              </div>
            </div>
          </div>
        </div>

        {/* Botón de finalizar compra */}
        <Button
          type="submit"
          className="w-full bg-heycarro-blue hover:bg-heycarro-orange text-white"
          size="lg"
          disabled={isProcessing}
        >
          {isProcessing ? "Procesando..." : "Finalizar compra"}
        </Button>
      </form>
    </div>
  );
};

export default Checkout;
