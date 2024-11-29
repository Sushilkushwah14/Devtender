const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { validateProfileData } = require("../utils/validation");
const User = require("../models/user");

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
      data:loggedInUser,
    });

    res.status(200).send(loggedInUser); // Respond with updated user object
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = profileRouter;
