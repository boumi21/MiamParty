const database = require("../database/Database.js")

const mysql = database.mysql;
const connection = database.connection;


function createParty(req, callback){
    let party = req.body
    console.log("bijour : "+req.body.isPartyPro)
    let insertIntoParty = 'insert into party values (null, '+ party.idAccount +', 1, "'+ party.name +'", "'+ party.date + ' ' + party.time + '", '+ party.price +', '+ party.nbAddress +', "'+ party.street +'", "'+ party.city +'", "'+ party.postCode +'", "'+ party.country +'", '+ party.guest +', "'+ party.dataImage +'", "'+ party.description +'", '+ party.isPartyPro +')'
    connection.query(insertIntoParty, function (err, result, fields) {
    if (err) {
        console.log("je suis une erreur")
        console.log(err)
        callback(err.sqlMessage, null)
    }
    else {
        
        callback(null, {hey: 'gg'})
        }
    })
}


module.exports = {
    createParty
}