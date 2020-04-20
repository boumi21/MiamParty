const database = require("../database/Database.js")

const mysql = database.mysql;
const connection = database.connection;

function getCookingLevels(callback) {
    console.log("je passe pour envoie requete")
    let getCookingLevels = 'SELECT * ' +
                           'FROM cooking_level'
    connection.query(getCookingLevels, function (err, result, fields) {
    if (err) {
        callback(err.sqlMessage, null)
    }
    else {
        callback(null, result)
        }
    })
}

module.exports = {
    getCookingLevels
}