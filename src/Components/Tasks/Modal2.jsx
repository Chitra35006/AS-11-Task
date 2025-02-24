import React from 'react';
import { useNavigate } from 'react-router-dom';

const Modal2 = ({ message, onClose }) => {
  const navigate = useNavigate();
 


  const handleClose = () => {
    onClose(); // Close the modal
    navigate("/dashboard/taskBoard"); // Navigate to the task board
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-gray-800 bg-opacity-75 w-full h-full absolute" onClick={onClose}></div>
      <div className="bg-white rounded-lg shadow-lg p-6 relative z-10">
        <h3 className="text-lg font-semibold text-center">{message}</h3>
        <div className="flex justify-center mt-4">
          <button
            onClick={handleClose} // Call handleClose on button click
            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal2;
