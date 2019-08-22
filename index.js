function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
};

function updateSitePower () {
  con.query("SELECT id FROM site_power", function (err, rows) {
  if (err) throw err;
  if (rows.length) { 
    for (var id = 1, len = rows.length; id < len + 1; id++) {
      var power = getRandomArbitrary(0, 1000).toFixed(4);
      var time_stamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
      var sql = `UPDATE site_power
                 SET power = ?, time_sent = ?
                 WHERE id = ?`;
      con.query(sql, [power, time_stamp, id]);
      console.log(time_stamp + " Site " + id + " Power(kW): " + power);
      }
    };
  });
};

function updateDsuPower (dsu_id) {
  var sql = `SELECT SUM(power) as total_power
             FROM site_power
             WHERE dsu_id = ?`
  con.query(sql, [dsu_id], function (err, result) {
    var total_power = result[0].total_power
    var time_stamp = new Date().toISOString().slice(0, 19).replace('T', ' ')
    var sql = `UPDATE dsu_power
               SET total_power = ?, time_aggregated = ?
               WHERE dsu_id = ?`
    if (total_power == null) {
      total_power = 0
    }
    con.query(sql, [total_power, time_stamp, dsu_id])
    console.log(time_stamp + " DSU " + dsu_id + " Total Power(kW): " + total_power);

  })
}

function updateDsuPowerTable () {
  con.query("SELECT id FROM dsus", function (err, rows) {
    if (err) throw err;
    
    if (rows.length) { 
      for (var dsu_id = 1, len = rows.length; dsu_id < len + 1; dsu_id++) {
        total_power = updateDsuPower(dsu_id)
      };
  };
  })
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
  setInterval(updateDsuPowerTable, 1000)
  })