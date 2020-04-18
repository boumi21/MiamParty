const database = require("../database/Database.js");
const mysql = database.mysql;
const connection = database.connection;
const password = require("./Password.js");

function signIn(loginInfo, callback) {
    var checkEmail = 'SELECT ' +
                     '* ' +
                     'FROM ' +
                     'account ' +
                     'WHERE ' +
                     'account.email = ' + mysql.escape(loginInfo.body.email);

    console.log(checkEmail);
    connection.query(checkEmail, function (err, result, fields) {
        if (err) {
            callback(err, false);
        }
        else {
            if (result.length == 0 ) {
                callback(null, false);
            }
            else if (password.hashPassword(loginInfo.body.password + result[0].SALT) != result[0].PASSWORD) {
                callback(null, false);
            }
            else {
                callback(null, true);
            }
        }
       
    });
}

module.exports = {
    signIn
}
