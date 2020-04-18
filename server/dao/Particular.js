var database = require("../database/Database.js");
var password = require("./Password.js");

exports.signUp = function (registrationInfo) {
  var salt = Password.getSalt(64);
  var password = Password.hashPassword(salt + registrationInfo.password);

  var getAccountType =
    "SELECT * FROM" +
    "account_type" +
    " WHERE" +
    ' account_type.description = "Particular"';

  var result = Database.sendRequest(getAccountType);
  var accountType = result[0].account_type;

  var insertParticular =
    "INSERT INTO Account SET" +
    " id_account_type = " +
    accountType +
    ", username = " +
    registrationInfo.username +
    ", password = " +
    password +
    ", salt = " +
    salt +
    ", email = " +
    registrationInfo.email +
    ", creation_date = NOW()" +
    ", last_access = NOW()";

  database.query(insertParticular);
};

exports.test = function (newTask, result) {
  database.query("INSERT INTO tasks set ?", newTask, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};
