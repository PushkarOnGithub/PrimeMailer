//***  Read a csv file from the disk ***//

// const fs = require("fs");
// const { parse } = require("csv-parse");
// fs.createReadStream("C:\\Users\\pushk\\Projects\\PrimeMailer\\sata.csv")
//   .pipe(parse({ delimiter: ",", from_line: 1 }))
//   .on("data", function (row) {
//     console.log(row[0]);
//   })
//   .on("error", function (error) {
//     console.log(error.message);
//   })
//   .on("end", function () {
//     console.log("finished");
//   });



// *** child-process module to execute a python subprocess
1
// const { spawn } = require('child_process');
// const child = spawn('python', ["C:\\Users\\pushk\\Projects\\PrimeMailer\\demo.py"], { shell: true });
// child.stdout.on('data', (data) => {
// 	console.log(`stdout: ${data}`);
// });

// child.stderr.on('data', (data) => {
// 	console.error(`stderr: ${data}`);
// });

// child.on('close', (code) => {
// 	console.log(`child process exited with code ${code}`);
// });
// const { PythonShell } = require('python-shell');

// let options = {
//   mode: 'text',
// pythonPath: 'python\path' //where python is installed,
//   pythonOptions: ['-u'], // get print results in real-time
// args: ['value1', 'value2', 'value3']
// };



// *** Using python-shell module to simplify ***
1
// PythonShell.run('C:\\Users\\pushk\\Projects\\PrimeMailer\\demo.py', options, function (err, results) {
//   if (err) throw err;
//   // results is an array consisting of messages collected during execution
//   console.log(results);
// });

2
// const { PythonShell } = require("python-shell");
// let pyshell = new PythonShell(
//   "C:\\Users\\pushk\\Projects\\PrimeMailer\\demo.py" , { mode: 'text', pythonOptions: ['-u']}
// );
// pyshell.on("message", function (message) {
//   // received a message sent from the Python script (a simple "print" statement)
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
//       // {
//       //   header: true,
//       //   columns: {
//       //     email: "email",
//       //   },
//       // },
//       function (err, data) {
//         emails.push(data);
//       }
//     )
//   );
// // .pipe(process.stdout);
// setTimeout(() => {
//   let objJsonStr = JSON.stringify(emails);
//   pyshell.send(objJsonStr)
//   console.log(objJsonStr)
// }, 1000);
