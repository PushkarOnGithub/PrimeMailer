import React, { useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { toast } from "react-toastify";
import Alert from "./Alert";

const Composer = () => {
  const host = "http://127.0.0.1:5000";
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const handleOnChange = (state) => {
    setEditorState(state);
    // const temp = ((convertToRaw(editorState.getCurrentContent()).blocks)[0]).text.split(" ");
    // console.log([...new Set(temp)].length);
  };
  const [csvFile, setCsvFile] = useState(null);

  const handleCsvFile = (event) => {
    setCsvFile(event.target.files[0]);
  }

  const handleSendMails = async () => {
    // add html data
    const rawHtmlData = ((convertToRaw(editorState.getCurrentContent()).blocks)[0]).text.split(" ");
    if([... new Set(rawHtmlData)].length === 0){
      toast.error("Email Body Can not be Empty")
      return;
    }else if([... new Set(rawHtmlData)].length < 5){
      toast.error("Email is too short");
      return;
    }
    
    // add csv file
    if(! csvFile){
      toast.error("Please select the recipient file")
      return;
    }else if(csvFile.size > 1024*1024){
      toast.error('File Size Exceeded');
      setCsvFile(null);
      return;
    }
    // if both html and csv are of required types save it as a form
    const htmlData = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    // console.log(typeof(htmlData));
    const formData = new FormData();
    formData.append('html', htmlData)
    formData.append('csv', csvFile)
    // console.log(formData)
    let response = await fetch(host + "/api/mails/send", {
      method: "POST",
      headers: {
        authToken: localStorage.getItem("authToken"),
      },
      body: formData,
    });
    console.log(response);
  };
  return (
    <>
    <Alert/>
      <div className="container" style={{ marginTop: "1vb" }}>
        <Editor
          editorState={editorState} 
          onEditorStateChange={handleOnChange}
        />
        <button
          type="button"
          className="btn btn-danger"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal2"
          // onClick={() => {
          //   setShowModal(true);
          //   handleConfirmation();
          // }}
          style={{ margin: "10px 0 0 0" }}>
          Send
        </button>
      </div>
      <form>
        <div
          className="container"
          style={{ margin: "25px 10px", textAlign: "center" }}>
          <div className="form-group">
            <input
              type="file"
              className="form-control-file"
              id="exampleFormControlFile1"
              onChange={handleCsvFile}
              style={{ maxWidth: "205px", minWidth: "205px" }}
              accept=".csv,.xlsx"
            />
            <label htmlFor="exampleFormControlFile1">
              Recipient List( csv and excel files supported)
            </label>
          </div>
        </div>
      </form>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModal2"
        tabIndex="-1"
        aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title"
                style={{ fontSize: "25px", color: "red" }}>
                Are You Sure?
              </h5>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success"
                data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-warning mx-3"
              onClick={handleSendMails}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Composer;
