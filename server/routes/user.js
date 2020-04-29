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
  })
})


/* GET user listing. */
router.post("/registerPart", function (req, res) {

  account.signUpPart(req, function callback(err, result) {
    if (err != null) {
      res.send({
        error: err
      });
    }
    else {
      console.log("Je renvoie le résultat")
      console.log(result)
      res.send({
        insertId: result
      })
    }
  })
})




/************************************************************* */

// Refresh tokens
const refreshTokens = {}

router.post("/login2", function (req, res) {

  const { login, password } = req.body
  const expiresIn = 3600
  const refreshToken = Math.floor(Math.random() * (1000000000000000 - 1 + 1)) + 1


    //On vérifie si les identifiants de connexion de l'utilisateur sont corrects
    account.signIn(req, function callback(err, result) {
      if (err != null) {
        console.log("erreur : "+err)
        res.send({
          error: err
        });
      }
      else {
        // Si les identifiants dont bons, on récupère les données liées à l'utilisateur
        account.getUserInfo(result.user, function callback(err, userInfo){
          if (err != null) {
            console.log("erreur : "+err)
            res.send({
              error: err
            });
          }
          else {
            const accessToken = user.jsonwebtoken.sign(
              {
                //All
                id : userInfo.user.id_account,
                accountType : userInfo.user.id_account_type,
                email : userInfo.user.email,
                nbAddress : userInfo.user.nb_address,
                street : userInfo.user.street,
                city : userInfo.user.city,
                postCode : userInfo.user.postal_code,
                country : userInfo.user.country,
                
                //Part
                idPart : userInfo.user.id_partiular,
                cookingLevel : userInfo.user.id_cooking_level,
                firstname : userInfo.user.firstname,
                lastname : userInfo.user.lastname,
                birthday : userInfo.user.birthday,
                sex : userInfo.user.sex,
                
                //Pro
                idPro : userInfo.user.id_professional,
                namePro : userInfo.user.name

              }, SECRET, {
                expiresIn
              }
            )
    
    
    
            res.json({
              token: accessToken
            })
          }
        });


        

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

  
    // Décodage du token
    const decoded = user.jsonwebtoken.decode(token, { complete: false })

    console.log("decode : "+decoded)

    return res.json({ user: decoded })
})


router.post('/logout', (req, res, next) => {
  res.json({ status: 'OK' })
})




module.exports = router;
