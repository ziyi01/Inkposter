import React, { useState, forwardRef, useImperativeHandle } from 'react';

interface PopupProps {
  title: string;
  message: string;
  onConfirm: () => void;
}

const Popup = forwardRef<any, PopupProps>(({ title, message, onConfirm }, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    openPopup: () => setIsOpen(true),
    closePopup: () => setIsOpen(false),
  }));

  const handleConfirm = () => {
    onConfirm();
    setIsOpen(false); 
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="mb-6">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            onClick={handleConfirm} // When confirmed
          >
            Leave Game
          </button>
          <button
            className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400"
            onClick={() => setIsOpen(false)} // Close when canceled
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
});

export default Popup;
