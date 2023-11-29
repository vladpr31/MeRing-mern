import React from "react";

const ConfirmationModal = ({
  confirmText,
  confirmQuestion,
  confirmIcon,
  confirmIconBGColor,
  confirmationAction,
  confirmationId,
}) => {
  return (
    <>
      <button
        className={`btn ${confirmIconBGColor} hover:bg-red-800`}
        onClick={() =>
          document.getElementById("confirmation_modal").showModal()
        }
      >
        {confirmIcon}
      </button>
      <dialog id="confirmation_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{confirmQuestion}</h3>
          <p className="py-4">{confirmText}</p>
          <div className="modal-action flex justify-between">
            <form method="submit">
              <button
                className="btn bg-blue-500 flex-start text-white"
                id={confirmationId}
                onClick={confirmationAction}
                type="submit"
              >
                Yes
              </button>
            </form>
            <form method="dialog">
              <button className="btn btn-error text-white flex-end">No</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ConfirmationModal;
