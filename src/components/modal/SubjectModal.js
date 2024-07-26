import React, { useEffect } from "react";
import "./modal.css";

export default function SubjectModal({setSubject}) {
  useEffect(() => {
    const openButtons = document.querySelectorAll(".subject-modal-open-button");
    const modal_content = document.getElementById("subject-modal-content");
    const modal = document.getElementById("subject-modal");
    const closeButtons = document.querySelectorAll(".subject-modal-close-button");

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
      button.addEventListener("click", openModal);
    });
    // Attach click event listeners to all close buttons
    closeButtons.forEach((button) => {
      button.addEventListener("click", closeModal);
    });
    window.addEventListener("click", (event) => {
      if (
        modal.classList.contains("show") &&
        !modal_content.contains(event.target)
      ) {
        closeModal();
      }
    });
  }, []);

  return (
    <>
      {/* <button className="modal-button subject-modal-open-button">
        Open Subject
      </button> */}
      <div className="modal" id="subject-modal">
        <div className="modal-content" id="subject-modal-content">
          <div className="modal-message">
            <i className="fa-regular fa-envelope"></i>
            <h2>Provide Subject </h2>
          </div>
          <div className="modal-input">
            <input
              className="modal-text-input"
              type="text"
              onChange={(e) => {
                setSubject(e.target.value);
              }}
              placeholder="Enter Subject of the Mail "
            />
          </div>
          <div className="modal-buttons">
            <button className="modal-button modal-button-close subject-modal-close-button">
              Close
            </button>
            <button className="modal-button modal-button-continue subject-modal-close-button att-input-modal-open-button">
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
