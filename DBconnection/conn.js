const mongoose = require("mongoose")

const DB_CONNECT = process.env.DB

mongoose.connect(DB_CONNECT,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
   
}).then(()=>{
    console.log("db connected");
}).catch((error)=>{
    console.log(error);
})  