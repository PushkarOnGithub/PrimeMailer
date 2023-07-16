const connectToMongo = require("../db.js");
const Drafts = require("../models/Drafts");
const Creds = require("../models/Creds");
const oauth2Client = require("./oauth2Client.js");
connectToMongo();

let isProcessing = false;

CLIENT_ID = process.env.CLIENT_ID;
CLIENT_SECRET = process.env.CLIENT_SECRET;

// Function to check refresh token
const checkRefreshToken = async (refreshToken) => {
  let response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers:{
      "Content-Type": 'application/json'
    },
    body: JSON.stringify({
      refresh_token: refreshToken,
      grant_type: "refresh_token",
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    }),
  });
  console.log(await response.json());
  if (response.status === 400) {
    isProcessing = false;
    return false;
  } else if (response.status === 200) {
    return true;
  }
  return false;
};

const sendDrafts = async () => {
  isProcessing = true;
  try {
    // get all the documents with status pending and get the newest draft
    const pendingdraft = (await Drafts.find({ status: false }))
      .sort((a, b) => (a.lastVisited > b.lastVisited ? 1 : -1))
      .at(0);

    // if there is no drafts pending
    if (!pendingdraft) {
      isProcessing = false;
      console.log("No drafts in the queue");
      return;
    }

    await Drafts.findOneAndUpdate({email: pendingdraft.email}, {lastVisited: Date.now()}).then(()=>{
      console.log('draft visited');
    })

    // console.log(pendingdraft);
    // if (Date.now() - pendingdraft.lastSent < 86400000) {
    //   isProcessing = false;
    //   return;
    // }


    // get all the values from the pendingdraft
    const email = await pendingdraft.email;
    const html = await pendingdraft.html;
    const emailsBufferString = await pendingdraft.csv;
    const emailsBuffer = Buffer.from(emailsBufferString, "base64");
    const emails = atob(emailsBuffer.toString("base64"));
    const totalLength = pendingdraft.totalLength;
    const currentIndex = pendingdraft.currentIndex;


    // get the credentials of the user using email
    const creds = await Creds.findOne({ email: email });
    if (!creds) {
      isProcessing = false;
      console.log("user has been removed due to invalid refresh token");
      return;
    }
    // console.log(creds)
    const refreshToken = creds.refresh_token;

    // let accessToken = creds.access_token;
    //   // check if the token has expired?
    //   const tokenInfo = await fetch(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`);
    //   // console.log(tokenInfo);
    //   const refresh_access_token = async() =>{
    //     // If the access token is not valid or has expired, get new token
    //     if (tokenInfo.status === 400) {
    //       // Refresh the access token
    //     oauth2Client.setCredentials({refresh_token: refreshToken});
    //     const refreshedTokenResponse = await oauth2Client.refreshAccessToken();

    //     // Update the refresh token in the DB and update access token
    //     const newAccessToken = refreshedTokenResponse.credentials.access_token;
    //     await Creds.findOneAndUpdate({email: email}, {access_token: newAccessToken});
    //     return newAccessToken;
    //   }else{
    //     return accessToken;
    //   }
    // }
    // accessToken = await refresh_access_token();

    // check refreshToken Validity

    if (!(await checkRefreshToken(refreshToken))) {
      isProcessing = false;
      await Creds.findOneAndRemove({ email: email }).then(() => {
        console.log("Invalid Refresh Token");
      });
      return;
    }
    // call the python script to send the messages

    const { PythonShell } = require("python-shell");
    let pyshell = new PythonShell(process.env.SEND_MAILS_ROUTE,
      { mode: "text", pythonOptions: ["-u"] }
    );

    // send OTP generated and email to python script and wait for response from the script
    // console.log(typeof(emails));
    pyshell.send(JSON.stringify({ refreshToken, email, html, emails, totalLength, currentIndex }));

    pyshell.on("message", async(message) => {
      if (message === "DONE") {
        isProcessing = false;
        await Drafts.findOneAndUpdate({email: email}, {lastSent: Date.now(), currentIndex: (totalLength<450 ? totalLength+1: currentIndex + 450), status: (currentIndex+450>totalLength+1?true:false)});
        return;
      }

      console.log("Python Message : ", message);
    });
    pyshell.on("stderr", (stderr) => {
      console.log("Python Error : ", stderr);
      isProcessing = false;
    });
    pyshell.on("close", (code) => {
      isProcessing = false;
      console.log("Python file executed with code ", code);
    });

    // if there is some error in python script
  } catch (error) {
    console.log("error in the send_drafts script : ", error.message);
    isProcessing = false;
  }
};

// call the function it is not running
setInterval(() => {
  console.log(isProcessing);
  if (!isProcessing) {
    console.log("processing");
    sendDrafts();
  }
}, 10 * 1000);
