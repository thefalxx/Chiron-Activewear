"use client";

interface CategorySubcategoryModalProps {
  isOpen: boolean;
  isSubcategoryModal: boolean;
  newCategory: string;
  setNewCategory: (value: string) => void;
  newSubCategory: { name: string };
  setNewSubCategory: (value: { name: string }) => void;
  onClose: () => void;
  onSave: () => void;
}

export function CategorySubcategoryModal({
  isOpen,
  isSubcategoryModal,
  newCategory,
  setNewCategory,
  newSubCategory,
  setNewSubCategory,
  onClose,
  onSave,
}: CategorySubcategoryModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
        <h2 className="text-lg font-semibold mb-4">
          {isSubcategoryModal ? "Add New SubCategory" : "Add New Category"}
        </h2>
        {isSubcategoryModal ? (
          <input
            type="text"
            value={newSubCategory.name}
            onChange={(e) =>
              setNewSubCategory({ ...newSubCategory, name: e.target.value })
            }
            placeholder="Enter subcategory name"
            className="w-full p-2 border rounded mb-4"
          />
        ) : (
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Enter category name"
            className="w-full p-2 border rounded mb-4"
          />
        )}
        <div className="flex justify-between gap-4">
          <button
            onClick={onClose}
            className="bg-red-500 text-white p-2 rounded w-1/2"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="bg-blue-500 text-white p-2 rounded w-1/2"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
