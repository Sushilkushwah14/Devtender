const express = require("express");
const { validateSignUpData } = require("../utils/validation.js");
const validator = require("validator");
const {User} = require("../middlewares/models/user.js");
const bcrypt = require("bcrypt");

const authRouter = express.Router();
authRouter.post("/signup", async (req, res) => {
  try {
    //validation of data
    validateSignUpData(req);
    //Encrypt the password

    const { firstName, lastName, emailId, password,skills,age,about} = req.body;

    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    //creating a new instance of the User Model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
      skills, //password encrypt hoke hi jaega
      age,
      about,
    }); //reading the data from the request send containing the sifnup data in user

    await user.save();
    res.send("data is saved in User model collection");
  } catch (error) {
    console.log("error in saving data", error.message);
    res.status(400).send("ERROR : " + error.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    //validating email typed is in right formate or wrong
    if (!validator.isEmail(emailId)) {
      throw new Error("Please give right emailid!!");
    }
    //checking user is present in db or not
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("user Email Id is not present in Db");
    }
    //if email id is present & checking password is right or wrong
    //const isPasswordValid=await bcrypt.compare(password,user.password) just checking the password is right or wrong
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      const token = await user.getJWT();
      console.log(token);

      //Add the token to cookie and send thr response back to the user by SERVER
      res.cookie("token", token);
      res.send("Login successfull!!");
    } else {
      throw new Error("Password not valid");
    }
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("User LoggedOut");
});

module.exports = authRouter;







