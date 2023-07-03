const {google} = require('googleapis');
const client_secret = require('./client_secret.json')

const oauth2Client = new google.auth.OAuth2(
    client_secret.web.client_id,
    client_secret.web.client_secret,
    client_secret.web.redirect_uris,
  );

module.exports = oauth2Client;