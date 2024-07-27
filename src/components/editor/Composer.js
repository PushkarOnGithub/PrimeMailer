import React, { useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { toast } from "react-toastify";
import "./Composer.css";
import FileInputModal from "../modal/FileInputModal";
import SubjectModal from "../modal/SubjectModal";
import AttachmentModal from "../modal/AttachmentModal";

const SERVER_HOST = process.env.REACT_APP_SERVER_HOST;

const Composer = () => {
  const [subject, setSubject] = useState(null);
  const [emailList, setEmailList] = useState(null);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const handleEditorOnChange = (state) => {
    setEditorState(state);
  };
  const [csvFile, setcsvFile] = useState(null);
  const [attFile, setAttFile] = useState(null);

  // useEffect(() => {
  //   console.log(csvFile);
  // }, [csvFile]);

  const handleSendMails = async () => {
    if(!localStorage.getItem("authToken")){
      toast.error("You Have To Login First");
      return;
    }
    if(subject === ""){
      toast.error("Subject Cannot be empty");
      return;
    }
    // add csv csvFile
    if (!csvFile && emailList === "" && emailList.length<10) {
      toast.error("Please Enter/Select Recipients");
      return;
    } else if (csvFile && csvFile.size > 1024 * 1024) {
      toast.error("File Size Exceeded (1MB)");
      return;
    } else if (attFile && attFile.size > 2 * 1024 * 1024) {
      toast.error("Attachment File Size Exceeded (2MB)");
      return;
    }
    // add html data
    const rawHtmlData = convertToRaw(
      editorState.getCurrentContent()
    ).blocks[0].text.split(" ");
    if ([...new Set(rawHtmlData)].length < 5) {
      toast.error("Email is too short");
      return;
    }
    const htmlData = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    // console.log(typeof(htmlData));
    
    // if subject, emailList and csv are of required types save it as a form
    const formData = new FormData();
    formData.append("subject", subject);
    formData.append("html", htmlData);
    formData.append("csvFile", csvFile);
    formData.append("attFile", attFile);
    formData.append("emailList", emailList);
    console.log(emailList)
    const options = {
      method: "POST",
      body: formData,
      headers: {
        authtoken: localStorage.getItem("authToken"),
      },
    };

    try {
      let res = await fetch(`${SERVER_HOST}/mails/schedule`, options);
      res = await res.json()
      if(res.success){
        toast.success("In Queue");
        window.location.reload();
      }else{
        toast.error(res.message);
      }
    } catch {
      toast.error("Please Connect to the Internet");
    }
  };

  return (
    <>
      <FileInputModal
        setcsvFile={setcsvFile}
        handleSendMails={handleSendMails}
        setEmailList={setEmailList}
      />
      <SubjectModal setSubject={setSubject} />
      <AttachmentModal setAttFile={setAttFile}/>
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
