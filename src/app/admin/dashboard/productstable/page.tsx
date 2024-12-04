"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../../components/common/Sidebar";
import DeleteModal from "@/app/components/common/DeleteModal";
import { CategorySubcategoryModal } from "@/app/components/CategorySubcategoryModal";


interface Product {
  id: number;
  product_name: string;
  category: string;
  sub_category: string;
  sizes: string;
  price: number;
  status: string; // Add status field
}

export default function ProductsTable() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<any[]>([]); // State for categories
  const [subcategories, setSubCategories] = useState<any[]>([]); // State for subcategories
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubcategoryModal, setIsSubcategoryModal] = useState(false); // For subcategory modal toggle
  const [newCategory, setNewCategory] = useState("");
  const [newSubCategory, setNewSubCategory] = useState({ name: ""}); // For subcategory input
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productResponse, categoryResponse, subcategoryResponse] = await Promise.all([
          fetch("/api/products"),
          fetch("/api/categories"),
          fetch("/api/subcategories"),
        ]);
  
        if (!productResponse.ok || !categoryResponse.ok || !subcategoryResponse.ok) {
          throw new Error("Failed to fetch some data.");
        }
  
        const [productData, categoryData, subcategoryData] = await Promise.all([
          productResponse.json(),
          categoryResponse.json(),
          subcategoryResponse.json(),
        ]);
  
        setProducts(productData.products);
        setCategories(categoryData.categories);
        setSubCategories(subcategoryData.subcategories);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);
  

  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!productToDelete) {
      console.error("No product selected for deletion.");
      return;
    }
  
    console.log("Deleting product with ID:", productToDelete.id); // Debugging log
  
    try {
      const response = await fetch("/api/products", { // Make sure the API route is correct
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: productToDelete.id }), // Pass the ID correctly
      });
  
      if (!response.ok) {
        const errorData = await response.json(); // Fetch error details
        throw new Error(errorData.error || "Failed to delete product.");
      }
  
      // Update the state to remove the deleted product from the UI
      setProducts((prev) =>
        prev.filter((product) => product.id !== productToDelete.id)
      );
  
      // Close the modal and reset state
      setShowDeleteModal(false);
      setProductToDelete(null);
  
      // Display success message
      alert("Product deleted successfully!");
      console.log("Product deleted successfully");
    } catch (error: any) {
      console.error("Error deleting product:", error.message);
    }
  };

  const navigateToEditProduct = (id: any) => {
    router.push(`/admin/dashboard/addproduct/${id}/edit`);
  };

  const navigateToAddProduct = () => {
    router.push("/admin/dashboard/addproduct");
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    if (isModalOpen) {
      setNewCategory(""); // Reset category input when closing modal
      setNewSubCategory({ name: ""});
      setIsSubcategoryModal(false); // Reset modal type
    }
  };

  

  const handleSaveCategory = async () => {
    if (!newCategory.trim()) {
      alert("Category name cannot be empty.");
      return;
    }
  
    try {
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newCategory }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to save category");
      }
  
      const data = await response.json();
      setCategories((prev) => [...prev, { id: data.id, name: newCategory }]);
  
      alert("Category added successfully!");
      toggleModal();
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };
  
  const handleSaveSubCategory = async () => {
    if (!newSubCategory.name.trim()) {
      alert("Subcategory name cannot be empty.");
      return;
    }
  
    try {
      const response = await fetch("/api/subcategories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newSubCategory.name, // Send only the name field
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Backend error:", errorData);
        throw new Error(errorData.error || "Failed to add subcategory");
      }
  
      const data = await response.json();
  
      // Add the new subcategory to the state
      setSubCategories((prev) => [
        ...prev,
        { id: data.id, name: newSubCategory.name },
      ]);
  
      alert("Subcategory added successfully!");
      setNewSubCategory({ name: "" }); // Reset the form
      toggleModal();
    } catch (error) {
      console.error("Error saving subcategory:");
      // alert(error.message);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="bg-white p-6 shadow-md rounded-md">
          <h1 className="text-2xl font-semibold mb-24 mt-10">Products</h1>
          <div className="flex gap-4 mb-4">
            {/* Dropdown Filters */}
            <select className="px-4 py-2 rounded-md border border-gray-300">
              <option value="">Category</option>
              {categories.map((category, index) => (
                <option key={index} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <select className="px-4 py-2 rounded-md border border-gray-300">
              <option value="">Sub-Category</option>
              {Array.isArray(subcategories) && subcategories.length > 0
                ? subcategories.map((subcategory, index) => (
                    <option key={index} value={subcategory.id}>
                      {subcategory.name}
                    </option>
                  ))
                : null}
            </select>
            <button
              onClick={() => { setIsSubcategoryModal(false); toggleModal(); }}
              className="bg-green-500 text-white px-4 py-2 rounded-md"
            >
              Add Category
            </button>

            <button
              onClick={() => { setIsSubcategoryModal(true); toggleModal(); }}
              className="bg-green-500 text-white px-4 py-2 rounded-md"
            >
              Add SubCategory
            </button>

            <button
              onClick={navigateToAddProduct}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Add Product
            </button>
          </div>

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-4">ProductID</th>
                <th className="p-4">Product Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Sub-Category</th>
                <th className="p-4">Sizes</th>
                <th className="p-4">Price</th>
                <th className="p-4">Status</th> {/* Add Status column */}
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{product.id}</td>
                  <td className="p-4">{product.product_name}</td>
                  <td className="p-4">{product.category}</td>
                  <td className="p-4">{product.sub_category}</td>
                  <td className="p-4">{product.sizes}</td>
                  <td className="p-4">₱{Number(product.price).toFixed(2)}</td>
                  <td className="p-4">{product.status}</td> {/* Add Status data */}
                  <td className="p-4 flex gap-2">
                    {/* <button 
                     onClick={() =>
                      router.push(`/admin/dashboard/products/edit?productId=${product.id}`)
                    }
                    className="text-blue-500 hover:underline">Edit</button> */}

                    <button 
                    onClick={() => navigateToEditProduct(product.id)}
                    className="text-blue-500 hover:underline">
                      
                      Edit
                    </button>

                    <button 
                      onClick={() => handleDeleteClick(product)}
                      className="text-red-500 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <DeleteModal 
      isVisible={showDeleteModal}
      onClose={() => setShowDeleteModal(false)}
      onConfirm={confirmDelete}
      />

      

      <CategorySubcategoryModal
        isOpen={isModalOpen}
        isSubcategoryModal={isSubcategoryModal}
        newCategory={newCategory}
        setNewCategory={setNewCategory}
        newSubCategory={newSubCategory}
        setNewSubCategory={setNewSubCategory}
        onClose={toggleModal}
        onSave={isSubcategoryModal ? handleSaveSubCategory : handleSaveCategory}
      />




    </div>
  );
}


