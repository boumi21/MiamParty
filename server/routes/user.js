const express = require("express");
const router = express.Router();
const account = require("../dao/Account.js");
const regex = require("../assistant/Regex.js")
const user = require('../app');

const SECRET = 'dummy'


/* GET user listing. */
router.post("/login", function (req, res) {
  debugger
  if (!regex.login(req.body.login)) {
    res.send({
      error: "Invalid login"
    });
  }
  else if (!regex.password(req.body.password)) {
    res.send({
      error: "Invalid password"
    });
  }
  else {
    account.signIn(req, function callback(err, result) {
      if (err != null) {
        res.send({
          error: err
        });
      }
      else {
        console.log("Je renvoie le résultat");
        console.log(result);
        res.send(result);
      }
    });
  }
});

/* GET user listing. */
router.post("/register", function (req, res) {
  //vérifier champs formulaire, vérifier que l'utilisateur n'existe pas
  //if(req.body.password && req.body.email)
  console.log(req.body);
  res.send("respond with a resource - register");
});




/************************************************************* */

// Refresh tokens
const refreshTokens = {}

router.post("/login2", function (req, res) {

  const { login, password } = req.body
  const expiresIn = 15
  const refreshToken = Math.floor(Math.random() * (1000000000000000 - 1 + 1)) + 1

  console.log("voici : "+login)

  if (!regex.login(req.body.login)) {
    res.send({
      error: "Invalid login"
    });
  }
  else if (!regex.password(req.body.password)) {
    res.send({
      error: "Invalid password"
    });
  }
  else {


    const accessToken = user.jsonwebtoken.sign(
      {
        login,
        name: 'User ' + login
      }, SECRET, {
        expiresIn
      }
    )

    

    refreshTokens[refreshToken] = {
      accessToken,
      user: {
        login,
        name: 'User ' + login
      }
    }

    console.log("refresh : "+ refreshToken + "  access : "+accessToken)

    


    account.signIn(req, function callback(err, result) {
      if (err != null) {
        console.log("erreur : "+err)
        res.send({
          error: err
        });
      }
      else {
        console.log("Je renvoie le résultat");
        console.log("encore : "+result);
        res.json({
          token: {
            accessToken,
            refreshToken,
            clientId: '123'
          }
        })
      }
    });
  }
});



router.post('/refresh', (req, res, next) => {
  const { refreshToken } = req.body

  if ((refreshToken in refreshTokens)) {
    const user = refreshTokens[refreshToken].user
    const expiresIn = 15
    const newRefreshToken = Math.floor(Math.random() * (1000000000000000 - 1 + 1)) + 1
    delete refreshTokens[refreshToken]
    const accessToken = user.jsonwebtoken.sign(
      {
        user: user.login
      }, 'dummy', {
        expiresIn
      }
    )

    refreshTokens[newRefreshToken] = {
      accessToken,
      user: user,
      clientId: '123'
    }

    res.json({
      token: {
        accessToken,
        refreshToken: newRefreshToken
      }
    })
  } else {
    res.sendStatus(401)
  }
})







/* Récupération du header bearer */
const extractBearerToken = headerValue => {
  if (typeof headerValue !== 'string') {
      return false
  }
  
  const matches = headerValue.match(/(bearer)\s+(\S+)/i)
  return matches && matches[2]
}

/* Vérification du token */
const checkTokenMiddleware = (req, res, next) => {
  
  // Récupération du token
  const token = req.headers.authorization && extractBearerToken(req.headers.authorization)

  // Présence d'un token
  if (!token) {
      return res.status(401).json({ message: 'Error. Need a token' })
  }
  
  // Véracité du token
  user.jsonwebtoken.verify(token, SECRET, (err, decodedToken) => {
    
      if (err) {
        console.log("je suis un pet")
          res.status(408).json({ message: 'Error. Bad token' })
      } else {
          return next()
      }
  })
}






router.get('/user', checkTokenMiddleware, (req, res, next) => {
  const token = req.headers.authorization && extractBearerToken(req.headers.authorization)
  for (var item in token) {
    console.log("tok : "+item)
    for (var item2 in item){
      
    }
    
 }
  
    // Décodage du token
    const decoded = user.jsonwebtoken.decode(token, { complete: false })

    console.log("decode : "+decoded)

    return res.json({ user: 'callum' })
})


router.post('/logout', (req, res, next) => {
  res.json({ status: 'OK' })
})

module.exports = router;
