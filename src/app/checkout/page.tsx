"use client";
import React from "react";
import { useRouter } from "next/navigation";
import RightSectionOrderSummary from "../components/RightSectionOrderSummary";

const CheckOut: React.FC = () => {
  const countries = ["Philippines", "United States", "Canada", "Japan", "Singapore"];
  const router = useRouter();

  const handleProceed = () => {
    router.push("/checkout-shipping"); // Adjust this path as necessary
  };

  const handleLoginRedirect = () => {
    router.push("../login/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Main Content */}
      <div className="flex-grow flex flex-col lg:flex-row">
        {/* Left Section - Checkout Form */}
        <div className="flex-1 bg-white p-6 lg:p-8">
          <nav className="text-gray-600 text-sm mb-8">
            <span>Cart</span> &gt; <span>Information</span> &gt; <span>Shipping</span> &gt; <span>Payment</span>
          </nav>

          {/* Contact Information */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Contact</label>
            <input
              type="email"
              placeholder="Email"
              className="mt-1 p-2 w-full border border-gray-300 rounded"
            />
            <p className="text-right text-sm mt-2">
              Already have an account?{" "}
              <button onClick={handleLoginRedirect} className="text-blue-600 hover:underline">
                Login
              </button>
            </p>
          </div>

          {/* Shipping Address */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
            <select
              className="block w-full p-2 border border-gray-300 rounded mb-4"
              defaultValue="Philippines"
            >
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input type="text" placeholder="First Name" className="p-2 border border-gray-300 rounded" />
              <input type="text" placeholder="Last Name" className="p-2 border border-gray-300 rounded" />
            </div>
            <input
              type="text"
              placeholder="Address"
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input type="text" placeholder="City" className="p-2 border border-gray-300 rounded" />
              <input type="text" placeholder="Zip Code" className="p-2 border border-gray-300 rounded" />
            </div>
            <input
              type="text"
              placeholder="Phone"
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
          </div>

          {/* Proceed Button */}
          <div className="flex items-center justify-between mt-6">
            <a href="#" className="block text-blue-600 hover:underline text-center">
              &lt; Return to Cart
            </a>
            <button
              onClick={handleProceed}
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Proceed
            </button>
          </div>
        </div>

        {/* Right Section - Order Summary */}
        <RightSectionOrderSummary
          subtotal={3500}
          shippingFee={500}
        />
      </div>
    </div>
  );
};

export default CheckOut;
