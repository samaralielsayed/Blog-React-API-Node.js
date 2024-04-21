import React from "react";

export default function ConfirmDelete({ onClose,onConfirm}) {
   
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center ">
        <div className="bg-white p-5 rounded-lg max-w-sm mx-auto relative">
          <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
          <p>
            Are you sure you want to delete{" "}
            <strong className="text-red-500"> Deleted</strong>? This action
            cannot be undone.
          </p>
          <div className="fspace-x-4 mt-4 absolute top-0 right-3 m-auto">
            <button className="text-black " onClick={onClose}>
              <p className="text-black opacity-7 h-6 w-6  block bg-gray-400 py-0  ">
                x
              </p>
            </button>
          </div>

          <button
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 mx-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
            onClick={()=>{onConfirm()}}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
}
