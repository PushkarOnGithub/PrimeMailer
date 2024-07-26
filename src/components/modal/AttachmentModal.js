import React, { useEffect } from "react";
import "./modal.css";

export default function AttachmentModal({
  setAttFile
}) {
  useEffect(() => {
    const modal_content = document.getElementById("att-input-modal-content");
    const modal = document.getElementById("att-input-modal");

    const openButtons = document.querySelectorAll(
      ".att-input-modal-open-button"
    );
    const closeButtons = document.querySelectorAll(
      ".att-input-modal-close-button"
    );

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
      <button className="modal-button att-input-modal-open-button">
        Open Attachment Input
      </button>
      <div className="modal" id="att-input-modal">
        <div className="modal-content" id="att-input-modal-content">
          <div className="modal-message">
            <i class="fa-solid fa-paperclip"></i>
            <h2>Add Attachments</h2>
            <h6>*Single Attachment Supported</h6>
          </div>
          <div className="modal-input">
            <div className="modal-file-input">
              <label htmlFor="attFile">
                <i className="fa-solid fa-upload"></i> Select File{" "}
              </label>
              <input
                type="file"
                name="attFile"
                id="attFile"
                onChange={(e) => {
                  setAttFile(e.target.files[0]);
                }}
              />
            </div>
          </div>
          <div className="modal-buttons">
            <button className="modal-button modal-button-close att-input-modal-close-button">
              Close
            </button>
            <button
              className="modal-button modal-button-continue att-input-modal-close-button file-input-modal-open-button">
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
