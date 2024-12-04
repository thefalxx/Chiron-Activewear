"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Sidebar from "../../../components/common/Sidebar";

export default function AddProduct() {
  const router = useRouter();

  const [images, setImages] = useState<Array<{ file: File; preview: string }>>([]);
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [sizes, setSizes] = useState("");
  const [allSizesChecked, setAllSizesChecked] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("Available"); // Default status
  const [categories, setCategories] = useState<Array<{ id: string; name: string }>>([]);
  const [subCategories, setSubCategories] = useState<Array<{ id: string; name: string }>>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoryResponse, subcategoryResponse] = await Promise.all([
          fetch("/api/categories"),
          fetch("/api/subcategories"),
        ]);

        const [categoryData, subcategoryData] = await Promise.all([
          categoryResponse.json(),
          subcategoryResponse.json(),
        ]);

        setCategories(categoryData.categories);
        setSubCategories(subcategoryData.subcategories);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleCheckboxChange = () => {
    setAllSizesChecked((prev) => !prev);
    setSizes(!allSizesChecked ? "All Sizes are available" : "");
  };

  const fetchAPI = async (url: string, options: RequestInit) => {
    try {
      setIsLoading(true);
      const res = await fetch(url, options);
      const data = await res.json();
      return { success: res.ok, data };
    } catch (error) {
      console.error("API Error:", error);
      return { success: false, data: null };
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (productName.trim().length < 3) {
      setStatusMessage("Product name must be at least 3 characters long.");
      return;
    }

    if (!category || !subCategory || !price) {
      setStatusMessage("Product name, category, subcategory, and price are required.");
      return;
    }

    const productData = {
      productName,
      category,
      subCategory,
      price,
      description,
      sizes,
      status,
    };

    const { success, data } = await fetchAPI("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    });

    if (success) {
      setStatusMessage("Product saved successfully!");
      setProductName("");
      setCategory("");
      setSubCategory("");
      setPrice("");
      setDescription("");
      setSizes("");
      setStatus("Available");
      setAllSizesChecked(false);
      setImages([]);
    } else {
      setStatusMessage(data?.error || "An error occurred while saving the product.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />

      <main className="flex-1 max-w-7xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Add Product</h1>

        {isLoading && <p className="text-blue-600">Processing...</p>}
        {statusMessage && <p className="text-red-600">{statusMessage}</p>}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Image Upload */}
          <div>
            <div className="border border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center h-56">
              <label htmlFor="file-upload" className="text-blue-500 cursor-pointer hover:underline">
                <div className="text-gray-400 text-sm text-center">
                  Drop your files here or <span className="text-blue-600">Browse</span>
                </div>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  multiple
                  accept="image/*"
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    setImages(files.map((file) => ({ file, preview: URL.createObjectURL(file) })));
                  }}
                />
              </label>
            </div>

            {/* Image Previews */}
            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative">
                  <Image
                    src={image.preview}
                    alt={`Preview ${index + 1}`}
                    width={150}
                    height={150}
                    className="rounded-lg"
                  />
                  <button
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 text-xs"
                    onClick={() =>
                      setImages(images.filter((_, imgIndex) => imgIndex !== index))
                    }
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Form Inputs */}
          <div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Product Name</label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full mt-1 border border-gray-300 rounded-lg p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  className="w-full px-4 py-2 rounded-md border border-gray-300"
                  value={category} // Bind value to state
                  onChange={(e) => setCategory(e.target.value)} // Update state on change
                >
                  <option value="">Category</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Sub Category</label>
                <select
                  className="w-full px-4 py-2 rounded-md border border-gray-300"
                  value={subCategory} // Bind value to state
                  onChange={(e) => setSubCategory(e.target.value)} // Update state on change
                >
                  <option value="">Sub-Category</option>
                  {Array.isArray(subCategories) && subCategories.length > 0
                    ? subCategories.map((subcategory, index) => (
                        <option key={index} value={subcategory.id}>
                          {subcategory.name}
                        </option>
                      ))
                    : null}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input
                  type="number"
                  value={price} // Bind value to state
                  onChange={(e) => setPrice(e.target.value)} // Update state on change
                  className="w-full mt-1 border border-gray-300 rounded-lg p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full mt-1 border border-gray-300 rounded-lg p-2"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Add Sizes</label>
                <select
                  className="w-full mt-1 border border-gray-300 rounded-lg p-2"
                  disabled={allSizesChecked}
                  value={sizes}
                  onChange={(e) => setSizes(e.target.value)}
                >
                  {!allSizesChecked && (
                    <>
                      <option value="">Select Size</option>
                      <option>Small</option>
                      <option>Medium</option>
                      <option>Large</option>
                    </>
                  )}
                </select>
                <div className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600"
                    id="allSizes"
                    checked={allSizesChecked}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="allSizes" className="ml-2 text-sm text-gray-700">All Sizes Available</label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  className="w-full px-4 py-2 rounded-md border border-gray-300"
                  value={status} // Bind value to state
                  onChange={(e) => setStatus(e.target.value)} // Update state on change
                >
                  <option value="Available">Available</option>
                  <option value="OutOfStock">Out of Stock</option>
                  <option value="Discontinued">Discontinued</option>
                </select>
              </div>

              <div className="flex justify-between gap-4">

              <button
                className="w-full bg-gray-500 text-white py-2 rounded-lg"
                onClick={() => router.push("/admin/dashboard/productstable")}
              >
                Cancel
                </button>
                
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full bg-blue-600 text-white p-2 rounded-md"
                >
                  Save Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
