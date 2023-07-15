const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const { Parser } = require("htmlparser2");
const multer = require("multer");
const { Readable } = require("readable-stream");

const Drafts = require("../models/Drafts");

const JWT_SECRET = "helloU$er";

const isValidHTML = (html) => {
  let isValid = true;
  const parser = new Parser({
    onerror: () => {
      isValid = false;
    },
  });
  parser.write(html);
  parser.end();
  return isValid;
};

const filterEmails = async (emails) => {
  const validEmails = new Set();

  const emailRegex = new RegExp("[a-zA-Z0-9.+{1}]+@[a-zA-Z0-9-]+\.[a-zA-Z.]+");
  
  emails.forEach((email) => {
    if (emailRegex.test(email)) {
      validEmails.add(email);
    }
  });
  return Array.from(validEmails);
};

const upload = multer();


// Routes 
router.post("/send", upload.single("csv"), async (req, res) => {
  // if there are errors, return Bad request and the errors

  const html = req.body.html;
  const file = req.file;

  // check if body is empty
  if (_.isEqual(html, {})) {
    return res
      .status(400)
      .json({ success: false, errors: "Email body can not be empty" });
  }

  // check if html is a valid html
  if (!isValidHTML(html)) {
    return res
      .status(400)
      .json({ success: false, errors: "Don't mess with my server" });
  }

  const authToken = req.headers.authtoken;
  // try to verify token and retrieve email of the user
  try {
    const email = jwt.verify(authToken, JWT_SECRET, {});

    if (!email) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid authToken1" });
    }

    // Read the buffer of the csv file and refine it

    let readableStream = Readable.from(file.buffer.toString());
    let emails = [];

    await readableStream
      .on("data", (row) => {
        emails = (row.replace(/[\r,]+/gm, '').split("\n"))
      })
      .on("end", () => {
        console.log("CSV processing complete");
      });

    const valid_emails = await filterEmails(emails)
    console.log(valid_emails)
    if(valid_emails.length === 0){
      return res.status(400).json({success: false, error: "please provide file in the correct comma seperated format"});
    }
    
    // converting this refined email list to binary
    const valid_emails_buffer = Buffer.from([...valid_emails].join(","));
    console.log(valid_emails_buffer)

    // add the final draft into the DB
    const draft = await Drafts.create({
      email: email,
      csv: valid_emails_buffer,
      html: html,
      totalLength: valid_emails.length
    })
    console.log(draft);

    return res.status(200).json({ success: true, message: 'InQueue' });
  } catch (error) {
    console.log(error.message);
    return res
      .status(400)
      .json({ success: false, error: "Internal server error2" });
  }
});

module.exports = router;
