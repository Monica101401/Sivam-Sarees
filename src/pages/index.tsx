'use client';

import React, { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('Fetching from:', `${API_URL}/api/products`);

      const response = await fetch(`${API_URL}/api/products`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setProducts(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch products';
      console.error('Error fetching products:', errorMessage);
      setError(errorMessage);
      
      // Use fallback products if API fails
      setProducts(getFallbackProducts());
    } finally {
      setLoading(false);
    }
  };

  const getFallbackProducts = (): Product[] => [
    {
      id: 1,
      name: 'Karishma Salwaar',
      description: 'Stay stylish, comfortable, and beautiful.',
      image: 'https://images.pexels.com/photos/25185000/pexels-photo-25185000/free-photo-of-model-in-embroidered-gray-dress-and-scarf.jpeg?auto=compress&cs=tinysrgb&w=1200',
      price: 2499,
    },
    {
      id: 2,
      name: 'Elegant Embroidered Set',
      description: 'Traditional design with modern comfort for everyday wear.',
      image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=1200',
      price: 2999,
    },
    {
      id: 3,
      name: 'Festive Silk Salwaar',
      description: 'Premium silk fabric perfect for special occasions.',
      image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=1200',
      price: 3499,
    },
    {
      id: 4,
      name: 'Casual Cotton Suit',
      description: 'Breathable cotton blend for daily comfort.',
      image: 'https://images.pexels.com/photos/2955376/pexels-photo-2955376.jpeg?auto=compress&cs=tinysrgb&w=1200',
      price: 1999,
    },
    {
      id: 5,
      name: 'Designer Chikankari',
      description: 'Handcrafted with traditional Chikankari embroidery.',
      image: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=1200',
      price: 4299,
    },
    {
      id: 6,
      name: 'Printed Rayon Suit',
      description: 'Vibrant prints with soft rayon fabric for a modern look.',
      image: 'https://images.pexels.com/photos/1044993/pexels-photo-1044993.jpeg?auto=compress&cs=tinysrgb&w=1200',
      price: 2199,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold text-center mb-2 text-blue-900">
        Salwaar
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Discover our collection of elegant and comfortable salwaar suits
      </p>

      {/* Error Banner */}
      {error && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-yellow-800 font-semibold mb-2">⚠️ Connection Issue</p>
          <p className="text-yellow-700 text-sm mb-3">{error}</p>
          <p className="text-yellow-700 text-xs mb-3">
            Make sure your backend server is running: <code className="bg-yellow-100 px-2 py-1 rounded">npm run dev</code> (in backend folder)
          </p>
          <button
            onClick={fetchProducts}
            className="text-yellow-800 hover:text-yellow-900 font-semibold underline text-sm"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center min-h-96">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        </div>
      )}

      {/* Products Grid */}
      {!loading && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              description={product.description}
              image={product.image}
            />
          ))}
        </div>
      )}

      {/* No Products */}
      {!loading && products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No products available</p>
        </div>
      )}
    </div>
  );
}