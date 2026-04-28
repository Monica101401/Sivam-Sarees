import React, { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  category: 'sarees' | 'salwaar' | 'lehenga';
  type: 'readymade' | 'custom';
  material: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);

  const categories = ['all', 'sarees', 'salwaar', 'lehenga'];
  const types = ['all', 'readymade', 'custom'];
  const materials = ['all', 'silk', 'cotton', 'georgette', 'chiffon', 'rayon'];

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products whenever filters change
  useEffect(() => {
    filterProducts();
  }, [products, selectedCategory, selectedType, selectedMaterial, priceRange]);

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

  const filterProducts = () => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Filter by type
    if (selectedType !== 'all') {
      filtered = filtered.filter(p => p.type === selectedType);
    }

    // Filter by material
    if (selectedMaterial !== 'all') {
      filtered = filtered.filter(p => p.material.toLowerCase() === selectedMaterial);
    }

    // Filter by price
    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    setFilteredProducts(filtered);
  };

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedType('all');
    setSelectedMaterial('all');
    setPriceRange([0, 10000]);
  };

  const getFallbackProducts = (): Product[] => [
    {
      id: 1,
      name: 'Karishma Salwaar',
      description: 'Stay stylish, comfortable, and beautiful.',
      image: 'https://images.pexels.com/photos/25185000/pexels-photo-25185000/free-photo-of-model-in-embroidered-gray-dress-and-scarf.jpeg?auto=compress&cs=tinysrgb&w=1200',
      price: 2499,
      category: 'salwaar',
      type: 'readymade',
      material: 'Cotton',
    },
    {
      id: 2,
      name: 'Elegant Embroidered Set',
      description: 'Traditional design with modern comfort for everyday wear.',
      image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=1200',
      price: 2999,
      category: 'salwaar',
      type: 'readymade',
      material: 'Silk',
    },
    {
      id: 3,
      name: 'Festive Silk Saree',
      description: 'Premium silk fabric perfect for special occasions.',
      image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=1200',
      price: 3499,
      category: 'sarees',
      type: 'readymade',
      material: 'Silk',
    },
    {
      id: 4,
      name: 'Casual Cotton Suit',
      description: 'Breathable cotton blend for daily comfort.',
      image: 'https://images.pexels.com/photos/2955376/pexels-photo-2955376.jpeg?auto=compress&cs=tinysrgb&w=1200',
      price: 1999,
      category: 'salwaar',
      type: 'readymade',
      material: 'Cotton',
    },
    {
      id: 5,
      name: 'Designer Chikankari Saree',
      description: 'Handcrafted with traditional Chikankari embroidery.',
      image: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=1200',
      price: 4299,
      category: 'sarees',
      type: 'custom',
      material: 'Georgette',
    },
    {
      id: 6,
      name: 'Printed Rayon Suit',
      description: 'Vibrant prints with soft rayon fabric for a modern look.',
      image: 'https://images.pexels.com/photos/1044993/pexels-photo-1044993.jpeg?auto=compress&cs=tinysrgb&w=1200',
      price: 2199,
      category: 'salwaar',
      type: 'readymade',
      material: 'Rayon',
    },
    {
      id: 7,
      name: 'Custom Lehenga',
      description: 'Customizable lehenga with your choice of fabric and design.',
      image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=1200',
      price: 5999,
      category: 'lehenga',
      type: 'custom',
      material: 'Silk',
    },
    {
      id: 8,
      name: 'Chiffon Saree',
      description: 'Light and elegant chiffon saree for all occasions.',
      image: 'https://images.pexels.com/photos/1044993/pexels-photo-1044993.jpeg?auto=compress&cs=tinysrgb&w=1200',
      price: 1899,
      category: 'sarees',
      type: 'readymade',
      material: 'Chiffon',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-center mb-2 text-blue-900">
            Sivam Sarees & Salwaar
          </h1>
          <p className="text-center text-gray-600">
            Discover our collection of elegant sarees, salwaar, and lehengas
          </p>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-yellow-800 font-semibold mb-2">⚠️ Connection Issue</p>
            <p className="text-yellow-700 text-sm mb-3">{error}</p>
            <button
              onClick={fetchProducts}
              className="text-yellow-800 hover:text-yellow-900 font-semibold underline text-sm"
            >
              Try Again
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Filters</h2>
                <button
                  onClick={resetFilters}
                  className="text-sm text-blue-600 hover:text-blue-700 underline"
                >
                  Reset
                </button>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Category</h3>
                <div className="space-y-2">
                  {categories.map(cat => (
                    <label key={cat} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value={cat}
                        checked={selectedCategory === cat}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="mr-2"
                      />
                      <span className="capitalize">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Type Filter */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Type</h3>
                <div className="space-y-2">
                  {types.map(type => (
                    <label key={type} className="flex items-center">
                      <input
                        type="radio"
                        name="type"
                        value={type}
                        checked={selectedType === type}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="mr-2"
                      />
                      <span className="capitalize">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Material Filter */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Material</h3>
                <div className="space-y-2">
                  {materials.map(material => (
                    <label key={material} className="flex items-center">
                      <input
                        type="radio"
                        name="material"
                        value={material}
                        checked={selectedMaterial === material}
                        onChange={(e) => setSelectedMaterial(e.target.value)}
                        className="mr-2"
                      />
                      <span className="capitalize">{material}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div>
                <h3 className="font-semibold mb-3">Price Range</h3>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <p className="text-sm text-gray-600">
                    ₹{priceRange[0]} - ₹{priceRange[1]}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className="lg:col-span-3">
            {/* Loading State */}
            {loading && (
              <div className="flex justify-center items-center min-h-96">
                <div className="text-center">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                  <p className="mt-4 text-gray-600">Loading products...</p>
                </div>
              </div>
            )}

            {/* Results Count */}
            {!loading && (
              <p className="text-gray-600 mb-4">
                Showing {filteredProducts.length} of {products.length} products
              </p>
            )}

            {/* Products Grid */}
            {!loading && filteredProducts.length > 0 && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
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

            {/* No Products Found */}
            {!loading && filteredProducts.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg">
                <p className="text-gray-600 text-lg">No products found matching your filters</p>
                <button
                  onClick={resetFilters}
                  className="mt-4 text-blue-600 hover:text-blue-700 underline"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}