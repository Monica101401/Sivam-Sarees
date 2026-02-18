'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/cartContext';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

export default function ProductCard({
  id,
  name,
  price,
  description,
  image,
}: ProductCardProps) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart({
      id,
      name,
      price,
      image,
      description,
    });

    // Show feedback
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img className="w-full h-48 object-cover" src={image} alt={name} />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{name}</h2>
        <p className="text-gray-700 mb-3 text-sm">{description}</p>
        <p className="text-lg font-bold text-blue-600 mb-4">₹{price}</p>
        <div className="flex gap-2">
          <button
            onClick={handleAddToCart}
            className={`flex-1 py-2 rounded font-medium transition-colors ${
              isAdded
                ? 'bg-green-600 text-white'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isAdded ? '✓ Added!' : 'Add to cart'}
          </button>
          <button className="flex-1 border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50 transition-colors font-medium">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}