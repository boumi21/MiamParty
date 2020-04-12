module.exports = {
     sendRequest: function (pRequest) {
        console.log("Entré dans sendRequest");
        var mysql = require('mysql');
        var con = mysql.createConnection({
            database : 'miampartytest',
            host     : 'localhost',
            user     : 'test',
            password : 'test'
        });

        console.log("Connexion créée");
        con.connect(function(err) {
            if (err) {
                console.error('error connecting: ' + err.stack);
                return;
            }
        });

        console.log("Connecté à la bdd");
        con.query(pRequest, function(err, rows, fields) {
            if (err) throw err;
            console.log(rows);
        });

        con.end();

        console.log("Terminé");
    }
}