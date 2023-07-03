import { stringify } from 'csv-stringify';
import { generate } from 'csv-generate';

const fs = require("fs");
const { parse } = require("csv-parse");
fs.createReadStream("C:\\Users\\pushk\\Projects\\PrimeMailer\\sata.csv")
  .pipe(stringify({
    header: true,
    columns: {
      year: 'birthYear',
    }
  }))
  .pipe(process.stdout);