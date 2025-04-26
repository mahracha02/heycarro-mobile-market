
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { User, Phone, MapPin, Clock, LogOut, ChevronRight, Package } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/components/ui/use-toast';
import Logo from '@/components/Logo';

const Profile = () => {
  const navigate = useNavigate();
  const { userData, setUserData } = useCart();
  const { toast } = useToast();
  
  const handleLogout = () => {
    // Simulamos el cierre de sesión
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión correctamente",
    });
    
    // Redirigir a welcome
    navigate('/');
  };
  
  if (!userData) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4">
        <p className="text-gray-500">Usuario no encontrado</p>
        <button 
          className="text-heycarro-blue mt-2"
          onClick={() => navigate('/')}
        >
          Volver al inicio
        </button>
      </div>
    );
  }
  
  return (
    <div className="pb-16 animate-fade-in">
      {/* Header */}
      <div className="bg-heycarro-blue text-white p-6">
        <Logo size="small" colorful={false} />
        <div className="mt-4 flex items-center">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mr-4">
            <User size={32} />
          </div>
          <div>
            <h1 className="text-xl font-medium">{userData.name}</h1>
            <p className="text-white/80 text-sm">{userData.phone}</p>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 bg-white mb-4">
        <h2 className="text-lg font-medium mb-3">Información personal</h2>
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
              <User size={20} className="text-heycarro-blue" />
            </div>
            <div className="flex-1">
              <div className="text-sm text-gray-500">Nombre</div>
              <div>{userData.name}</div>
            </div>
            <button className="text-heycarro-blue">
              <ChevronRight size={20} />
            </button>
          </div>
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
              <Phone size={20} className="text-heycarro-blue" />
            </div>
            <div className="flex-1">
              <div className="text-sm text-gray-500">Teléfono</div>
              <div>{userData.phone}</div>
            </div>
            <button className="text-heycarro-blue">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Addresses */}
      <div className="p-4 bg-white mb-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-medium">Mis direcciones</h2>
          <button className="text-sm text-heycarro-blue">Añadir</button>
        </div>
        {userData.addresses.map((address, index) => (
          <div key={index} className="flex items-start mb-3 last:mb-0">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3 mt-1">
              <MapPin size={20} className="text-heycarro-blue" />
            </div>
            <div className="flex-1">
              <div className="font-medium">
                {index === 0 ? 'Principal' : `Dirección ${index + 1}`}
              </div>
              <div className="text-sm text-gray-500">{address}</div>
            </div>
            <button className="text-heycarro-blue">
              <ChevronRight size={20} />
            </button>
          </div>
        ))}
      </div>

      {/* Order History */}
      <div className="p-4 bg-white mb-4">
        <h2 className="text-lg font-medium mb-3">Mis pedidos</h2>
        
        {userData.orders.length > 0 ? (
          <div className="space-y-3">
            {userData.orders.map((order) => (
              <div 
                key={order.id} 
                className="flex items-start border border-gray-100 rounded-md p-3 cursor-pointer"
                onClick={() => navigate(`/order-status/${order.id}`)}
              >
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                  <Package size={20} className="text-heycarro-blue" />
                </div>
                <div className="flex-1">
                  <div className="font-medium flex items-center justify-between">
                    <span>{order.id}</span>
                    <span className="text-sm">{order.total.toFixed(2)}€</span>
                  </div>
                  <div className="text-sm text-gray-500 flex items-center justify-between">
                    <span className="flex items-center">
                      <Clock size={14} className="mr-1" />
                      {new Date(order.date).toLocaleDateString()}
                    </span>
                    <span className={`px-2 py-0.5 text-xs rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Package size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No tienes pedidos recientes</p>
            <button 
              className="text-heycarro-blue mt-2"
              onClick={() => navigate('/home')}
            >
              Explorar productos
            </button>
          </div>
        )}
      </div>

      {/* Logout Button */}
      <div className="p-4">
        <Button 
          className="w-full flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-800"
          onClick={handleLogout}
        >
          <LogOut size={18} />
          <span>Cerrar sesión</span>
        </Button>
      </div>
    </div>
  );
};

// Helper function to get status color
const getStatusColor = (status: string) => {
  switch (status) {
    case 'Confirmado':
      return 'bg-blue-100 text-blue-800';
    case 'En preparación':
      return 'bg-yellow-100 text-yellow-800';
    case 'En camino':
      return 'bg-purple-100 text-purple-800';
    case 'Entregado':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default Profile;
