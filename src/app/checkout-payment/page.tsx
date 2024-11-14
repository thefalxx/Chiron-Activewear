// components/Payment.tsx
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import RightSectionOrderSummary from "../components/RightSectionOrderSummary";

const Payment: React.FC = () => {
  const router = useRouter();
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const subtotal = 3500.0;
  const shippingFee = 550; // Assuming this is the shipping fee

  const handlePaymentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPayment(event.target.value);
  };

  const handleReturntoShipping = () => {
    router.push("/checkout-shipping");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg flex overflow-hidden">
        
        {/* Left Section - Payment Form */}
        <div className="w-2/3 p-10">
          <h1 className="text-2xl font-bold mb-4">CHECKOUT</h1>
          <nav className="text-gray-600 text-sm mb-6">
            <span>Cart</span> &gt; <span>Information</span> &gt; <span>Shipping</span> &gt;{" "}
            <span className="text-blue-600 font-semibold">Payment</span>
          </nav>

          {/* Contact Information */}
          <div className="border border-gray-300 p-4 rounded-lg mb-6">
            <h2 className="text-lg font-semibold">Contact</h2>
            <p className="text-lg">John Doe</p>
            <p className="text-lg">Block 1 Lot 10 Fire St, Damosa, Davao City 8000</p>
          </div>

          {/* Payment Method */}
          <h2 className="text-lg font-semibold mb-4">Payment</h2>
          <select
            onChange={handlePaymentChange}
            className="border border-gray-300 rounded-lg p-2 mb-6 w-full"
            defaultValue=""
          >
            <option value="" disabled>
              Select Payment Method
            </option>
            <option value="card">Card - Credit / Debit</option>
            <option value="gcash">GCash</option>
          </select>

          {/* Render payment fields based on selection */}
          {selectedPayment === "card" && (
            <div className="border border-gray-300 p-4 rounded-lg mb-4">
              <h3 className="text-lg font-semibold mb-4">Card Details</h3>
              <input
                type="text"
                placeholder="Card Number"
                className="border border-gray-300 rounded-lg p-2 mb-2 w-full"
              />
              <div className="flex space-x-4">
                <input
                  type="text"
                  placeholder="Month"
                  className="border border-gray-300 rounded-lg p-2 mb-2 w-1/2"
                />
                <input
                  type="text"
                  placeholder="Year"
                  className="border border-gray-300 rounded-lg p-2 mb-2 w-1/2"
                />
              </div>
              <input
                type="text"
                placeholder="CVV"
                className="border border-gray-300 rounded-lg p-2 mb-2 w-full"
              />
            </div>
          )}

          {selectedPayment === "gcash" && (
            <div className="border border-gray-300 p-4 rounded-lg mb-4">
              <h3 className="text-lg font-semibold">GCash</h3>
              <p className="text-sm text-gray-500 mt-2">
                After clicking Complete Order you will be redirected to GCash to pay for your purchase securely.
              </p>
            </div>
          )}

          <div className="flex justify-between mt-6">
            {/* Return to Shipping Button */}
            <button
              onClick={handleReturntoShipping}
              className="text-blue-600 hover:underline text-sm"
            >
              &lt; Return to Shipping
            </button>

            {/* Complete Order Button */}
            <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
              Complete Order
            </button>
          </div>
        </div>

        {/* Right Section - Order Summary */}
        <RightSectionOrderSummary subtotal={subtotal} shippingFee={shippingFee} />
      </div>
    </div>
  );
};

export default Payment;
