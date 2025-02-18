"use client";

import React from "react";
import { MenuItem } from "../types";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
  menuTobeDeleted: MenuItem | null;
}

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  message,
  menuTobeDeleted,
}: ConfirmationModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="mb-4">{message}</p>
        <p className="text-black font-bold self-center flex items-center justify-center pb-3 -mt-3">
          `&quot;${menuTobeDeleted?.name}&quot;?`
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onConfirm}
            className="bg-[#8D8D8DA2] text-white px-4 py-2 rounded hover:bg-[#646262a2]"
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="bg-[#F472B6] text-white px-4 py-2 rounded hover:bg-[#e261a4]"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
