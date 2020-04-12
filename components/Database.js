module.exports = {
     request: function (pRequest) {
        const mysql = require('mysql');
        const con = mysql.createConnection({
            database : 'miamparty',
            host     : 'localhost',
            user     : 'test',
            password : 'test'
        });

        con.connect(function(err) {
            if (err) {
                console.error('error connecting: ' + err.stack);
                return;
            }
        });

        con.query(pRequest, function(err, rows, fields) {
            if (err) throw err;
            console.log(rows);
        });

        con.end();
    }
}