function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
};

function updateSitePower (rows) {
  con.query("SELECT id FROM site_power", function (err, rows) {
  if (err) throw err;
  if (rows.length) { 
    for (var i = 1, len = rows.length; i < len + 1; i++) {
      var power = getRandomArbitrary(0, 1000).toFixed(4);
      var time_stamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
      var sql = `UPDATE site_power
                 SET power = ?, time_sent = ?
                 WHERE id = ?`;
      con.query(sql, [power, time_stamp, i]);
      }
    };
  });
};

var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "dsu_db"
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  setInterval(updateSitePower, 1000)
  });