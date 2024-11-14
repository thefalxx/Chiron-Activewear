"use client"; // Add this line at the top of your file

import React, { useState } from 'react';
import Navbar from "../components/common/NavBar";
import Footer from "../components/common/Footer";
import Image from "next/image";
import YouMayAlsoLike from "../components/YouMayAlsoLike";
import ProductViewCards from "../components/ProductViewCards";

const ProductView: React.FC = () => {
  // State to track which section is expanded
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  // State to track the selected size
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  // Function to toggle section expansion
  const toggleSection = (section: string) => {
    setExpandedSection(prevSection => prevSection === section ? null : section);
  };

  // Function to handle size selection
  const handleSizeClick = (size: string) => {
    setSelectedSize(size);
  };

  // Content for each section
  const sectionContent: { [key: string]: string } = {
    'Description': 'This is a premium shirt made of high-quality DriFit fabric, designed to keep you comfortable during workouts.',
    'Size & Fit': 'This shirt fits true to size. If you prefer a relaxed fit, we recommend sizing up.',
    'Material & Care': 'Material: 100% Polyester. Machine wash cold, tumble dry low.',
    'Delivery & Returns': 'Standard delivery fees may apply. Returns accepted only if the item has damage. 7 days warranty. Delivery is within 3-5 business days.'
  };

  return (
    <div className="container mx-auto p-6 mt-28">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ProductViewCards />

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Premium Shirt - DriFit</h1>
          <p className="text-xl font-medium text-gray-700 mb-4">₱3,500.00</p>

          {/* Color Options */}
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-8 h-8 bg-gray-900 rounded-full"></div>
            <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
            <div className="w-8 h-8 bg-blue-900 rounded-full"></div>
            <div className="w-8 h-8 bg-navy rounded-full"></div>
          </div>

          {/* Size Selector */}
          <div className="mb-4">
            <p className="font-semibold mb-2">Select a size:</p>
            <div className="grid grid-cols-6 gap-2">
              {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                <button
                  key={size}
                  onClick={() => handleSizeClick(size)}
                  className={`border py-2 px-4 text-center transition-all 
                    ${
                      selectedSize === size
                        ? 'bg-black text-white border-black' // When selected: Black background and white text
                        : 'border-gray-300 text-gray-800 hover:border-black' // On hover: Darken border
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button className="bg-black text-white py-3 px-6 mt-4 w-full">
            Add to Cart
          </button>

          {/* Accordion (Description, Size & Fit, etc.) */}
          <div className="space-y-4 mt-6">
            {['Description', 'Size & Fit', 'Material & Care', 'Delivery & Returns'].map(
              (section) => (
                <div key={section} className="border-b border-gray-300 pt-2 pb-4">
                  <button
                    className="w-full text-left font-semibold text-gray-800"
                    onClick={() => toggleSection(section)} // Toggle section on click
                  >
                    {section}
                    <span className="float-right">
                      {expandedSection === section ? '▲' : '▼'} {/* Arrow toggle */}
                    </span>
                  </button>

                  {/* Show content if the section is expanded */}
                  {expandedSection === section && (
                    <div className="mt-2 text-gray-600">
                      {sectionContent[section]}
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="py-12">
        <YouMayAlsoLike />
      </div>

      <Footer />
    </div>
  );
};

export default ProductView;
