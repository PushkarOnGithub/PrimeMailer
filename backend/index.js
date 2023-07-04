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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
