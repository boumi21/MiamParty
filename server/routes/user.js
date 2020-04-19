const express = require("express")
const account = require("../dao/Account.js")
const user = require('../app')

const router = express.Router();
const SECRET = 'dummy'


/* GET user listing. */
router.post("/login", function (req, res) {
  debugger
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
  const expiresIn = 3600
  const refreshToken = Math.floor(Math.random() * (1000000000000000 - 1 + 1)) + 1



    account.signIn(req, function callback(err, result) {
      if (err != null) {
        console.log("erreur : "+err)
        res.send({
          error: err
        });
      }
      else {
        for (var item in result){
          for (var item2 in item){
            for (var item3 in item2){
              for (var item4 in item3){
                console.log("Je renvoie le résultat : "+item4);
              }
              
            }
          }
          
        }
        

        const accessToken = user.jsonwebtoken.sign(
          {
            id : result.user.ID_ACCOUNT,
            username : result.user.USERNAME,
            email : login
          }, SECRET, {
            expiresIn
          }
        )



        res.json({
          token: accessToken
        })
      }
    });


    

    

    // refreshTokens[refreshToken] = {
    //   accessToken,
    //   user: {
    //     login,
    //     name: 'User ' + login
    //   }
    // }

    


});



// router.post('/refresh', (req, res, next) => {
//   const { refreshToken } = req.body

//   if ((refreshToken in refreshTokens)) {
//     const user = refreshTokens[refreshToken].user
//     const expiresIn = 15
//     const newRefreshToken = Math.floor(Math.random() * (1000000000000000 - 1 + 1)) + 1
//     delete refreshTokens[refreshToken]
//     const accessToken = user.jsonwebtoken.sign(
//       {
//         user: user.login
//       }, 'dummy', {
//         expiresIn
//       }
//     )

//     refreshTokens[newRefreshToken] = {
//       accessToken,
//       user: user,
//       clientId: '123'
//     }

//     res.json({
//       token: {
//         accessToken,
//         refreshToken: newRefreshToken
//       }
//     })
//   } else {
//     res.sendStatus(401)
//   }
// })







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
          res.status(401).json({ message: 'Pas authorisé' })
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

    return res.json({ user: decoded })
})


router.post('/logout', (req, res, next) => {
  res.json({ status: 'OK' })
})

module.exports = router;
