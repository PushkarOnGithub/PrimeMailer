import React, { useState, useRef } from "react";
const Composer = () => {
  const [text, setText] = useState("");
  const textareaRef = useRef(null);

  const handleOnChange = (event) => {
    setText(event.target.value);
  };

  const selectedText = () => {
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    return {start, end}
  }

  const bold = () => {
    const {start, end} = selectedText();
    if(start === end){return;}
    let formattedText = `${text.slice(0, start)}**${text.slice(start, end)}**${text.slice(end)}`;
    const boldRegExp = new RegExp("[A-Za-z]{0,}[*]{2}[A-Za-z]{0,}[*]{2}[A-Za-z]{0,}")
    const mat = formattedText.match(boldRegExp)
    console.log(mat)
    formattedText.replace(mat, <b>{mat}</b>)
    // const formattedText = text.slice(0, start) + <b>(text.slice(start, end))</b> + text.slice(end);
    setText(formattedText);
  }

  const italic = () => {
    const {start, end} = selectedText();
    if(start === end){return;}
    const formattedText = `${text.slice(0, start)}_${text.slice(start, end)}_${text.slice(end)}`;
    setText(formattedText);
  }

  const handleImageInsert = (imageUrl="../src/logo.svg") => {
    const {start, end } = selectedText();
    const formattedText =  `${text.slice(0, start)}![image]${imageUrl}${text.slice(end)}`
    setText(formattedText)
  }
  return (
    <>
      <div className="container mb-8">
        <div className="button-bar btr-sm" style={{ verticalAlign: "true" }}>
          <ul
            style={{
              display: "flex",
              listStyleType: "none",
              padding:"10px"
            }}>
            <li
              id="bold-button"
              className="button"
              style={{ margin: "0 15px", display: "inline" }}>
              <i className="fa-solid fa-bold" onClick={bold}></i>
            </li>
            <li
              id="italic-button"
              className="button"
              style={{ margin: "0 15px" }}>
              <i className="fa-solid fa-italic" onClick={italic}></i>
            </li>
            <li
              id="italic-button"
              className="button"
              style={{ margin: "0 15px" }}>
              <i className="fa-solid fa-image" onClick={handleImageInsert}></i>
            </li>
          </ul>
        </div>

        <textarea
          ref={textareaRef} 
          value={text}
          style={{ height: "300px" }}
          cols="92"
          rows="15"
          aria-labelledby="your-answer-header"
          tabIndex="101"
          data-min-length=""
          onChange={handleOnChange}></textarea>
      </div>
      <div className="container">
        <button type="button" className="btn btn-primary">
          Primary
        </button>
      </div>
    </>
  );
};

export default Composer;
