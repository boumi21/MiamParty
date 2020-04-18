const database = require("../database/Database.js");
const mysql = database.mysql;
const connection = database.connection;
const password = require("../assistant/Password.js");

function signIn(loginInfo, callback) {
    var checkLogin = 'SELECT ' +
                     '* ' +
                     'FROM ' +
                     'account ' +
                     'WHERE ' +
                     'account.username = ' + mysql.escape(loginInfo.body.login)
                     'OR ' +
                     'account.email = ' + mysql.escape(loginInfo.body.login);

    console.log(checkLogin);
    connection.query(checkLogin, function (err, result, fields) {
        if (err) {
            console.log(err);
            callback(err, null);
        }
        else {
            console.log(result);
            if (result.length == 0 ) {
                console.log("User not found");
                callback(Error("User not found"), null);
            }
            else if (password.hashString(loginInfo.body.password + result[0].SALT) != result[0].PASSWORD) {
                console.log("Incorrect password")
                callback(Error("Incorrect password"), null);
            }
            else {
                callback(null, {
                    client: result[0]
                });
            }
        }
       
    });
}

module.exports = {
    signIn
}
