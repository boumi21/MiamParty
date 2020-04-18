const express = require("express");
const router = express.Router();
const account = require("../dao/Account.js");
const regex = require("../assistant/Regex.js")

/* GET users listing. */
router.post("/login", function (req, res) {
  if (!regex.login(req.body.login)) {
    res.send(Error("Invalid login"));
  }
  else if (!regex.password(req.body.password)) {
    res.send("Invalid password");
  }
  else {
    account.signIn(req, function callback(err, result) {
      if (err != null) {
        res.send(err);
      }
      else {
        console.log("Je renvoie le résultat");
        console.log(result);
        res.send(result);
      }
    });
  }
});

/* GET users listing. */
router.post("/register", function (req, res) {
  //vérifier champs formulaire, vérifier que l'utilisateur n'existe pas
  //if(req.body.password && req.body.email)
  console.log(req.body);
  res.send("respond with a resource - register");
});

module.exports = router;
