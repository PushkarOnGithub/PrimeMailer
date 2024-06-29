import React, { useEffect } from "react";
import "./modal.css";

export default function SimpleModal({handleLogoutConfirm}) {
  useEffect(() => {
    const openButtons = document.querySelectorAll(".simple-modal-open-button");
    const modal_content = document.getElementById("simple-modal-content");
    const modal = document.getElementById("simple-modal");
    const closeButtons = document.querySelectorAll(".simple-modal-close-button");

    // Function to close the modal
    function closeModal() {
      modal.classList.remove("show");
      modal.classList.add("hidden");
    }
    function openModal(event) {
      event.stopPropagation(); // Stop the event from propagating to the window
      modal.classList.remove("hidden");
      modal.classList.add("show");
    }

    // Attach click event listeners to all open buttons
    openButtons.forEach((button) => {
      button.addEventListener('click', openModal);
    })
    // Attach click event listeners to all close buttons
    closeButtons.forEach((button) => {
      button.addEventListener("click", closeModal);
    });
    window.addEventListener("click", (event) => {
      if (modal.classList.contains('show') && !modal_content.contains(event.target)) {
        closeModal();
      }
    });
  }, []);

  return (
    <>
      {/* <button className="modal-button simple-modal-open-button">
        Open Simple
      </button> */}
      <div className="modal" id="simple-modal">
        <div className="modal-content" id="simple-modal-content">
          <div className="modal-message">
            <i className="fa-solid fa-circle-exclamation"></i>
            <h2>Are You Sure?</h2>
          </div>
          <div className="modal-buttons">
            <button className="modal-button modal-button-close simple-modal-close-button">
              Close
            </button>
            <button className="modal-button modal-button-continue simple-modal-close-button"
            onClick={handleLogoutConfirm}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
