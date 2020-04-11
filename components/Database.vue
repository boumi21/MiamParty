<script>
export default {
    databaseConnection() {
        var mysql      = require('mysql');
        var connection = mysql.createConnection({
            host     : 'localhost',
            user     : 'test',
            password : 'test'
        });

        connection.connect(function(err) {
            if (err) {
                console.error('error connecting: ' + err.stack);
                return;
            }
        });
 
        alert("Hello 1");

        connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
            if (err) throw err;
            console.log('The solution is: ', rows[0].solution);
        });

        alert("Hello 2");
        
        connection.end();
    }
}
</script>
