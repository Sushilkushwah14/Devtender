const express = require("express");
const app = express();
const PORT = 3000;
const { connectDB } = require("./config/database");

// const {user} = require("./models/user");

const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");



// Middleware to parse JSON request body
app.use(express.json());
app.use(cookieParser());

//importing routers
const authRouter=require("./routes/auth")//signup & login 
const profileRouter=require("./routes/profile")
const requestRouter=require("./routes/requestes")
//Using routers after every api call
app.use("/",authRouter)
app.use("/",profileRouter)
app.use("/",requestRouter)

// Connect to the database and start the server after connection
connectDB().then(() => {
  console.log("Database connection established successfully...");
  app.listen(PORT, () => {
    console.log(`Server running successfuslly on port ${PORT}...`);
  });
});
