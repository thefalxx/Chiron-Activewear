"use client";
import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import RightSectionOrderSummary from "../components/RightSectionOrderSummary";

const Shipping: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [shippingFee, setShippingFee] = useState(0); // Default shipping fee
  const subtotal = 3500.0; // Define subtotal value

  const handleReturnToCart = () => {
    router.push("/checkout");
  };

  // Handler to update the selected shipping fee based on payment choice
  const handleShippingChange = (fee: number) => {
    setShippingFee(fee);
  };

  const handleProceedToPayment = () => {
    router.push("/checkout-payment");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg flex overflow-hidden">
        {/* Left Section - Checkout Form */}
        <div className="w-2/3 p-10">
          <h1 className="text-2xl font-bold mb-4">CHECKOUT</h1>
          <nav className="text-gray-600 text-sm mb-6">
            <span>Cart</span> &gt;
            <span className={pathname === "/checkout" ? "text-blue-600 font-semibold" : ""}>Information</span> &gt;{" "}
            <span>Shipping</span> &gt; <span>Payment</span>
          </nav>

          {/* Contact Information */}
          <div className="border border-gray-300 p-4 rounded-lg mb-6">
            <h2 className="text-lg font-semibold">Contact</h2>
            <div className="flex flex-col space-y-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <p className="text-lg">John Doe</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <p className="text-lg">Block 1 Lot 10 Fire St, Damosa, Davao City 8000</p>
              </div>
            </div>
          </div>

          {/* Shipping Options */}
          <h2 className="text-lg font-semibold mb-4">Shipping</h2>
          <div className="border border-gray-300 p-4 rounded-lg mb-4">
            <div className="flex justify-between items-center mb-2">
              <span>Standard Shipping</span>
              <span>₱550.00</span>
            </div>
            <p className="text-sm text-gray-500">5 - 6 business days</p>
          </div>

          <div className="border border-gray-300 p-4 rounded-lg mb-8">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="payment"
                  className="mr-2"
                  checked={shippingFee === 550}
                  onChange={() => handleShippingChange(550)}
                />
                <span>Pay Now</span>
              </div>
              <span>₱550.00</span>
            </div>
            <p className="text-sm text-gray-500 mb-4">No additional fees</p>

            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="payment"
                  className="mr-2"
                  checked={shippingFee === 0}
                  onChange={() => handleShippingChange(0)}
                />
                <span>Pay on Delivery</span>
              </div>
              <span>₱0.00</span>
            </div>
            <p className="text-sm text-gray-500">Amount may vary within delivery courier fees.</p>
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center mt-6">
            <button onClick={handleReturnToCart} className="text-blue-600 hover:underline">
              &lt; Return to Information
            </button>
            <button onClick={handleProceedToPayment} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Proceed</button>
          </div>
        </div>

        {/* Right Section - Order Summary */}
        <RightSectionOrderSummary subtotal={subtotal} shippingFee={shippingFee} />
      </div>
    </div>
  );
};

export default Shipping;
