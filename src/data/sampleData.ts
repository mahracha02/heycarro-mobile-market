
export const categories = [
  {
    id: 'alimentacion',
    name: 'Alimentación',
    icon: 'Apple',
    description: 'Productos frescos y de despensa',
    image: '/placeholder.svg'
  },
  {
    id: 'bebidas',
    name: 'Bebidas',
    icon: 'Wine',
    description: 'Refrescos, aguas, vinos y más',
    image: '/placeholder.svg'
  },
  {
    id: 'espana',
    name: 'Productos de España',
    icon: 'Flag',
    description: 'Productos importados de España',
    image: '/placeholder.svg'
  },
  {
    id: 'hogar',
    name: 'Hogar',
    icon: 'Home',
    description: 'Todo para tu hogar',
    image: '/placeholder.svg'
  },
  {
    id: 'higiene',
    name: 'Higiene y Belleza',
    icon: 'Sparkles',
    description: 'Cuidado personal',
    image: '/placeholder.svg'
  },
  {
    id: 'limpieza',
    name: 'Limpieza',
    icon: 'Brush',
    description: 'Productos de limpieza para el hogar',
    image: '/placeholder.svg'
  }
];

export const products = [
  {
    id: '1',
    name: 'Aceite de Oliva Virgen Extra',
    price: 7.99,
    image: '/placeholder.svg',
    description: 'Aceite de oliva virgen extra de primera prensada en frío. Origen España.',
    category: 'alimentacion',
    stock: 50,
    discount: 15,
    rating: 4.8
  },
  {
    id: '2',
    name: 'Leche Entera',
    price: 0.99,
    image: '/placeholder.svg',
    description: 'Leche entera UHT de vaca. 1 litro.',
    category: 'alimentacion',
    stock: 100,
    rating: 4.5
  },
  {
    id: '3',
    name: 'Pan de Molde Integral',
    price: 1.79,
    image: '/placeholder.svg',
    description: 'Pan de molde integral, alto en fibra. 750g.',
    category: 'alimentacion',
    stock: 30,
    isNew: true,
    rating: 4.2
  },
  {
    id: '4',
    name: 'Vino Tinto Rioja',
    price: 9.95,
    image: '/placeholder.svg',
    description: 'Vino tinto Rioja Reserva, cosecha 2018. 75cl.',
    category: 'bebidas',
    stock: 24,
    discount: 10,
    rating: 4.7
  },
  {
    id: '5',
    name: 'Refresco Cola',
    price: 1.25,
    image: '/placeholder.svg',
    description: 'Refresco de cola. 2 litros.',
    category: 'bebidas',
    stock: 120,
    rating: 4.4
  },
  {
    id: '6',
    name: 'Jamón Serrano',
    price: 12.95,
    image: '/placeholder.svg',
    description: 'Jamón Serrano loncheado. 150g. Producto de España.',
    category: 'espana',
    stock: 15,
    isNew: true,
    rating: 4.9
  },
  {
    id: '7',
    name: 'Queso Manchego',
    price: 8.45,
    image: '/placeholder.svg',
    description: 'Queso manchego semicurado. 250g. Producto de España.',
    category: 'espana',
    stock: 20,
    rating: 4.7
  },
  {
    id: '8',
    name: 'Detergente Lavadora',
    price: 5.99,
    image: '/placeholder.svg',
    description: 'Detergente líquido para lavadora. 40 lavados.',
    category: 'limpieza',
    stock: 35,
    discount: 20,
    rating: 4.3
  },
  {
    id: '9',
    name: 'Set de Toallas',
    price: 14.95,
    image: '/placeholder.svg',
    description: 'Set de 3 toallas de algodón 100%. Colores variados.',
    category: 'hogar',
    stock: 12,
    rating: 4.6
  },
  {
    id: '10',
    name: 'Champú Suave',
    price: 2.75,
    image: '/placeholder.svg',
    description: 'Champú para todo tipo de cabello. 500ml.',
    category: 'higiene',
    stock: 40,
    discount: 5,
    rating: 4.4
  },
  {
    id: '11',
    name: 'Pasta de Dientes',
    price: 1.49,
    image: '/placeholder.svg',
    description: 'Pasta dentífrica con flúor. 100ml.',
    category: 'higiene',
    stock: 60,
    rating: 4.2
  },
  {
    id: '12',
    name: 'Fideos',
    price: 0.95,
    image: '/placeholder.svg',
    description: 'Fideos de trigo duro. 500g.',
    category: 'alimentacion',
    stock: 80,
    rating: 4.1
  }
];

export const banners = [
  {
    id: '1',
    title: '¡Ofertas de la Semana!',
    subtitle: 'Ahorra hasta un 30%',
    image: 'photo-1721322800607-8c38375eef04',
    link: '/ofertas'
  },
  {
    id: '2',
    title: 'Productos de España',
    subtitle: 'Descubre nuestra selección',
    image: 'photo-1582562124811-c09040d0a901',
    link: '/categoria/espana'
  },
  {
    id: '3',
    title: 'Entrega en 1 hora',
    subtitle: 'Servicio premium',
    image: 'photo-1500673922987-e212871fec22',
    link: '/entrega-rapida'
  }
];

export const paymentMethods = [
  {
    id: 'card',
    name: 'Tarjeta de crédito/débito',
    icon: 'CreditCard'
  },
  {
    id: 'cash',
    name: 'Pago contra entrega',
    icon: 'Banknote'
  }
];
