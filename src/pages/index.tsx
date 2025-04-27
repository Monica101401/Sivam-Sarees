import React from "react";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-900">
        Salwaar
      </h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden max-w-sm mx-auto">
          <img
            className="w-full h-48 object-cover"
            src="https://images.pexels.com/photos/25185000/pexels-photo-25185000/free-photo-of-model-in-embroidered-gray-dress-and-scarf.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Watch"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">Karishma Salwaar</h2>
            <p className="text-gray-700 mb-4">
              Stay stylish, comfortable, and beatiful.
            </p>
            <div className="flex justify-between">
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Buy Now
              </button>
              <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50">
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
