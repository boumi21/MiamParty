const express = require("express");
const part = require("../dao/Part.js");
const router = express.Router();

/* GET home page. */
router.post("/getCookingLevels", function (req, res) {
  part.getCookingLevels(req, function callback(err, result) {
    if (err != null) {
      res.send({
        error: err,
      });
    } else {
      res.send(result);
    }
  });
});

module.exports = router;
