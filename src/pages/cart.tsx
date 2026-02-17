'use client';

import React from 'react';
import { useCart } from '@/context/cartContext';
import Link from 'next/link';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-6xl mx-auto mt-10 p-4">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        <div className="bg-gray-50 rounded-lg p-12 text-center">
          <p className="text-gray-600 text-lg mb-6">Your cart is empty</p>
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100 border-b">
                    <th className="px-4 py-3 text-left font-semibold">Product</th>
                    <th className="px-4 py-3 text-center font-semibold">Price</th>
                    <th className="px-4 py-3 text-center font-semibold">Quantity</th>
                    <th className="px-4 py-3 text-right font-semibold">Subtotal</th>
                    <th className="px-4 py-3 text-center font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      {/* Product Info */}
                      <td className="px-4 py-4">
                        <div className="flex gap-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div>
                            <p className="font-semibold text-sm">{item.name}</p>
                            <p className="text-gray-600 text-xs mt-1">
                              {item.description.substring(0, 50)}...
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="px-4 py-4 text-center">
                        <p className="font-semibold">₹{item.price}</p>
                      </td>

                      {/* Quantity */}
                      <td className="px-4 py-4">
                        <div className="flex justify-center items-center gap-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded transition-colors"
                          >
                            −
                          </button>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) =>
                              updateQuantity(item.id, parseInt(e.target.value))
                            }
                            className="w-12 text-center border rounded py-1"
                            min="1"
                          />
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </td>

                      {/* Subtotal */}
                      <td className="px-4 py-4 text-right">
                        <p className="font-bold">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </p>
                      </td>

                      {/* Remove Button */}
                      <td className="px-4 py-4 text-center">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-600 hover:text-red-800 hover:bg-red-50 px-3 py-2 rounded transition-colors font-medium"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Clear Cart Button */}
            <div className="bg-gray-50 px-4 py-3 border-t text-right">
              <button
                onClick={clearCart}
                className="text-red-600 hover:text-red-800 font-medium"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <p className="text-gray-600">Subtotal</p>
                <p className="font-semibold">₹{totalPrice.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-600">Shipping</p>
                <p className="font-semibold text-green-600">Free</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-600">Tax (18%)</p>
                <p className="font-semibold">₹{(totalPrice * 0.18).toFixed(2)}</p>
              </div>
            </div>

            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between">
                <p className="text-lg font-bold">Total</p>
                <p className="text-lg font-bold text-blue-600">
                  ₹{(totalPrice * 1.18).toFixed(2)}
                </p>
              </div>
            </div>

            <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-bold mb-3">
              Proceed to Checkout
            </button>

            <Link
              href="/"
              className="block w-full bg-gray-100 text-center text-gray-800 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}