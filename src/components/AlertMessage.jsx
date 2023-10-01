import React, { useEffect } from "react";

export default function AlertMessage({ messageError, messageSuccess }) {
  useEffect(() => {
    if (messageError || messageSuccess) {
      document.getElementById("my_modal_1").showModal();
    }
  });
  return (
    <div>
      <dialog id="my_modal_1" className="modal flex justify-center">
        <div className="modal-box flex flex-col justify-center text-center">
          {messageSuccess && <h3 className="font-bold text-lg text-[#38ce5e]">Success</h3>}
          {messageError && (
            <h3 className="font-bold text-lg text-red-600">Error</h3>
          )}
          {messageError && <p className="py-4 text-red-600 font-bold">{messageError}</p>}
          {messageSuccess && (
            <p className="py-4 text-[#38ce5e] font-bold">{messageSuccess}</p>
          )}
          <div className="modal-action flex justify-center w-full">
            <form method="dialog w-96 flex justify-center bg-[#198564]">
              <button className="btn w-96 bg-[#198564] hover:bg-[#235e4c] text-white">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}
