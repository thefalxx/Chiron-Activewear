import React from 'react';
import Image from 'next/image';

interface RightSectionOrderSummaryProps {
  subtotal: number;
  shippingFee: number;
}

const RightSectionOrderSummary: React.FC<RightSectionOrderSummaryProps> = ({ subtotal = 0, shippingFee = 0 }) => {
  return (
    <div className="w-1/3 bg-gray-100 p-8 flex flex-col items-center">
      {/* Order Summary Item */}
      <div className="flex items-center mb-6 w-full max-w-xs">
        <Image
          src="/assets/item-1.png"
          width={80}
          height={80}
          alt="Product"
          className="w-20 h-20 object-cover rounded mr-4"
        />
        <div>
          <h2 className="font-semibold text-lg">Premium Shirt - Drifit</h2>
          <p className="text-gray-600 text-sm">Navy</p>
          <p className="font-semibold mt-1">₱3,500.00</p>
        </div>
      </div>

      {/* Discount Code Section */}
      <div className="w-full max-w-xs mb-6">
        <input
          type="text"
          placeholder="Discount / Gift Code"
          className="w-full p-2 border border-gray-300 rounded mb-2"
        />
        <button className="w-full bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400">
          Apply
        </button>
      </div>

      {/* Summary Section */}
      <div className="border-t border-gray-300 pt-4 w-full max-w-xs">
        <div className="flex justify-between mb-2">
          <span>Subtotal</span>
          <span>₱{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Shipping Fee</span>
          <span>₱{shippingFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold text-lg">
          <span>TOTAL</span>
          <span>₱{(subtotal + shippingFee).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default RightSectionOrderSummary;
