let mysql = require('mysql2');

let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "S6Q5L4"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
