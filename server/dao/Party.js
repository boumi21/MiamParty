const database = require("../database/Database.js");

const mysql = database.mysql;
const connection = database.connection;

function createParty(req, callback) {
  let party = req.body;
  console.log("bijour : " + req.body.isPartyPro);
  let insertIntoParty =
    "insert into party values (null, " +
    party.idAccount +
    ', 1, "' +
    party.name +
    '", "' +
    party.date +
    " " +
    party.time +
    '", ' +
    party.price +
    ", " +
    party.nbAddress +
    ', "' +
    party.street +
    '", "' +
    party.city +
    '", "' +
    party.postCode +
    '", "' +
    party.country +
    '", ' +
    party.guest +
    ', "' +
    party.dataImage +
    '", "' +
    party.description +
    '", ' +
    party.isPartyPro +
    ")";
  connection.query(insertIntoParty, function (err, result, fields) {
    if (err) {
      console.log("je suis une erreur");
      console.log(err);
      callback(err.sqlMessage, null);
    } else {
      callback(null, { hey: "gg" });
    }
  });
}

function getParties(req, callback) {
  let filterStatus = "";
  if (req.body.isPartyPro == 1) {
    filterStatus = "and z.isPartyPro = 1 ";
  } else if (req.body.isPartyPro == 0) {
    filterStatus = "and z.isPartyPro = 0 ";
  }

  let filterPrice = "";
  filterPrice = " and z.price <= " + req.body.price;

  let filterDate = "";
  if (req.body.date != null && req.body.date !== "") {
    console.log("je suis une date :");
    filterDate1 = ' DATE_FORMAT(party_date, "%Y-%m-%d")';
    filterDate2 = " and '" + req.body.date + "' = ";
    filterDate = filterDate2.concat(filterDate1);
  }

  let getAllParties =
    "SELECT * FROM ( " +
    'SELECT p.*, DATE_FORMAT(p.party_date, "%d/%m/%Y") as "date", pa.firstname FROM party p inner join account a on p.id_account = a.id_account inner join particular pa on a.id_account = pa.id_account WHERE p.id_status = 1 AND p.party_date >= CURDATE() ' +
    "UNION " +
    'SELECT p.*, DATE_FORMAT(p.party_date, "%d/%m/%Y") as "date", pr.name FROM party p inner join account a on p.id_account = a.id_account inner join professional pr on a.id_account = pr.id_account WHERE p.id_status = 1 AND p.party_date >= CURDATE() ' +
    ") z " +
    "WHERE 1 " +
    filterStatus +
    filterPrice +
    filterDate;

  connection.query(getAllParties, function (err, result, fields) {
    if (err) {
      console.log("je suis une erreur");
      console.log(err);
      callback(err.sqlMessage, null);
    } else {
      callback(result);
    }
  });
}

module.exports = {
  createParty,
  getParties,
};
