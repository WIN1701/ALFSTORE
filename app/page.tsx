'use client';

import { useState } from 'react';
import { ShoppingBag, X, Plus, Minus, Trash2 } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

const PRODUCTS: Product[] = [
  { id: 1, name: 'Hoodie Oversized Chaos', price: 45.00, category: 'Sudaderas', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80' },
  { id: 2, name: 'Camiseta Identity Black', price: 20.00, category: 'Camisetas', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80' },
  { id: 3, name: 'Gorra Urban Snapback', price: 15.00, category: 'Accesorios', image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=600&q=80' },
  { id: 4, name: 'Pants Cargo Tactical', price: 40.00, category: 'Pantalones', image: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=600&q=80' },
];

export default function AlfStoreApp() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev =>
      prev.map(item => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean) as CartItem[]
    );
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-red-600 selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-neutral-800 px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black tracking-widest text-red-600">ALFSTORE</h1>
          <p className="text-xs text-neutral-400 tracking-wider">Del caos nace el carácter.</p>
        </div>
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative bg-neutral-900 border border-neutral-800 p-2.5 rounded-full hover:bg-neutral-800 transition"
        >
          <ShoppingBag className="w-5 h-5" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
              {totalItems}
            </span>
          )}
        </button>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-12 max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">NUEVA COLECCIÓN URBANA</h2>
        <p className="text-neutral-400 max-w-xl mx-auto">Prendas diseñadas para destacar en el pavimento. Expresa tu identidad sin filtros.</p>
      </section>

      {/* Catalog Grid */}
      <main className="px-6 pb-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {PRODUCTS.map(product => (
            <div key={product.id} className="bg-neutral-900/50 border border-neutral-800 rounded-xl overflow-hidden group">
              <div className="h-64 overflow-hidden bg-neutral-800">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="p-4">
                <span className="text-xs text-red-500 font-semibold uppercase tracking-wider">{product.category}</span>
                <h3 className="font-bold text-lg mt-1">{product.name}</h3>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xl font-black">${product.price.toFixed(2)}</span>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-white text-black px-4 py-2 rounded-lg font-bold text-sm hover:bg-red-600 hover:text-white transition"
                  >
                    Comprar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Cart Drawer Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-neutral-950 border-l border-neutral-800 h-full flex flex-col p-6 shadow-2xl">
            <div className="flex justify-between items-center pb-4 border-b border-neutral-800">
              <h3 className="text-xl font-bold">Tu Carrito ({totalItems})</h3>
              <button onClick={() => setIsCartOpen(false)} className="text-neutral-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {cart.length === 0 ? (
                <p className="text-center text-neutral-500 mt-20">Tu carrito está vacío.</p>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex items-center justify-between bg-neutral-900/50 p-3 rounded-lg border border-neutral-800">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                    <div className="flex-1 ml-4">
                      <h4 className="font-bold text-sm">{item.name}</h4>
                      <p className="text-red-500 text-sm font-semibold">${item.price.toFixed(2)}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button onClick={() => updateQuantity(item.id, -1)} className="bg-neutral-800 p-1 rounded hover:bg-neutral-700">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-bold">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="bg-neutral-800 p-1 rounded hover:bg-neutral-700">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <button onClick={() => updateQuantity(item.id, -item.quantity)} className="text-neutral-500 hover:text-red-500 p-2">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-neutral-800 pt-4 mt-auto">
                <div className="flex justify-between text-lg font-bold mb-4">
                  <span>Total:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <button
                  onClick={() => alert('¡Pedido registrado con éxito!')}
                  className="w-full bg-red-600 text-white py-3 rounded-xl font-bold hover:bg-red-700 transition"
                >
                  Finalizar Pedido
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}