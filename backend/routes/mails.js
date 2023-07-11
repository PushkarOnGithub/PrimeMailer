const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const { Parser } = require('htmlparser2');
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');

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
  }
const upload = multer();

router.post('/send',upload.single('csv'), async(req, res)=>{
  // console.log("html: ", (req.body.html));
  // console.log("csv: ", (req.file));

  // if there are errors, return Bad request and the errors

    const html = req.body.html;
    const file = req.file;
  
  // check if body is empty
    if (! _.isEqual(html, {})) {
        return res.status(400).json({success: false, errors: "Email body can not be empty" });
    }
  
  // check if html is a valid html
    if(!isValidHTML(html)){
        return res.status(400).json({success: false, errors: "Don't mess with my server" });
    }
  
    const authToken = req.headers.authtoken;
  // try to verify token and retrieve email of the user
    try{
    const email = null;
    email = jwt.verify(authToken, JWT_SECRET,{});

    if(!email){
        return res.status(400).json({success: false, error: "Invalid authToken" });
      }
    
    return res.status(200).json({success: true })
    }
    catch(error){
      console.log(error.message)
      return res.status(400).json({success: false, error: "Invalid authToken"});
    }
})

module.exports = router;