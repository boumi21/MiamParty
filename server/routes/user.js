const express = require("express");
const account = require("../dao/Account.js");
const user = require("../app");

const router = express.Router();
const SECRET = "dummy";

/* GET user listing. */
router.post("/registerPart", function (req, res) {
  account.signUpPart(req, function callback(err, result) {
    if (err != null) {
      res.send({
        error: err,
      });
    } else {
      console.log("Je renvoie le résultat");
      res.send(result);
    }
  });
});

router.post("/registerPro", function (req, res) {
  console.log("je passe ici");
  account.signUpPro(req, function callback(err, result) {
    if (err != null) {
      res.send({
        error: err,
      });
    } else {
      res.send(result);
    }
  });
});

/************************************************************* */

// Refresh tokens
const refreshTokens = {};

// Login avec token et authentification
router.post("/login2", function (req, res) {
  const { login, password } = req.body;
  const expiresIn = 3600;
  const refreshToken =
    Math.floor(Math.random() * (1000000000000000 - 1 + 1)) + 1;

  //On vérifie si les identifiants de connexion de l'utilisateur sont corrects
  account.signIn(req, function callback(err, result) {
    if (err != null) {
      res.send({
        error: err,
      });
    } else {
      // Si les identifiants dont bons, on récupère les données liées à l'utilisateur
      account.getUserInfo(result.user, function callback(err, userInfo) {
        if (err != null) {
          res.send({
            error: err,
          });
        } else {
          var idPart = userInfo.id_account_type;
          var isPart;
          var isPro;

          if (idPart == 1) {
            part = true;
            pro = false;
          } else {
            part = false;
            pro = true;
          }

          // Création du token
          const accessToken = user.jsonwebtoken.sign(
            {
              //All
              id: userInfo.id_account,
              accountType: userInfo.id_account_type,
              description: userInfo.description,
              email: userInfo.email,
              nbAddress: userInfo.nb_address,
              street: userInfo.street,
              city: userInfo.city,
              postCode: userInfo.postal_code,
              country: userInfo.country,
              isPart: part,
              isPro: pro,

              //Part
              idPart: userInfo.id_particular,
              cookingLevel: userInfo.id_cooking_level,
              firstname: userInfo.firstname,
              lastname: userInfo.lastname,
              birthday: userInfo.birthday,
              sex: userInfo.sex,

              //Pro
              idPro: userInfo.id_professional,
              namePro: userInfo.name,
            },
            SECRET,
            {
              expiresIn,
            }
          );

          res.json({
            token: accessToken,
          });
        }
      });
    }
  });
});

router.post("/userAddress", function (req, res) {
  account.getUserAddress(req, function callback(err, result) {
    if (err != null) {
      res.send({
        error: err,
      });
    } else {
      res.send(result);
    }
  });
});

router.post("/getUserInfo", function (req, res) {
  account.getUserInfo(req.body, function callback(err, result) {
    if (err != null) {
      res.send({
        error: err,
      });
    } else {
      res.send(result);
    }
  });
});

router.post("/updatePart", function (req, res) {
  account.updatePart(req, function callback(err, result) {
    if (err != null) {
      res.send({
        error: err,
      });
    } else {
      res.send(result);
    }
  });
});

router.post("/updatePro", function (req, res) {
  account.updatePro(req, function callback(err, result) {
    if (err != null) {
      res.send({
        error: err,
      });
    } else {
      res.send(result);
    }
  });
});

/* Récupération du header bearer */
const extractBearerToken = (headerValue) => {
  if (typeof headerValue !== "string") {
    return false;
  }

  const matches = headerValue.match(/(bearer)\s+(\S+)/i);
  return matches && matches[2];
};

/* Vérification du token */
const checkTokenMiddleware = (req, res, next) => {
  // Récupération du token
  const token =
    req.headers.authorization && extractBearerToken(req.headers.authorization);

  // Présence d'un token
  if (!token) {
    return res.status(401).json({ message: "Error. Need a token" });
  }

  // Véracité du token
  user.jsonwebtoken.verify(token, SECRET, (err, decodedToken) => {
    if (err) {
      res.status(401).json({ message: "Pas authorisé" });
    } else {
      return next();
    }
  });
};

router.get("/user", checkTokenMiddleware, (req, res, next) => {
  const token =
    req.headers.authorization && extractBearerToken(req.headers.authorization);

  // Décodage du token
  const decoded = user.jsonwebtoken.decode(token, { complete: false });

  return res.json({ user: decoded });
});

router.post("/logout", (req, res, next) => {
  res.json({ status: "OK" });
});

module.exports = router;
