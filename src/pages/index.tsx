import React, { useState, useEffect } from "react";

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
}

const PRODUCTS_API_URL = "https://api.example.com/products"; 

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
      
      const response = await fetch(PRODUCTS_API_URL);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch products");
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto mt-10 p-4">
        <h1 className="text-3xl font-bold text-center mb-2 text-blue-900">
          Salwaar
        </h1>
        <div className="flex justify-center items-center min-h-96">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto mt-10 p-4">
        <h1 className="text-3xl font-bold text-center mb-2 text-blue-900">
          Salwaar
        </h1>
        <div className="flex justify-center items-center min-h-96">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-600 font-semibold mb-4">Error loading products</p>
            <p className="text-red-500 text-sm mb-4">{error}</p>
            <button
              onClick={fetchProducts}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="max-w-6xl mx-auto mt-10 p-4">
        <h1 className="text-3xl font-bold text-center mb-2 text-blue-900">
          Salwaar
        </h1>
        <div className="flex justify-center items-center min-h-96">
          <p className="text-gray-600 text-lg">No products available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold text-center mb-2 text-blue-900">
        Salwaar
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Discover our collection of elegant and comfortable salwaar suits
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <img
              className="w-full h-48 object-cover"
              src={product.image}
              alt={product.name}
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-700 mb-3 text-sm">{product.description}</p>
              <p className="text-lg font-bold text-blue-600 mb-4">
                ₹{product.price}
              </p>
              <div className="flex gap-2">
                <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors font-medium">
                  Buy Now
                </button>
                <button className="flex-1 border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50 transition-colors font-medium">
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}