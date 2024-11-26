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
const user = require("./models/user");

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
app.post("/signup", async (req, res) => {
  const user = new User(req.body); //reading the data
  console.log(user);

  try {
    await user.save();
    res.send("data is saved in User model collection");
  } catch (error) {
    console.log("error in saving data", error.message);
    res.status(500).send("failed to store the data");
  }
});
app.get("/users", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const users = await User.find({ emailId: userEmail });
    if (users.length === 0) {
      res.status(404).send("users not found");
    } else {
      res.send(users);
    }
  } catch (error) {
    res.status(400).send("something weent wrong");
  }
});
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const user = await User.findOne({ emailId: userEmail });
    res.send(user);
  } catch (error) {
    res.status(500).send("something weent wrong ,wrong email");
  }
});
//to delete in database
app.delete("/user", async (req, res) => {
  const userid = req.body._id;
  try {
    await User.findByIdAndDelete({ userid });
    res.send("User deleted successfully");
  } catch (error) {
    res.status(400).send("something weent wrong");
  }
});
//to update data of the user
app.patch("/user", async (req, res) => {
  const userid = req.body._id;
  const data = req.body;
  try {
    // const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
    // const isUpdateAllowed = Object.keys(data).every((k) =>
    //   ALLOWED_UPDATES.includes(k)
    // );
    // if (!isUpdateAllowed) {
    //   throw new Error("Update is not allowed");
    // }
    if(data?.skills?.length>3){
      throw new Error("skills are too many ")
    }
    //id wale main,all "data" ke andar kuch bhi update kar sakte hai
    await User.findByIdAndUpdate({ _id: userid }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    res.send("user updated successfully");
  } catch (error) {
    res.status(400).send("UPDATE failed" + error.message);
  }
});
//to update data of the user in email
app.patch("/user", async (req, res) => {
  const userid = req.body._id;
  const updateEmail = req.body.emailId;
  try {
    //emailid wale kitnebhi main,all "emailId:updateEmail" ke andar kuch bhi update kar sakte hai
    await User.findByIdAndUpdate(
      { userid },
      { emailId: updateEmail },
      {
        returnDocument: "after",
        runValidators: true,
      }
    );
    res.send("user updated successfully");
  } catch (error) {
    res.status(400).send("UPDATE failed" + error.message);
  }
});

// Connect to the database and start the server after connection
connectDB().then(() => {
  console.log("Database connection established successfully...");
  app.listen(PORT, () => {
    console.log(`Server running successfuslly on port ${PORT}...`);
  });
});