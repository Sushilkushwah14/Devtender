const express = require("express");
const app = express();
const PORT = 3000;
const { connectDB } = require("./config/database");
const User = require("./models/user");
// const {user} = require("./models/user");
const validator=require("validator")
const {validateSignUpData}=require("./utils/validation")
const bcrypt=require("bcrypt")
const cookieParser=require("cookie-parser")
const jwt=require("jsonwebtoken")
const {userAuth}=require("./middlewares/auth")
// app.post("/signup", async (req, res) => {
//   try {
//     const user = new User({
//       firstName: "Harikrishna",
//       lastName: "jaiiswal",  
//       emailId: "hari@gmail.com",
//       password: "hariiii21005",
//       gender: "male",
//     });

//     await user.save();
//     res.send("User collection data is saved successfully.");
//   } catch (error) {
//     console.error("Error saving user data:", error.message);
//     res.status(500).send("Failed to save user data.");
//   }
// });

// Middleware to parse JSON request body
app.use(express.json());
app.use(cookieParser())
app.post("/signup", async (req, res) => {
  try {
  //validation of data
  validateSignUpData(req);
  //Encrypt the password

  const{firstName,lastName,emailId,password}=req.body;

  const passwordHash= await bcrypt.hash(password,10)
  console.log(passwordHash);
  
  //creating a new instance of the User Model
  const user = new User({
    firstName,
    lastName,
    emailId,
    password:passwordHash,//password encrypt hoke hi jaega
  }); //reading the data from the request send containing the sifnup data in user 
  
    await user.save();
    res.send("data is saved in User model collection");
  } catch (error) {
    console.log("error in saving data", error.message);
    res.status(400).send("ERROR : "+error.message);
  }
});

app.post("/login",async(req,res)=>{
  try{
     const {emailId,password}=req.body
     //validating email typed is in right formate or wrong
     if(!validator.isEmail(emailId)){
      throw new Error("Please give right emailid!!")
     }
    //checking user is present in db or not
    const user=await User.findOne({emailId:emailId})
    if(!user){
      throw new Error("user Email Id is not present in Db")
    } 

    //if email id is present & checking password is right or wrong
     const isPasswordValid= await user.isPasswordValid(password)   
     if(isPasswordValid){
     
       const token=await user.getJWT()
       console.log(token);
       

   //Add the token to cookie and send thr response back to the user by SERVER
      res.cookie("token",token,{expires:new Date(Date.now()+365*3600) },{httpOnly:true})
      res.send("Login successfull!!")
     }
     else{
      throw new Error("Password not valid")
     }

  }catch(error){
    res.status(400).send("ERROR : "+error.message);
  }
})
 
app.get("/profile",userAuth,async(req,res)=>{
  try{
  const user=req.user;

  res.send(user)
  
  res.send("Reading cookies")
  }   catch (error) {
    res.status(500).send("ERROR : "+error.message);
  }
  
})



// Connect to the database and start the server after connection
connectDB().then(() => {
  console.log("Database connection established successfully...");
  app.listen(PORT, () => {
    console.log(`Server running successfuslly on port ${PORT}...`);
  });
});