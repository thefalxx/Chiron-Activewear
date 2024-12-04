import React from 'react'
import Image from 'next/image';



const ShoppingCatalog = () => {

    const products = [
        { id: 1, name: 'T-Shirt - Black', price: '₱1000', image: '/images/tshirt-black.jpg' },
        { id: 2, name: 'T-Shirt - Black', price: '₱1000', image: '/images/tshirt-black.jpg' },
        { id: 3, name: 'T-Shirt - Black', price: '₱1000', image: '/images/tshirt-black.jpg' },
        { id: 4, name: 'T-Shirt - Navy', price: '₱1000', image: '/images/tshirt-navy.jpg' },
        { id: 5, name: 'T-Shirt - Navy', price: '₱1000', image: '/images/tshirt-navy.jpg' },
        { id: 6, name: 'T-Shirt - Navy', price: '₱1000', image: '/images/tshirt-navy.jpg' },
        { id: 7, name: 'T-Shirt - Grey', price: '₱1000', image: '/images/tshirt-grey.jpg' },
        { id: 8, name: 'T-Shirt - Grey', price: '₱1000', image: '/images/tshirt-grey.jpg' },
        { id: 9, name: 'T-Shirt - Grey', price: '₱1000', image: '/images/tshirt-grey.jpg' },
      ];

  return (
    <div className="max-w-screen-lg mx-auto p-6">
      {/* Header Banner */}
      <div className="w-full h-40 bg-cover bg-center mb-8" style={{ backgroundImage: "url('/images/banner.jpg')" }}>
        <div className="bg-black bg-opacity-50 text-white p-4 text-center">
          <h2 className="text-3xl font-semibold">University Collection 2.0</h2>
          <p>Built for Power</p>
        </div>
      </div>

      {/* Category and Filters */}
      <div className="flex justify-between mb-6">
        <div className="space-x-4">
          <button className="text-lg font-semibold">Men&apos;s Category </button>
          <button className="text-lg font-semibold">Women&apos;s Category</button>
          <button className="text-lg font-semibold">Collection</button>
        </div>
        <div className="flex space-x-4">
          <button className="text-sm">Filter</button>
          <button className="text-sm">Sort By</button>
        </div>
      </div>

      {/* Product List */}
      <div className="grid grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="text-center">
            <Image src={product.image} alt={product.name} width={200} height={300} className="mx-auto" />
            <h3 className="mt-4 text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-500">{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShoppingCatalog
