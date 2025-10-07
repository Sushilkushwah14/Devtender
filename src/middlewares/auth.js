
const jwt=require("jsonwebtoken");

const {User} =require("./models/user.js");



const userAuth = async (req, res, next) => {
try{
    // we have saved cookie in our browser and Read the token from req cookies sent to sever to validate
    const {token}=req.cookies;//now we have token we can send it with profile request to server to validate it
     
    if(!token){
        throw new Error("token id not valid")
    }

    const decodedObj=await jwt.verify(token,"DEV@Tinder$790")//returns decoded message the palyload value which is here _id

    const {_id}=decodedObj

    const user=await User.findById(_id)
    if(!user){
        throw new Error("Userr not found")
    }
    req.user=user;//Attaching the user(every time the new instance of user is sent ) with req handler that user is found

    next();
}
    catch(error){
        res.status(500).send("ERROR : "+error.message);
    }

    //

 

};


module.exports = {
  
  userAuth

};
