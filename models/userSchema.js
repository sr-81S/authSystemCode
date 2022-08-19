const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        unique:true,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    },
    

})

//encript the password
userSchema.pre('save', async function (next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,12);
    }
    next();
})

//generate token and return
userSchema.methods.genrateToken = async function(){
    let token = jwt.sign({_id: this._id},process.env.SECRATE)
    return token
}


const User = mongoose.model('users',userSchema);

module.exports = User

