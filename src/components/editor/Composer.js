import React, { useEffect, useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { toast } from "react-toastify";
import Alert from "../alert/Alert";
import { useNavigate } from "react-router-dom";

const SERVER_HOST = process.env.REACT_APP_SERVER_HOST;

const Composer = () => {

  const [subject, setSubject] = useState("");

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const handleEditorOnChange = (state) => {
    setEditorState(state);
  };
  const [csvFile, setcsvFile] = useState(null);

  useEffect(() => {
    console.log(csvFile);
  }, [csvFile]);

  const handleSendMails = async () => {
    // add html data
    const rawHtmlData = convertToRaw(
      editorState.getCurrentContent()
    ).blocks[0].text.split(" ");
    if ([...new Set(rawHtmlData)].length === 0) {
      toast.error("Email Body Can not be Empty");
      return;
    } else if ([...new Set(rawHtmlData)].length < 5) {
      toast.error("Email is too short");
      return;
    }

    // add csv csvFile
    if (!csvFile) {
      toast.error("Please select the recipient File");
      return;
    } else if (csvFile.size > 1024 * 1024) {
      toast.error("File Size Exceeded");
      return;
    }
    // if both html and csv are of required types save it as a form
    const htmlData = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    // console.log(typeof(htmlData));

    const formData = new FormData();
    formData.append("subject", subject);
    formData.append("html", htmlData);
    formData.append("csv", csvFile);
    // console.log(formData)
    const options = {
      method: "POST",
      body: formData,
      headers: {
        authtoken: localStorage.getItem("authToken"),
      },
    };

    try{
      await fetch(`${SERVER_HOST}/mails/schedule`, options);
      window.location.reload()
    }catch{
      toast.error("Please Connect to the Internet");
    }
  };

  return (
    <>
      <Alert />
      <div className="container" style={{ marginTop: "1vb" }}>
        <Editor
          editorState={editorState}
          onEditorStateChange={handleEditorOnChange}
        />
        <div style={{ margin: "10px 0 0 0" }}>
          <button
            type="button"
            className="btn btn-danger"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal2">
            Next
          </button>
        </div>
      </div>

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
            <form>
              <div
                className="container"
                style={{ margin: "25px 10px", textAlign: "center" }}>
                <div className="form-group d-flex" style={{flexDirection:"column", alignItems:"center", fontSize:"18px"}}>
                  <label>
                    Subject of the Mail
                  </label>
                <input
                    type="text"
                    onChange={(e) => {
                      setSubject(e.target.value);
                    }}
                    style={{padding:"5px"}}
                  />
                  <label>
                    Recipient List
                  </label>
                  <input
                    type="file"
                    onChange={(e) => {
                      setcsvFile(e.target.files[0]);
                    }}
                    className="form-control-file"
                    style={{ maxWidth: "205px", minWidth: "205px" ,fontSize:"10px"}}
                    accept=".csv"
                  />
                </div>
              </div>
            </form>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success"
                data-bs-dismiss="modal">
                Close
              </button>
              <button
                type="button"
                className="btn btn-warning mx-3"
                data-bs-dismiss="modal"
                onClick={handleSendMails}
                disabled={localStorage.getItem("name") && csvFile && subject ? false :true}
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
