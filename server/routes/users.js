const express = require("express");
const router = express.Router();
const account = require("../dao/Account");

/* GET users listing. */
router.post("/login", function (req, res) {
  var checkLogin = { 
    email : true,
    password : true
  };
  console.log(checkLogin);
  if (req.body.email == null || req.body.email.length == 0) {
    checkLogin.email = false;
  }
  if (req.body.password == null || req.body.password.length == 0) {
    checkLogin.password = false;
  }
  if (checkLogin.email == false || checkLogin.password == false) {
    res.send("Erreur");
  }
  else {
    account.signIn(req, function callback(err, result) {
      if (err != null) {
        res.send(err);
      }
      else {
        if (result == true) {
          res.send("Client connecté");
        }
        else {
          res.send("Client non connecté");
        }
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
