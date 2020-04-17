var express = require("express");
var router = express.Router();
var particular = require("../dao/Particular");

/* GET users listing. */
router.post("/login", function (req, res) {
  //vérifier champs formulaire, vérifier que l'utilisateur n'existe pas
  //if(req.body.password && req.body.email)
  console.log(req.body);
  res.send("respond with a resource");
});

/* GET users listing. */
router.post("/register", function (req, res) {
  console.log(req.body);
  res.send("respond with a resource");
});

module.exports = router;
