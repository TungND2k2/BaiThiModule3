const mysql = require("mysql");
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "2002",
    database: "student",
});

module.exports = connection;