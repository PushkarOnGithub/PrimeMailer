import React, { useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { toast } from "react-toastify";
import "./Composer.css";
import FileInputModal from "../modal/FileInputModal";
import SubjectModal from "../modal/SubjectModal";

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

  // useEffect(() => {
  //   console.log(csvFile);
  // }, [csvFile]);

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

    try {
      await fetch(`${SERVER_HOST}/mails/schedule`, options);
      window.location.reload();
    } catch {
      toast.error("Please Connect to the Internet");
    }
  };

  return (
    <>
      <FileInputModal
        setcsvFile={setcsvFile}
        handleSendMails={handleSendMails}
      />
      <SubjectModal setSubject={setSubject} />
      <div className="composer">
        <h3>Write Your Mail Here</h3>
        <div className="editor">
          <Editor
            editorState={editorState}
            onEditorStateChange={handleEditorOnChange}
          />
        </div>
        <div>
          <button className="continue-button subject-modal-open-button">
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Composer;
