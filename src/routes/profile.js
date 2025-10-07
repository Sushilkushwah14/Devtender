const express = require("express");
const { userAuth } = require("../middlewares/auth");
const {
  validateProfileData,
  validateProfileForgotPassword,
} = require("../utils/validation");
const {User} = require("../middlewares/models/user.js");
const bcrypt=require('bcrypt')

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);

    // res.send("Reading cookies");
  } catch (error) {
    res.status(500).send("ERROR : " + error.message);
  }
});

// profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
//   try {
//     if (!validateProfileData(req)) {
//       throw new Error("Invalid Edit Request");
//     }

//     const loggedInuser=req.user;
//     console.log(loggedInuser);
//     res.send("Logged in user Edited successfully via profile")

//   } catch (err) {
//     res.status(400).send("ERROR : " + err.message);
//   }
// });


profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }

    const loggedInUser = req.user; // The user object added by `userAuth` 
    console.log(loggedInUser)
    const updates = req.body; // The fields to update from the request body form postman (inhe update karo)

    // Update the user in the database
    // const updatedUser = await User.findByIdAndUpdate(
    //   loggedInUser._id, // User ID
    //   updates,          // Update fields
    //   { new: true, runValidators: true } // Options: return updated document, validate input
    // );

    Object.keys(updates).forEach((fields) => {
      loggedInUser[fields] = updates[fields];
    });
    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName},Your profile is Updated successfully`,
      data: loggedInUser,
    });

    res.status(200).send(loggedInUser); // Respond with updated user object
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

// profileRouter.patch("/profile/forgotpassword", userAuth, async (req, res) => {
//   try {
//     const user = req.user; //from after the auth of user i:e present or not or login

//     if (!validateProfileForgotPassword) {
//       throw new Error("Invalid EditForgotPassword Request");
//     }
//     // const oldpassword = user.password;
//     // const toBeUpdated = req.body;
//     // const updatedPassword = await User.findByIdAndUpdate(
//     //   oldpassword._id,
//     //    toBeUpdated, 
//     //    { new: true, runValidators: true });
//     // console.log(updatedPassword);
//     // res.send(updatedPassword);
//     const oldpassword=user.password;
//     const toBeUpdatedPassword=req.body;
//     Object.keys(toBeUpdatedPassword).forEach((key)=>{
//       if(key=="password"){
//       oldpassword=toBeUpdatedPassword[key]
//       }
//     })

//     //hashing the updated password
//     // oldpassword=await bcrypt.hash(oldpassword,10);
//     await oldpassword.save();
//     res.send(oldpassword)

//   } catch (error) {
//     res.status(500).send("ERROR : " + error.message);
//   }
// });


profileRouter.patch("/profile/forgot-password", userAuth, async (req, res) => {
  try {
    if (!validateProfileForgotPassword) {
            throw new Error("Invalid EditForgotPassword Request");
          }
    const toBeUpdatedPassword = req.body; // Contains the new password
    const user = req.user; // Authenticated user from middleware
    console.log(user);
    // Iterate over the keys in toBeUpdatedPassword
    Object.keys(toBeUpdatedPassword).forEach((key) => {
      if (key === "password") {
        user.password = toBeUpdatedPassword[key]; // Update the password field
      }
    });

    // Hash the updated password
    user.password = await bcrypt.hash(user.password, 10);

    // Save the updated user document
    await user.save();
    console.log(user);
    

    res.send("Password updated successfully");
  } catch (error) {
    res.status(500).send(`Error: ${error.message}`);
  }
});


module.exports = profileRouter;
