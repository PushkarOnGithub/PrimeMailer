const express = require('express');
const router = express.Router();
const {google} = require('googleapis');
const Creds = require('../models/Creds')

const jwt = require('jsonwebtoken');
const JWT_SECRET = "helloU$er";

let oauth2Client = require('./oauth2Client.js')

let tokens = null;
const scopes = [
  'https://mail.google.com/',
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile'
];

// const url = oauth2Client.generateAuthUrl({
// access_type: 'offline',
// scope: scopes
// });
// console.log(url)

const getUserProfile = async(tokens) => {
  try {
    // console.log(tokens)
    oauth2Client.setCredentials({
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token
    });
    // console.log("done2")
    const response = await google.oauth2('v2').userinfo.get({ auth: oauth2Client });
    const profile = response.data;
    // email = profile.email;
    // console.log("done3")
    // console.log(email);
    // console.log('User Profile:', profile);
    return profile;
  } catch (error) {
    console.error('Error retrieving user profile:', error.message);
    return false;
  }
}

// Save Credentials
const saveCreds = async(userInfo) => {
  try{
    console.log(userInfo.email)
    let userExists = await Creds.findOne({email: userInfo.email});
    console.log(userExists)
    if(userExists){
      console.log('user exists')
      const saved = await Creds.findOneAndUpdate({email: userInfo.email}, {
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        date: tokens.expiry_date
      });
      console.log("creds updated")
      return saved;
    }
    else{
      console.log('user dont exist')
      let creds = new Creds({
        email: userInfo.email,
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        date: tokens.expiry_date
      })
      const saved = await creds.save();
      console.log("creds created and saved", saved)
      return saved;
    }
  return saved;
}
  catch(error){
    console.log("cannot save creds", error.message);
    return false
  }
  
}

router.get('/', async(req, res) => {
  const code = req.query.code;
  // const scope = req.query.scope;
  tokens = (await oauth2Client.getToken(code)).tokens
  // console.log(tokens);
  let userInfo = await getUserProfile(tokens);
  console.log("userInfo : ", userInfo)
  if(!userInfo){
    res.redirect(400, 'http://127.0.0.1:5000/signup')
    console.log('error in getting userInfo')
    return
  }
  // console.log(tokens)
  // await oauth2Client.revokeToken(tokens.access_token)
  let saved = await saveCreds(userInfo);
  console.log("saved Creds", saved);

  if(saved){
    const authToken= jwt.sign(userInfo.email, JWT_SECRET);
    res.redirect(301, `http://127.0.0.1:5000/api/auth/signup/withgoogle/${authToken}`)}
    else{
      res.redirect(400, 'http://127.0.0.1:5000/api/auth/signup')
      console.error('error in saving creds')
  }
})

  module.exports = router;

const exampleTokens = {
  access_token: 'ya29.a0AbVbY6MdaccoZcisISOxoc-ILI5ggagQBbKIkYdgGL3SAfhuBvx1JYWQINyIzssCvCn2IlQvMk3m0yAps0EMxhbGrN2oWE1yr7wdGAUMfnx-CtLpArYDd_emxAnQeVKq4cJ59Bmeyrm027CoMjySKIbiFlslaCgYKAUASARMSFQFWKvPlrFLbYOaqs5J3l5-L8FEgdQ0163',
  refresh_token: '1//0gMld8n4JtQbkCgYIARAAGBASNwF-L9IrybNcovHIqDheldaWUbWbiGj7XW2zn80yPzr2kEbyuuYh3n0q-cmF_LpHRozrEC4zbK4',
  scope: 'https://mail.google.com/ openid https://www.googleapis.com/auth/userinfo.email',
  token_type: 'Bearer',
  id_token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6Ijk5YmNiMDY5MzQwYTNmMTQ3NDYyNzk0ZGZlZmE3NWU3OTk2MTM2MzQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI0NDI0MzIyMDc5LWVqbTZzNTUwaG01cjc2djFzaHNrdHBhZzJmcmlyNTJmLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNDQyNDMyMjA3OS1lam02czU1MGhtNXI3NnYxc2hza3RwYWcyZnJpcjUyZi5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjEwNDg5MTM5MjgwNzI0ODk1OTI0MyIsImVtYWlsIjoicHVzaGthcm51bGw5OTlAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJURzIya09lZDBZd3NTRDF6Q0ZHS0RRIiwiaWF0IjoxNjg4Mjc1OTMxLCJleHAiOjE2ODgyNzk1MzF9.GT_yOoFDXTqV4MncR8f5PUJKmkpv6B-r0z9rF3-UNWQGrXbh-tr3OC8yoIefxUZ3-0HkZNJoacn4ShUAVZ9aCbSsU6qyHwUCIWYeDfoaipVSm9MlLkXLZo1LP8TEhGteXcW4uDX_5GiAZd7kPI6UXcWuq9cVMBHysrVPzjh0iiOaoOkS_zzKlPwgNxi-gWpt_PDp0zPt4g8CTza0wNTwxMAWbGGXcCmjVkgYLgJQujOFDLgTAgCae_JlXlibMSLtf0pN-_NYvDDARUwzr-HJK3QmQxNHQdwxQD7_wdqvKmK4DepmLZGrC03WbHX57XZNCFnqqioym7fI6zWNk_G7gA',
  expiry_date: 1688279529700
}