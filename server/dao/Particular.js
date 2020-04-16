var Database = require('~/server/database/Database.js');
var Password = require('~/components/Password.js');

exports.signUp = function(registrationInfo) {

    var salt = Password.getSalt(64);
    var password = Password.hashPassword(salt + registrationInfo.password);

    var getAccountType = 'SELECT * FROM'
                       + 'account_type'
                       + ' WHERE'
                       + ' account_type.description = "Particular"';

    var result = Database.sendRequest(getAccountType);
    var accountType = result[0].account_type;
    



    var insertParticular = 'INSERT INTO Account SET'
                + ' id_account_type = ' + accountType
                + ', username = ' + registrationInfo.username
                + ', password = ' + password
                + ', salt = ' + salt
                + ', email = ' + registrationInfo.email
                + ', creation_date = NOW()'
                + ', last_access = NOW()';
    Database.sendRequest(insertParticular);
}
