const express = require('express')
const router = express.Router();

const {google} = require('googleapis');
const client_secret = require('./client_secret.json')
const Creds = require('./models/Creds')
const google_redirect = require('./routes/google_redirect')

let oauth2Client = require('./oauth2Client.js')

const checkAccessTokenValidity = async(oldtokens) => {
    try {
      await oauth2Client.getTokenInfo(oldtokens.access_token);
      console.log('Access token is valid.');
      return true
    } 
    catch {
    console.log('Access token is Invalid.');}
    oauth2Client.setCredentials({
    refresh_token: oldtokens.refresh_token
    });
    await oauth2Client.refreshAccessTokenAsync((err, tokens) => {
    if (err) {
        return false;
    }
    tokens = tokens
    console.log(tokens)
    // module.exports = checkAccessTokenValidity;

    return true
    });
    }

module.exports.check = checkAccessTokenValidity;
module.exports.tokens = tokens;