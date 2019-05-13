const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
const moment = require("moment");

const fs = require("fs");

const port = 8080;

app.use(bodyParser.json());
app.use(cors());

let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Naveena@may20",
  database: "addressbook"
});

connection.connect(function(err) {
  if (err) {
    return console.error("error: " + err.message);
  }
  console.log("Connected to the MySQL server.");
});

// --- API which will handle uploaded CSV File
app.post("/csv", async (req, res) => {
  let { file } = request;

  //   check if file is being uploaded or not
  if (!file) {
    return res.status(400).json({ message: "You did not upload the csv file" });
  }

  // get the header and data from the uploaded csv file
  let csvData = await csvReader(file);

  // --- Read the filename
  var filename = file.filename;

  // --- Create a table based on the Filename + random number
  await createTable(filename, csvData.headers);

  // insert csv data to table
  await insertCSVDataToTable(filename, csvData.headers, csvData.data);

  let tableData = await returnTableData(filename);

  // --- create json response
  // --- return the json to front end
  res.json({ message: "All is well", tableData });
});

// --- Read the CSV File to extract rows
// --- Get the Header and Data
const csvReader = async csvFile => {
  const returnData = {
    error: true,
    message: "",
    data: null,
    headers: null
  };

  await fs
    .createReadStream(filePath)
    .pipe(csv())
    .on("headers", headers => {
      // console.log(`First header: ${headers[0]}`)
      returnData.headers = headers;
    })
    .on("data", row => {
      console.log(row);
      returnData.data.push(row);
    });

  return returnData;
};

// --- Read all rows from the table
const returnTableData = async tableName => {
  const returnData = {
    error: true,
    message: "",
    data: null
  };

  // TODO

  return returnData;
};

app.listen(port, () => {
  console.log("Server running on port", port);
});
