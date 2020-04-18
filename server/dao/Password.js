function getSalt(saltLength) {
    var salt = '';
    var char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$%&()*+,-./:;<=>?@[/]^_`{|}~';
    for (var i = 0; i < saltLength; i++) {
        salt += char.charAt(Math.floor(Math.random() * char.length));
    }
    return salt;
}

function hashPassword(passwordToHash) {
    var sha256 = require('js-sha256');
    return sha256(passwordToHash);
}

module.exports = {
    getSalt,
    hashPassword
};