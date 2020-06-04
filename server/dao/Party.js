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
  let account = req.body.account;
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
    'SELECT * FROM ( '+
      'SELECT p.*,(p.nb_guests - IFNULL(sum(r.nb_places),0)) as "guests_left", DATE_FORMAT(p.party_date, "%d/%m/%Y") as "date", pa.firstname FROM party p inner join account a on p.id_account = a.id_account left outer join reservation r on p.id_party = r.id_party inner join particular pa on a.id_account = pa.id_account WHERE p.id_status = 1 AND p.party_date >= CURDATE() ' +
       'group by p.id_party '+
       'UNION '+
       'SELECT p.*,(p.nb_guests - IFNULL(sum(r.nb_places),0)) as "guests_left", DATE_FORMAT(p.party_date, "%d/%m/%Y") as "date", pr.name FROM party p inner join account a on p.id_account = a.id_account left outer join reservation r on p.id_party = r.id_party inner join professional pr on a.id_account = pr.id_account WHERE p.id_status = 1 AND p.party_date >= CURDATE() '+
       'group by p.id_party '+
       ') z '+
       'WHERE 1 '+
       'and z.guests_left > 0 ' +
       'and z.id_account <> ' + account + ' ' +
       'and '+ account +' not in (select r.id_account from reservation r where r.id_party = z.id_party) ' +
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


function getPartyType(req, callback) {
  let getPartyType =
  'SELECT isPartyPro from party where id_party = ' + req.body.partyId
  console.log(getPartyType)
    connection.query(getPartyType, function (err, result) {
      if (err) {
        console.log("je suis une erreur");
        console.log(err);
        callback(err.sqlMessage, null);
      } else {
        callback(null, result);
      }
    });
}


function getPartyPro(req, callback) {
  let getParty =
  'SELECT p.*, DATE_FORMAT(p.party_date, "%d/%m/%Y") as "date", pr.name as "owner", (p.nb_guests - IFNULL(sum(r.nb_places),0)) as "guests_left" FROM party p inner join account a on p.id_account = a.id_account left outer join reservation r on p.id_party = r.id_party inner join professional pr on a.id_account = pr.id_account WHERE p.id_party = ' + req.body.partyId

    connection.query(getParty, function (err, result) {
      if (err) {
        console.log("je suis une erreur");
        console.log(err);
        callback(err.sqlMessage, null);
      } else {
        callback(null, result);
      }
    });
}


function getPartyPart(req, callback) {
  let getParty =
    'SELECT p.*, DATE_FORMAT(p.party_date, "%d/%m/%Y") as "date", pa.firstname as "owner", (p.nb_guests - IFNULL(sum(r.nb_places),0)) as "guests_left" FROM party p inner join account a on p.id_account = a.id_account  left outer join reservation r on p.id_party = r.id_party inner join particular pa on a.id_account = pa.id_account WHERE p.id_party = ' + req.body.partyId

    connection.query(getParty, function (err, result) {
      if (err) {
        console.log("je suis une erreur");
        console.log(err);
        callback(err.sqlMessage, null);
      } else {
        callback(null, result);
      }
    });
}


function bookParty(req, callback) {
  let bookParty =
    'insert into reservation values (' + req.body.account + ',' + req.body.party + ',' + req.body.places + ')'

    connection.query(bookParty, function (err, result) {
      if (err) {
        console.log("je suis une erreur");
        console.log(err);
        callback(err.sqlMessage, null);
      } else {
        callback(null, {result: 'success'});
      }
    });
}

function getPartiesInc(req, callback) {
  let getPartyInc = 
  'SELECT * FROM party ' +
  'WHERE party.id_party IN ' +
  '(SELECT reservation.id_party FROM reservation ' +
  'WHERE reservation.id_account = ' + mysql.escape(req.body.id_account) + ') ' +
  'AND party.id_status != 3 ' +
  'AND party.party_date > SYSDATE()'
  console.log("req getPartiesInc:")
  console.log(getPartyInc)
  connection.query(getPartyInc, function(err, result) {
    if (err) {
      console.log(err);
      callback(err.sqlMessage, null);
    }
    else {
      console.log(result)
      callback(null, result)
    }
  })
}

function cancelParty(req, callback) {
  let cancelParty = 
  'DELETE FROM reservation ' +
  'WHERE reservation.id_party = ' + mysql.escape(req.body.id_party) + ' ' +
  'AND reservation.id_account = ' + mysql.escape(req.body.id_account)
  console.log("req cancelParty")
  console.log(cancelParty)
  connection.query(cancelParty, function(err, result) {
    if (err) {
      console.log(err);
      callback(err.sqlMessage, null);
    }
    else {
      console.log(result)
      callback(null, result)
    }
  })
}

function getPartiesOwn(req, callback) {
  let getPartiesOwn = 
  'SELECT * FROM party ' +
  'WHERE party.id_account = ' + mysql.escape(req.body.id_account) + ' ' +
  'AND party.id_status != 3 ' +
  'AND party.party_date > SYSDATE()'
  console.log("req getPartiesOwn:")
  console.log(getPartiesOwn)
  connection.query(getPartiesOwn, function(err, result) {
    if (err) {
      console.log(err);
      callback(err.sqlMessage, null);
    }
    else {
      console.log(result)
      callback(null, result)
    }
  })
}

function deleteParty(req, callback) {
  let deleteParty = 
  'UPDATE party SET id_status = 3 ' +
  'WHERE party.id_party = ' + mysql.escape(req.body.id_party)
  console.log("req deleteParty")
  console.log(deleteParty)
  connection.query(deleteParty, function(err, result) {
    if (err) {
      console.log(err);
      callback(err.sqlMessage, null);
    }
    else {
      console.log(result)
      callback(null, result)
    }
  })
}

function getPartiesEnd(req, callback) {
  let getPartyInc = 
  'SELECT * FROM party ' +
  'WHERE party.id_party IN ' +
  '(SELECT reservation.id_party FROM reservation ' +
  'WHERE reservation.id_account = ' + mysql.escape(req.body.id_account) + ') ' +
  'AND party.id_status != 3 ' +
  'AND party.party_date <= SYSDATE()'
  console.log("req getPartiesInc:")
  console.log(getPartyInc)
  connection.query(getPartyInc, function(err, result) {
    if (err) {
      console.log(err);
      callback(err.sqlMessage, null);
    }
    else {
      console.log(result)
      callback(null, result)
    }
  })
}

function setPartyMark(req, callback) {
  let setPartyMark =
  'INSERT INTO mark ' +
  '(id_account, id_party, mark, description) VALUES ?'
  let value = [[req.body.id_account, req.body.id_party, req.body.mark, req.body.description ]]

  connection.query(setPartyMark, [value], function (err, result) {
    if (err) {
      console.log(err);
      callback(err.sqlMessage, null);
    }
    else {
      console.log(result)
      callback(null, result)
    }
  })
}

function getUserMark(req, callback) {
  let getUserMark =
  'SELECT * FROM mark ' +
  'WHERE mark.id_account = ' + mysql.escape(req.body.id_account) + ' ' +
  'AND mark.id_party = ' + mysql.escape(req.body.id_party)
  console.log("req getusermark:")
  console.log(getUserMark)
  connection.query(getUserMark, function (err, result) {
    if (err) {
      console.log(err);
      callback(err.sqlMessage, null);
    }
    else {
      console.log("getUserMark result:")
      console.log(result)
      callback(null, result)
    }
  })
}


function getCountParties(req, callback){

  let countParties = null

  if(req.body.isPart){
    countParties =
    'SELECT COUNT(*) as "count" FROM ' +
    '( SELECT * FROM party ' +
    'WHERE party.id_party IN ' +
    '(SELECT reservation.id_party FROM reservation ' +
    'WHERE reservation.id_account = ' + mysql.escape(req.body.id_account) + ') ' +
    'AND party.id_status != 3 ' +
    'AND party.party_date > SYSDATE() ) as subquery'   
  } else {
    countParties =
    'SELECT COUNT(*) as "count" FROM ' +
    '( SELECT * FROM party ' +
    'WHERE party.id_account = ' + mysql.escape(req.body.id_account) + ' ' +
    'AND party.id_status != 3 ' +
    'AND party.party_date > SYSDATE() ) as subquery'
  }

  connection.query(countParties, function(err, result) {
    if (err) {
      console.log(err);
      callback(err.sqlMessage, null);
    }
    else {
      callback(null, result)
    }
  })
}

module.exports = {
  createParty,
  getParties,
  getPartyType,
  getPartyPro,
  getPartyPart,
  bookParty,
  getPartiesInc,
  deleteParty,
  getPartiesOwn,
  cancelParty,
  getPartiesEnd,
  setPartyMark,
  getUserMark,
  getCountParties
};
