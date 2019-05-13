// --- Create a table based on the Filename + random number
const createTableSQL = async (tableName, headers) => {
  //TODO: Create table based on tableName and Headers
  const returnData = {
    error: true,
    message: "",
    data: null
  };

  if (!tableName || !headers) {
    return {
      ...returnData,
      message: "Tablename or table headers not found/incorrect"
    };
  }

  // var sql = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";
  let sql = `CREATE TABLE ${tableName} (`;
  let headersSQL = headers.map(header => `${header} VARCHAR(255)`);

  headersSQL = headersSQL.join(",");

  sql = `${sql} ${headersSQL})`;

  returnData.data = sql;

  return returnData;
};

let createTable = async (conn, tableSQL) => {
  conn.query(tableSQL, (err, result) => {
    if (err) throw err;
    console.log("Table created");
  });
};

let deleteTable = async (conn, tableName) => {
  await conn.query(`DROP TABLE IF EXISTS ${tableName}`, (err, result) => {
    if (err) throw err;
    console.log("Table deleted");
  });
};

const insertRowSQL = (tableName, headers, rows) => {
  const returnData = {
    error: true,
    message: "",
    data: null
  };
  let rowsArr = rows.map(row => `${row}`);
  let insertingRowSQL = `INSERT INTO ${tableName} (${headers.join(
    ","
  )}) values(${rowsArr.join(",")}) `;

  if (!tableName || !headers || !rowsArr) {
    return {
      ...returnData,
      message: "Tablename or table headers or Table Data not found/incorrect"
    };
  }

  insertingRowSQL = `${insertingRowSQL})`;

  returnData.data = insertingRowSQL;

  return returnData;
};

// --- Loop through extracted rows
// ----- Insert the row in the table which was created dynamically
const insertCSVDataToTable = async (tableName, headers, csvData) => {
  //TODO
  conn.query(csvData, (err, result) => {
    if (err) throw err;
    console.log("Row Inserted");
  });
};

module.exports = {
  createTableSQL,
  createTable,
  deleteTable,
  insertRowSQL
};
