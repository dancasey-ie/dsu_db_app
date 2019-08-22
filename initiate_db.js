
var mysql = require('mysql');
// var create_db = "CREATE DATABASE mydb1";
var create_tb_site_power = "CREATE TABLE site_power (id INT, power DECIMAL(13, 4), dsu_id INT, time_sent DATETIME);";  
var create_tb_dsus = "CREATE TABLE dsus (id INT, description VARCHAR(255));";  
var create_tb_dsu_power = "CREATE TABLE dsu_power (dsu_id INT, total_power DECIMAL(13, 4), time_aggregated DATETIME);";  
var time_stamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
var insert_site_power = "INSERT INTO site_power (id, power, dsu_id, time_sent) VALUES ?";
var insert_dsus = "INSERT INTO dsus (id, description) VALUES ?";
var insert_dsu_power = "INSERT INTO dsu_power (dsu_id, total_power, time_aggregated) VALUES ?";
var site_power_values = [
  ['1', '0.0', '1', time_stamp],
  ['2', '0.0', '1', time_stamp],
  ['3', '0.0', '1', time_stamp],
  ['4', '0.0', '1', time_stamp],
  ['5', '0.0', '1', time_stamp],
  ['6', '0.0', '2', time_stamp],
  ['7', '0.0', '2', time_stamp],
  ['8', '0.0', '2', time_stamp],
  ['9', '0.0', '3', time_stamp],
  ['10', '0.0', '3', time_stamp],
];

var dsus_values = [
  ['1', 'All diesel generators in Munster'],
  ['2', 'All the fridges in Limerick'],
  ['3', 'All Spar deep freezes'],
];

var dsu_power_values = [
  ['1', '0.0', time_stamp],
  ['2', '0.0', time_stamp],
  ['3', '0.0', time_stamp],
];

//var con = mysql.createConnection({
//  host: "localhost",
//  user: "root",
//  password: "root"
//});

//con.connect(function(err) {
//  if (err) throw err;
//  console.log("Connected to MySQL");
//  con.query(create_db, function (err, result) {
//  console.log("Database created");
//  });
//});

var dbcon = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "dsu_db"
});

dbcon.connect(function(err) {
  if (err) throw err;
  console.log("Connected to database");
  dbcon.query(create_tb_site_power)
  dbcon.query(create_tb_dsus)
  dbcon.query(create_tb_dsu_power)
  dbcon.query(insert_site_power, [site_power_values], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  });

  dbcon.query(insert_dsus, [dsus_values], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  });

  dbcon.query(insert_dsu_power, [dsu_power_values], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  });

})