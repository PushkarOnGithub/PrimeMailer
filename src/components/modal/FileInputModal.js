import React, { useEffect } from "react";
import "./modal.css";

export default function FileInputModal({
  setcsvFile,
  handleSendMails,
  setEmailList,
}) {
  useEffect(() => {
    const openButtons = document.querySelectorAll(
      ".file-input-modal-open-button"
    );
    const modal_content = document.getElementById("file-input-modal-content");
    const modal = document.getElementById("file-input-modal");
    const closeButtons = document.querySelectorAll(
      ".file-input-modal-close-button"
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
      {/* <button className="modal-button file-input-modal-open-button">
        Open File Input
      </button> */}
      <div className="modal" id="file-input-modal">
        <div className="modal-content" id="file-input-modal-content">
          <div className="modal-message">
            <i className="fa-regular fa-envelope"></i>
            <h2>Provide Reciepients List</h2>
            <h6>*Enter Manually or Upload .csv File</h6>
          </div>
          <div className="modal-input">
            <input
              className="modal-text-input"
              type="email"
              placeholder="Enter Emails separated by comma(,)"
              onChange={(e) => {
                setEmailList(e.target.value);
              }}
            />
            <h6>OR</h6>
            <div className="modal-file-input">
              <label htmlFor="csvFile">
                <i className="fa-solid fa-upload"></i> Select File{" "}
              </label>
              <input
                type="file"
                name="csvFile"
                id="csvFile"
                accept=".csv"
                onChange={(e) => {
                  setcsvFile(e.target.files[0]);
                }}
              />
            </div>
          </div>
          <div className="modal-buttons">
            <button className="modal-button modal-button-close file-input-modal-close-button">
              Close
            </button>
            <button
              className="modal-button modal-button-continue file-input-modal-close-button"
              onClick={handleSendMails}>
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
