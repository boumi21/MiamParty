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
}),


router.post("/getAll", function (req, res) {
  party.getParties(req, function callback(err, result) {
    if (err != null) {
      res.send({
        error: err
      })
    }
    else {
      res.send(result.data)
    }
  })
}),


router.post("/getType", function (req, res) {
  party.getPartyType(req, function callback(err, result) {
    if (err != null) {
      res.send({
        error: err
      })
    }
    else {
      res.send(result)
    }
  })
}),


router.post("/getPro", function (req, res) {
  party.getPartyPro(req, function callback(err, result) {
    if (err != null) {
      res.send({
        error: err
      })
    }
    else {
      res.send(result)
    }
  })
}),


router.post("/getPart", function (req, res) {
  party.getPartyPart(req, function callback(err, result) {
    if (err != null) {
      res.send({
        error: err
      })
    }
    else {
      res.send(result)
    }
  })
}),


router.post("/book", function (req, res) {
  party.bookParty(req, function callback(err, result) {
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