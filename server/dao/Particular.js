var Database = require('~/server/database/Database.js');

exports.signUp = function(registrationInfo){
    var request = 'INSERT INTO Account SET'
                + ' id_account_type = ' + 0
                + ', username = ' + registrationInfo.username
                + ', password = ' + registrationInfo.password
                + ', hash = ' + 'test'
                + ', email = ' + registrationInfo.email
                + ', creation_date = NOW()'
                + ', last_access = NOW()'
    Database.sendRequest(request);
}
