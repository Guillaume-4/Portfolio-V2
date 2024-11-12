const dotenv = require("dotenv")
dotenv.config()

const SECRETKEY = process.env.SECRETKEY

module.exports = {SECRETKEY}