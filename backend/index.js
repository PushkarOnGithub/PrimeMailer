const connectToMongo = require("./db");
const express = require("express");
var cors = require("cors");

connectToMongo();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

//Available Routes
// app.use("/api/mails", require('./routes/mails.js'))
app.use("/oauth2callback", require("./routes/google_redirect.js"));
app.use("/api/auth/signup", require("./routes/signup.js"));
app.use("/api/auth/login", require("./routes/login.js"));

// app.get('/', (req, res) => {
//   res.send('Hello Pushkar')
// })

// window.open(
//   url, "_blank");

// const { PythonShell } = require("python-shell");
// let pyshell = new PythonShell(
//   "C:\\Users\\pushk\\Projects\\PrimeMailer\\sendtestmail.py" , { mode: 'text', pythonOptions: ['-u']}
// );
// pyshell.on("message", function (message) {
//   console.log(message);
// });
// pyshell.on("stderr", function (stderr){
//   console.log(stderr);
// })
// let emails = [];
// const { stringify } = require("csv-stringify");
// const { parse } = require("csv-parse");
// const fs = require("fs");
// fs.createReadStream("C:\\Users\\pushk\\Projects\\PrimeMailer\\sata.csv")
//   .pipe(parse({ delimiter: ",", from_line: 1 }))
//   .pipe(
//     stringify(
//       function (err, data) {
//         emails.push(data);
//       }
//     )
//   );
// // wait for emails to get added
// setTimeout(() => {
//   let objJsonStr = JSON.stringify(emails);
//   pyshell.send(objJsonStr)
//   console.log(objJsonStr)
// }, 1000);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
