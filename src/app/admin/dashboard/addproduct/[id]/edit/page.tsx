"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import Sidebar from "../../../../../components/common/Sidebar";

export default function EditProduct() {
  const router = useRouter();
  const params = useParams();
  const productId = params?.id;

  const [images, setImages] = useState<Array<{ file: File | null; preview: string }>>([]);
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [sizes, setSizes] = useState("");
  const [allSizesChecked, setAllSizesChecked] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("Available");
  const [categories, setCategories] = useState<Array<{ id: string; name: string }>>([]);
  const [subCategories, setSubCategories] = useState<Array<{ id: string; name: string }>>([]);

  useEffect(() => {
    const fetchInitialData = async () => {
      if (!productId) {
        setStatusMessage("No product ID found.");
        return;
      }

      try {
        const categoryResponse = await fetch("/api/categories");
        const subcategoryResponse = await fetch("/api/subcategories");
        const categoryData = await categoryResponse.json();
        const subcategoryData = await subcategoryResponse.json();

        setCategories(categoryData.categories);
        setSubCategories(subcategoryData.subcategories);

        const productResponse = await fetch(`/api/products?id=${productId}`);
        if (!productResponse.ok) {
          throw new Error("Failed to fetch product data.");
        }

        const productData = await productResponse.json();
        setProductName(productData.product_name);
        setCategory(productData.category);
        setSubCategory(productData.sub_category);
        setPrice(productData.price);
        setDescription(productData.description);
        setSizes(productData.sizes);
        setAllSizesChecked(productData.sizes === "All Sizes are available");
        setStatus(productData.status);

        if (productData.images) {
          setImages(productData.images.map((url: string) => ({ file: null, preview: url })));
        }
      } catch (error) {
        console.error("Error fetching initial data:", error);
        setStatusMessage("Failed to fetch product data.");
      }
    };

    fetchInitialData();
  }, [productId]);

  const handleCheckboxChange = () => {
     setAllSizesChecked((prev) => !prev);
     setSizes(!allSizesChecked ? "All Sizes are available" : "");
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

    try {
      const response = await fetch(`/api/products?id=${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        setStatusMessage("Product updated successfully!");
        router.push("/admin/dashboard/productstable");
      } else {
        const errorData = await response.json();
        setStatusMessage(errorData.error || "An error occurred while updating the product.");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      setStatusMessage("An error occurred while updating the product.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />

      <main className="flex-1 max-w-7xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Edit Product</h1>

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
                {/* <select
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
                </select> */}

                <select
                  className="w-full px-4 py-2 rounded-md border border-gray-300"
                  value={category} // Bind value to state
                  onChange={(e) => setCategory(e.target.value)} // Update state on change
                >
                  <option value="">Category</option>
                  {Array.isArray(categories) &&
                    categories.map((category, index) => (
                      <option key={index} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Sub Category</label>
                {/* <select
                  className="w-full px-4 py-2 rounded-md border border-gray-300"
                  value={subCategory} // Bind value to state
                  onChange={(e) => setSubCategory(e.target.value)} // Update state on change
                >
                  <option value="">Sub Category</option>
                  {subCategories.map((subCategory, index) => (
                    <option key={index} value={subCategory.id}>
                      {subCategory.name}
                    </option>
                  ))}
                </select> */}

                <select
                  className="w-full px-4 py-2 rounded-md border border-gray-300"
                  value={subCategory} // Bind value to state
                  onChange={(e) => setSubCategory(e.target.value)} // Update state on change
                >
                  <option value="">Sub Category</option>
                  {Array.isArray(subCategories) &&
                    subCategories.map((subCategory, index) => (
                      <option key={index} value={subCategory.id}>
                        {subCategory.name}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full mt-1 border border-gray-300 rounded-lg p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full mt-1 border border-gray-300 rounded-lg p-2"
                />
              </div>

              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={allSizesChecked}
                    onChange={handleCheckboxChange}
                    className="mr-2"
                  />
                  <span className="text-sm">All Sizes are available</span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full mt-1 border border-gray-300 rounded-lg p-2"
                >
                  <option value="Available">Available</option>
                  <option value="Out of stock">Out of stock</option>
                </select>
              </div>

              <div className="mt-6 flex gap-4 justify-between">

              <button
                className="w-full bg-gray-500 text-white py-2 rounded-lg"
                onClick={() => router.push("/admin/dashboard/productstable")}
              >
                Cancel
                </button>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-blue-600 text-white rounded-md py-2"
                >
                  Update Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
