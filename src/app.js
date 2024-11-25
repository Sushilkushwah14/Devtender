

// const express=require("express")
// const app=express();
// const PORT=3000;
// const {connectDB}=require("./config/database")
// const User=require("./models/user")

// app.post("/signup",async(req,res)=>{
// //creating a new instance of a model User
// const user=new User({
//   firstName:"sushil",
//   lastName:"kushwah",
//   emailId:"sushilkushwah@gmail.com",
//   password:"Sushil@1411",
//   gender:"male",
// })

// await user.save();
// res.send("user collection data is saved successfully")
// })

// connectDB()
// .then(()=>{
//     console.log("Database connection established...");
//     app.listen(PORT,()=>{
//       console.log("Server running successfully on 3000..."); 
//   })//we are listening the request.
    
// })
// .catch((err)=>{
//    console.error("Database cannot be connect!!")
// })
const express = require("express");
const app = express();
const PORT = 3000;
const { connectDB } = require("./config/database");
const User = require("./models/user");

// Middleware to parse JSON request body
app.use(express.json());

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

app.post("/signup",async(req,res)=>{

    const user=new User(req.body)
    try{
await user.save();
res.send("data is saved in User model collection")
  }catch(error){
      console.log("error in saving data",error.message);
      res.status(500).send("failed to store the data")
      
  }
})

// Connect to the database and start the server after connection
connectDB().then(() => {
  console.log("Database connection established successfully...");
  app.listen(PORT, () => {
    console.log(`Server running successfully on port ${PORT}...`);
  });
});
// connectDB().then(()=>{
//   console.log("established");
//   app.listen(PORT,()=>{
//     console.log(`server running on ${PORT}`);
    
//   })
  
// })