const { stringify } = require("csv-stringify");
const { parse } = require("csv-parse");
const fs = require("fs");

fs.createReadStream("C:\\Users\\pushk\\Projects\\PrimeMailer\\sata.csv")
  .pipe(parse({ delimiter: ",", from_line: 1 }))
  .pipe(
    stringify({
      header: true,
      columns: {
        year: "birthYear",
      },
    },
    function(err, data){
      console.log(data)
    })
  )