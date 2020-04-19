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
                     'account.username = ' + mysql.escape(loginInfo.body.login) +
                     'OR ' +
                     'account.email = ' + mysql.escape(loginInfo.body.login);

    connection.query(checkLogin, function (err, result, fields) {
        if (err) {
            callback(err.toString(), null);
        }
        else {
            if (result.length == 0 ) {
                callback("Votre identifiant ou mot de passe est incorrect.", null);
            }
            else if (password.hashString(loginInfo.body.password + result[0].SALT) != result[0].PASSWORD) {
                callback("Votre identifiant ou mot de passe est incorrect", null);
            }
            else {
                callback(null, {
                    user: result[0]
                });
            }
        }
       
    });
}

module.exports = {
    signIn
}
