const express = require("express")
const party = require("../dao/Party.js")
const router = express.Router();



router.post("/create", function (req, res) {
    party.createParty(req, function callback(err, result) {
      if (err != null) {
        res.send({
          error: err
        })
      }
      else {
        res.send(result)
      }
    })
})
  
  
module.exports = router;