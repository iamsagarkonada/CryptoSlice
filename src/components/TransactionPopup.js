// TransactionPopup.js
import React, { useEffect, useState } from 'react';

const TransactionPopup = ({ isOpen, message, onClose }) => {
  const [popupMessage, setPopupMessage] = useState('');

  useEffect(() => {
    if (isOpen) {
      setPopupMessage(message);
    }
  }, [isOpen, message]);

  return (
    <div className={`fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-md p-4 mt-8 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'} transition-opacity duration-300 ease-in-out`}>
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-6 rounded-md shadow-lg transform scale-100 hover:scale-105 text-center">
        <p className="text-white text-lg font-bold mb-4 overflow-x-auto whitespace-pre-wrap">
          {popupMessage}
        </p>
        <button
          onClick={onClose}
          className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 focus:outline-none"
        >
          Close
        </button>
      </div>
    </div>
  );
  
};

export default TransactionPopup;
