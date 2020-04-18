const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "miampartytest",
});
 
connection.connect(function (err) {
  if (err) {
    throw err;
  } else {
    console.log("info", "Connected to MySQL DB");
  }
});

module.exports = {
  mysql,
  connection
};

// connection.query('SELECT DESCRIPTION from account_type WHERE ID_ACCOUNT_TYPE = 1', function(err, rows, fields) {
//   if (err) throw err;
//   console.log('The solution is: ', rows[0]);
// });

//connection.end();
