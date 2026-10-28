let mysql = require('mysql2');

let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "S6Q5L4",
  database: "mydb"
});

con.connect(function(err) {
  if (err) throw err;
  let sql = "UPDATE customers SET address = 'Canyon 123' WHERE address = 'Highway 37'";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result.affectedRows + " record(s) updated");
  });
});