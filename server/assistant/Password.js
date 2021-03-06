// Récupère clé de salage
function getSalt(saltLength) {
  var salt = "";
  var char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < saltLength; i++) {
    salt += char.charAt(Math.floor(Math.random() * char.length));
  }
  return salt;
}

// Hash une chaine de caractères
function hashString(stringToHash) {
  var sha256 = require("js-sha256");
  return sha256(stringToHash);
}

module.exports = {
  getSalt,
  hashString,
};
