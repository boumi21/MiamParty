/*
    Requêtes vers la bdd pour tout ce qui concerne les comptes
*/
const database = require("../database/Database.js");
const password = require("../assistant/Password.js");

const mysql = database.mysql;
const connection = database.connection;

function signIn(loginInfo, callback) {
  let checkEmail =
    "SELECT * " +
    "FROM account " +
    "WHERE account.email = " +
    mysql.escape(loginInfo.body.email);

  connection.query(checkEmail, function (err, result, fields) {
    if (err) {
      console.log(err);
      callback(err.sqlMessage, null);
    } else {
      console.log(result);
      if (result.length == 0) {
        console.log("res=0");
        callback("Votre identifiant ou mot de passe est incorrect.", null);
      } else if (
        password.hashString(loginInfo.body.password + result[0].salt) !=
        result[0].password
      ) {
        console.log("mauvais mdp");
        callback("Votre identifiant ou mot de passe est incorrect.", null);
      } else {
        callback(null, {
          user: result[0],
        });
      }
    }
  });
}

//Récupère les informations de l'utilisateur pour un particulier ou un pro
function getUserInfo(user, callback) {
  let getAccountType =
    "SELECT * " +
    "FROM account_type " +
    "WHERE account_type.id_account_type = " +
    mysql.escape(user.id_account_type);
  console.log(getAccountType);
  connection.query(getAccountType, function (err, result, fields) {
    if (err) {
      callback(err.sqlMessage, null);
    } else {
      console.log(" ");
      console.log(result[0]);
      var userTable;
      switch (result[0].id_account_type) {
        case 1:
          userTable = "particular";
          break;
        case 2:
          userTable = "professional";
          break;
      }
      let getUserInfo =
        "SELECT * " +
        "FROM account " +
        "INNER JOIN account_type ON account.id_account_type = account_type.id_account_type " +
        "INNER JOIN " +
        userTable +
        " ON account.id_account = " +
        userTable +
        ".id_account " +
        "WHERE account.id_account = " +
        user.id_account;

      connection.query(getUserInfo, function (err, result, fields) {
        if (err) {
          console.log(err);
          callback(
            "Erreur dans la récupération des données de l'utilisateur",
            null
          );
        } else {
          console.log(result[0]);
          callback(null, result[0]);
        }
      });
    }
  });
}

// Inscription particulier
function signUpPart(registerInfo, callback) {
  let checkEmail =
    "SELECT * " +
    "FROM account " +
    "WHERE account.email = " +
    mysql.escape(registerInfo.body.email);

  connection.query(checkEmail, function (err, result, fields) {
    if (err) {
      callback(err.sqlMessage, null);
    } else {
      if (result.length != 0) {
        callback("Cette adresse email est déjà utilisée.", null);
      } else {
        let getIdAccountType =
          "SELECT * " +
          "FROM account_type " +
          'WHERE account_type.description = "Particulier"';

        connection.query(getIdAccountType, function (err, result, fields) {
          if (err) {
            callback(err.sqlMessage, null);
          } else {
            console.log(result);
            registerInfo.body.accountType = result[0].id_account_type;
            console.log(registerInfo.body.accountType);
            let salt = password.getSalt(64);
            let pw = password.hashString(registerInfo.body.password + salt);
            let insertAccount =
              "INSERT INTO account " +
              "(id_account_type, email, password, salt) VALUES ?";
            let value = [
              [
                registerInfo.body.accountType,
                registerInfo.body.email,
                pw,
                salt,
              ],
            ];

            connection.query(insertAccount, [value], function (
              err,
              result,
              fields
            ) {
              if (err) {
                console.log(err);
                callback(err.sqlMessage, null);
              } else {
                console.log(registerInfo.body.sex);
                let insertParticular =
                  "INSERT INTO particular " +
                  "(id_account, id_cooking_level, firstname, lastname, birthday, sex) VALUES ?";
                let value = [
                  [
                    result.insertId,
                    registerInfo.body.level,
                    registerInfo.body.firstname,
                    registerInfo.body.lastname,
                    registerInfo.body.birth,
                    registerInfo.body.sex,
                  ],
                ];

                connection.query(insertParticular, [value], function (
                  err,
                  result,
                  fields
                ) {
                  if (err) {
                    console.log(err);
                    callback(err.sqlMessage, null);
                  } else {
                    console.log(result.insertId);
                    callback(null, result);
                  }
                });
              }
            });
          }
        });
      }
    }
  });
}

// Inscription pro
function signUpPro(registerInfo, callback) {
  let checkEmail =
    "SELECT * " +
    "FROM account " +
    "WHERE account.email = " +
    mysql.escape(registerInfo.body.email);

  connection.query(checkEmail, function (err, result, fields) {
    if (err) {
      callback(err.sqlMessage, null);
    } else {
      if (result.length != 0) {
        callback("Cette adresse email est déjà utilisée.", null);
      } else {
        let getIdAccountType =
          "SELECT * " +
          "FROM account_type " +
          'WHERE account_type.description = "Professionnel"';

        connection.query(getIdAccountType, function (err, result, fields) {
          if (err) {
            callback(err.sqlMessage, null);
          } else {
            registerInfo.body.accountType = result[0].id_account_type;
            let salt = password.getSalt(64);
            let pw = password.hashString(registerInfo.body.password + salt);
            let insertAccount =
              "INSERT INTO account " +
              "(id_account_type, email, password, salt) VALUES ?";
            let value = [
              [
                registerInfo.body.accountType,
                registerInfo.body.email,
                pw,
                salt,
              ],
            ];

            connection.query(insertAccount, [value], function (
              err,
              result,
              fields
            ) {
              if (err) {
                callback(err.sqlMessage, null);
              } else {
                let insertProfessional =
                  "INSERT INTO professional " + "(id_account, name) VALUES ?";
                let value = [[result.insertId, registerInfo.body.name]];

                connection.query(insertProfessional, [value], function (
                  err,
                  result,
                  fields
                ) {
                  if (err) {
                    callback(err.sqlMessage, null);
                  } else {
                    callback(null, result);
                  }
                });
              }
            });
          }
        });
      }
    }
  });
}

// Récupération de l'adresse d'un utilisateur
function getUserAddress(req, callback) {
  let userAddress =
    "SELECT  " +
    "nb_address, street, city, postal_code, country " +
    "FROM account " +
    "WHERE account.id_account = " +
    req.body.userId;
  connection.query(userAddress, function (err, result, fields) {
    if (err) {
      console.log(err);
      callback(err.sqlMessage, null);
    } else {
      callback(null, JSON.stringify(result[0]));
    }
  });
}

// Mise à jour des informations pour un particulier
function updatePart(updateInfo, callback) {
  console.log("je suis dans account updatePart");
  console.log(updateInfo.body);
  let checkEmail =
    "SELECT * " +
    "FROM account " +
    "WHERE account.email = " +
    mysql.escape(updateInfo.body.email);

  connection.query(checkEmail, function (err, result, fields) {
    if (err) {
      callback(err.sqlMessage, null);
    } else {
      if (
        result.length != 0 &&
        result[0].id_account != updateInfo.body.accountId
      ) {
        callback("Cette adresse email est déjà utilisée.", null);
      } else if (
        updateInfo.body.actualPassword != null &&
        password.hashString(
          updateInfo.body.actualPassword + updateInfo.body.salt
        ) != updateInfo.body.pwcheck
      ) {
        callback("Le mot de passe actuel est incorrect.", null);
      } else {
        let updateAccount;
        if (updateInfo.body.actualPassword != null) {
          let salt = password.getSalt(64);
          let pw = password.hashString(updateInfo.body.password + salt);
          updateAccount =
            "UPDATE account SET " +
            "email = " +
            mysql.escape(updateInfo.body.email) +
            ", " +
            "password = '" +
            pw +
            "', " +
            "salt = '" +
            salt +
            "', " +
            "nb_address = " +
            mysql.escape(updateInfo.body.nbAddress) +
            ", " +
            "street = " +
            mysql.escape(updateInfo.body.street) +
            ", " +
            "city = " +
            mysql.escape(updateInfo.body.city) +
            ", " +
            "postal_code = " +
            mysql.escape(updateInfo.body.postalCode) +
            ", " +
            "country = " +
            mysql.escape(updateInfo.body.country) +
            " " +
            "WHERE id_account = " +
            mysql.escape(updateInfo.body.accountId);
        } else {
          updateAccount =
            "UPDATE account SET " +
            "email = " +
            mysql.escape(updateInfo.body.email) +
            ", " +
            "nb_address = " +
            mysql.escape(updateInfo.body.nbAddress) +
            ", " +
            "street = " +
            mysql.escape(updateInfo.body.street) +
            ", " +
            "city = " +
            mysql.escape(updateInfo.body.city) +
            ", " +
            "postal_code = " +
            mysql.escape(updateInfo.body.postalCode) +
            ", " +
            "country = " +
            mysql.escape(updateInfo.body.country) +
            " " +
            "WHERE id_account = " +
            mysql.escape(updateInfo.body.accountId);
        }

        connection.query(updateAccount, function (err, result, fields) {
          if (err) {
            console.log(err);
            callback(err.sqlMessage, null);
          } else {
            let updateParticular =
              "UPDATE particular SET " +
              "id_cooking_level = " +
              mysql.escape(updateInfo.body.level) +
              ", " +
              "firstname = " +
              mysql.escape(updateInfo.body.firstname) +
              ", " +
              "lastname = " +
              mysql.escape(updateInfo.body.lastname) +
              ", " +
              "birthday = " +
              mysql.escape(updateInfo.body.birth) +
              ", " +
              "sex = " +
              mysql.escape(updateInfo.body.sex) +
              " " +
              "WHERE id_particular = " +
              mysql.escape(updateInfo.body.particularId);

            connection.query(updateParticular, function (err, result, fields) {
              if (err) {
                console.log(err);
                callback(err.sqlMessage, null);
              } else {
                console.log(result.protocol41);
                callback(null, result);
              }
            });
          }
        });
      }
    }
  });
}

// Mise à jour des informations pour un pro
function updatePro(updateInfo, callback) {
  let checkEmail =
    "SELECT * " +
    "FROM account " +
    "WHERE account.email = " +
    mysql.escape(updateInfo.body.email);

  connection.query(checkEmail, function (err, result, fields) {
    if (err) {
      callback(err.sqlMessage, null);
    } else {
      if (
        result.length != 0 &&
        result[0].id_account != updateInfo.body.accountId
      ) {
        callback("Cette adresse email est déjà utilisée.", null);
      } else if (
        updateInfo.body.actualPassword != null &&
        password.hashString(
          updateInfo.body.actualPassword + updateInfo.body.salt
        ) != updateInfo.body.pwcheck
      ) {
        callback("Le mot de passe actuel est incorrect.", null);
      } else {
        let updateAccount;
        if (updateInfo.body.actualPassword != null) {
          let salt = password.getSalt(64);
          let pw = password.hashString(updateInfo.body.password + salt);
          updateAccount =
            "UPDATE account SET " +
            "email = " +
            mysql.escape(updateInfo.body.email) +
            ", " +
            "password = '" +
            pw +
            "', " +
            "salt = '" +
            salt +
            "', " +
            "nb_address = " +
            mysql.escape(updateInfo.body.nbAddress) +
            ", " +
            "street = " +
            mysql.escape(updateInfo.body.street) +
            ", " +
            "city = " +
            mysql.escape(updateInfo.body.city) +
            ", " +
            "postal_code = " +
            mysql.escape(updateInfo.body.postalCode) +
            ", " +
            "country = " +
            mysql.escape(updateInfo.body.country) +
            " " +
            "WHERE id_account = " +
            mysql.escape(updateInfo.body.accountId);
        } else {
          updateAccount =
            "UPDATE account SET " +
            "email = " +
            mysql.escape(updateInfo.body.email) +
            ", " +
            "nb_address = " +
            mysql.escape(updateInfo.body.nbAddress) +
            ", " +
            "street = " +
            mysql.escape(updateInfo.body.street) +
            ", " +
            "city = " +
            mysql.escape(updateInfo.body.city) +
            ", " +
            "postal_code = " +
            mysql.escape(updateInfo.body.postalCode) +
            ", " +
            "country = " +
            mysql.escape(updateInfo.body.country) +
            " " +
            "WHERE id_account = " +
            mysql.escape(updateInfo.body.accountId);
        }

        connection.query(updateAccount, function (err, result, fields) {
          if (err) {
            console.log(err);
            callback(err.sqlMessage, null);
          } else {
            let updatePro =
              "UPDATE professional SET " +
              "name = " +
              mysql.escape(updateInfo.body.name) +
              " " +
              "WHERE id_professional = " +
              mysql.escape(updateInfo.body.professionalId);

            connection.query(updatePro, function (err, result, fields) {
              if (err) {
                console.log(err);
                callback(err.sqlMessage, null);
              } else {
                console.log(result.protocol41);
                callback(null, result);
              }
            });
          }
        });
      }
    }
  });
}

module.exports = {
  getUserInfo,
  signIn,
  signUpPart,
  signUpPro,
  getUserAddress,
  updatePart,
  updatePro,
};
