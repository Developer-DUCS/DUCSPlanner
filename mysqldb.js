const mysql = require("mysql2");
const config = require("./configuration/config.json");

var conn = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});
module.exports = conn;