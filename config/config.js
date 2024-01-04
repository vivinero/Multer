const mongoose = require("mongoose")
require('dotenv').config()

const DB = process.env.apiLink

mongoose.connect(DB).then(()=> {
    console.log("Database Connection Successfully connected")
}).catch((e)=> {
    console.log(e.message)
})