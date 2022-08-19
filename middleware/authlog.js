const jwt = require("jsonwebtoken")
const User = require("../models/userSchema")



const authlog = async (req, res, next)=>{
    try {
    //    const headerData =JSON.stringify(req.headers)
    //    const authori = req.headers['authorization']
    //    console.log(authori);
       

         const token = req.headers['authorization']
        //  console.log(token);
        //  const {id} = req.params;
         console.log("token get");
         console.log(token);
         const veriToken = jwt.verify(token, process.env.SECRATE)
         console.log(veriToken);
         const rootUser = await User.findById({_id:veriToken._id})
         console.log("root user find");
         console.log(rootUser);
         if(!veriToken && !rootUser){
            throw new Error("user not found")
         }
         req.rootUser = rootUser;

          next()
    } catch (error) {
        res.status(401).send("un authorise user")
        console.log(error);
    }
}

module.exports = authlog