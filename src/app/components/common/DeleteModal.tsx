import React from "react";

interface DeleteConfirmationModalProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteModal: React.FC<DeleteConfirmationModalProps> = ({
  isVisible,
  onClose,
  onConfirm,
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
        <h2 className="text-lg font-semibold mb-4">Are you sure you want to delete this product?</h2>
        <div className="flex justify-end gap-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded-md">
            Cancel
          </button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-500 text-white rounded-md">
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
