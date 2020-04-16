var Database = require('~/server/database/Database.js');
var Password = require('~/components/Password.js');

exports.signUp = function(registrationInfo) {

    var salt = Password.getSalt(64);
    var password = Password.hashPassword(salt + registrationInfo.password);

    var request = 'INSERT INTO Account SET'
                + ' id_account_type = ' + 0
                + ', username = ' + registrationInfo.username
                + ', password = ' + password
                + ', salt = ' + salt
                + ', email = ' + registrationInfo.email
                + ', creation_date = NOW()'
                + ', last_access = NOW()'
    Database.sendRequest(request);
}
