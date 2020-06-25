const database = require("../database/Database.js");

const mysql = database.mysql;
const connection = database.connection;

// Récupère les niveaux de cuisine disponibles
function getCookingLevels(req, callback) {
  let getCookingLevels = "SELECT * " + "FROM cooking_level";
  connection.query(getCookingLevels, function (err, result, fields) {
    if (err) {
      console.log(err);
      callback(err.sqlMessage, null);
    } else {
      cookingLevels = [
        { text: "Sélectionnez un niveau de cuisine", value: null },
      ];

      for (var i = 0; i < result.length; i++) {
        var obj = new Object();
        obj.text = result[i].description;
        obj.value = result[i].id_cooking_level;
        cookingLevels.push(obj);
      }

      callback(null, JSON.stringify(cookingLevels));
    }
  });
}

module.exports = {
  getCookingLevels,
};
