var dotenv = require("dotenv");
var mysql=require('mysql')
var pool=mysql.createConnection({
host: process.env.HOST,
port: process.env.PORT,
database: process.env.DBNAME,
user: process.env.USERNAME,
password: process.env.PASSWORD,
multipleStatements:true,
})
module.exports=pool