const express = require("express");
const party = require("../dao/Party.js");
const router = express.Router();

router.post("/create", function (req, res) {
  party.createParty(req, function callback(err, result) {
    if (err != null) {
      res.send({
        error: err,
      });
    } else {
      res.send(result);
    }
  });
}),
  router.post("/getAll", function (req, res) {
    party.getParties(req, function callback(err, result) {
      if (err != null) {
        res.send({
          error: err,
        });
      } else {
        res.send(result.data);
      }
    });
  }),
  router.post("/getType", function (req, res) {
    party.getPartyType(req, function callback(err, result) {
      if (err != null) {
        res.send({
          error: err,
        });
      } else {
        res.send(result);
      }
    });
  }),
  router.post("/getPro", function (req, res) {
    party.getPartyPro(req, function callback(err, result) {
      if (err != null) {
        res.send({
          error: err,
        });
      } else {
        res.send(result);
      }
    });
  }),
  router.post("/getPart", function (req, res) {
    party.getPartyPart(req, function callback(err, result) {
      if (err != null) {
        res.send({
          error: err,
        });
      } else {
        res.send(result);
      }
    });
  }),
  router.post("/book", function (req, res) {
    party.bookParty(req, function callback(err, result) {
      if (err != null) {
        res.send({
          error: err,
        });
      } else {
        res.send(result);
      }
    });
  });

router.post("/getPartiesInc", function (req, res) {
  party.getPartiesInc(req, function callback(err, result) {
    if (err != null) {
      res.send({
        error: err,
      });
    } else {
      res.send(result);
    }
  });
});

router.post("/deleteParty", function (req, res) {
  party.deleteParty(req, function callback(err, result) {
    if (err != null) {
      res.send({
        error: err,
      });
    } else {
      res.send(result);
    }
  });
});

router.post("/getPartiesOwn", function (req, res) {
  party.getPartiesOwn(req, function callback(err, result) {
    if (err != null) {
      res.send({
        error: err,
      });
    } else {
      res.send(result);
    }
  });
});

router.post("/cancelParty", function (req, res) {
  party.cancelParty(req, function callback(err, result) {
    if (err != null) {
      res.send({
        error: err,
      });
    } else {
      res.send(result);
    }
  });
});

router.post("/getPartiesEnd", function (req, res) {
  party.getPartiesEnd(req, function callback(err, result) {
    if (err != null) {
      res.send({
        error: err,
      });
    } else {
      res.send(result);
    }
  });
});

router.post("/setPartyMark", function (req, res) {
  party.setPartyMark(req, function callback(err, result) {
    if (err != null) {
      res.send({
        error: err,
      });
    } else {
      res.send(result);
    }
  });
});

router.post("/getUserMark", function (req, res) {
  party.getUserMark(req, function callback(err, result) {
    if (err != null) {
      res.send({
        error: err,
      });
    } else {
      res.send(result);
    }
  });
});

router.post("/getCountParties", function (req, res) {
  party.getCountParties(req, function callback(err, result) {
    if (err != null) {
      res.send({
        error: err,
      });
    } else {
      res.send(result);
    }
  });
});

router.post("/getReview", function (req, res) {
  party.getReview(req, function callback(err, result) {
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
