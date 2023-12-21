var dotenv = require("dotenv");
var mysql=require('mysql')
var pool=mysql.createConnection({
host: process.env.DB_HOST,
port: process.env.DB_PORT,
database: process.env.DB_DBNAME,
user: process.env.DB_USERNAME,
password: process.env.DB_PASSWORD,
multipleStatements:true,
})
module.exports=pool