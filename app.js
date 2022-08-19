const express = require("express");
require("dotenv").config()
const cors = require("cors")
const cookieParser = require('cookie-parser')
//const Cookies = require("universal-cookie")
const app = express();
const mongoose = require("mongoose")
require("./DBconnection/conn")
const router = require("./routes/auth")

// const corsOptions = {
//     credentials: true,
//     ///..other options
//   };


app.use(cookieParser())
app.use(cors())
app.use(express.json());

//require all routes
app.use(router)



const port = process.env.PORT || 5001;

//heroku setup
if(process.env.NODE_ENV == "production"){
    app.use(express.static("client/build"))
}


app.listen(port,()=>{
    console.log(`server running at ${port}`);
})