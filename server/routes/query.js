const express = require("express")
const query = require("../dao/Query.js")
const router = express.Router();



/* GET home page. */
router.post("/getCookingLevels", function () {
    console.log("je passe par le router")
    query.getCookingLevels(req, function callback(err, result) {
      if (err != null) {
        res.send({
          error: err
        })
      }
      else {
        console.log(result)
        res.send(result)
      }
    })
})
  
  
module.exports = router;