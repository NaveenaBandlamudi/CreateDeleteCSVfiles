const helpers = require("./helpers");
const mysql = require("mysql");
const tableName = "someTable";

const getConnection = () => {
  let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Naveena@may20",
    database: "addressbook"
  });

  connection.connect(err => {
    if (err) {
      return console.error("error: " + err.message);
    }
    // console.log("Connected to the MySQL server.");
    return connection;
  });
  return connection;
};

const testCreateTableSQL = () => {
  let sql = helpers.createTableSQL(tableName, [
    "header1",
    "header55",
    "header3",
    "header4",
    "header5",
    "header6",
    "header7"
  ]);

  //   console.log(sql);
  return sql;
};

const testCreateTable = async conn => {
  let sql = await testCreateTableSQL();
  console.log(sql);

  try {
    helpers.createTable(conn, sql.data);
  } catch (error) {
    console.log("Error occured", error);
  }
  return;
};

const testInsertRowSQL = () => {
  console.log("within testInsertRowSQL");
  let sql = helpers.insertRowSQL(
    tableName,
    ["a", "b", "c", "d", "e", "f"],
    ["Naveena", "20", "asdfg", "asdfg", "sdfb", "sdfgb", "kjhgf"]
  );

  console.log(sql);
  // return sql;
};

//testing inserting row
const testInsertRowTable = async conn => {
  let sql = await testInsertRowSQL();
  console.log(sql);

  try {
    helpers.insertCSVDataToTable(conn, row.data);
  } catch (error) {
    console.log("Error occured", error);
  }
  return;
};

const testOperations = () => {
  let conn = getConnection();
  helpers.deleteTable(conn, tableName);
  testCreateTable(conn);
  testInsertRowSQL();
};

testOperations();
