const mongoose = require("mongoose");
const validator = require("validator");
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      maxLength: 50,
      trim: true,
    },
    lastName: {
      type: String,
      maxLength: 50,
      trim: true,
    },
    emailId: {
      type: String,
      require: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("invalid email address :" + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("invalid password :" + value);
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      enum:{
        values:["male","female","others"],
        message:`{VALUE} is not valid gender type`
      },
      // validate(value) {
      //   if (!["male", "female", "others"].includes(value)) {
      //     throw new Error("Gender data is not valid");
      //   }
      // },
    },
    phototUrl: { 
      type: String,
      default: "https://photo.url.defaulturl.com",
      validate(value){
        if(!validator.isURL(value)){
          throw new Error("Invalid photo url")
        }
      }
    },
    about: {
      type: String,
      default: "this is a default description",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);
//we are creating the jwt token and verifying it by schema methods
userSchema.methods.getJWT = async function () {
  const user = this; //The this keyword refers to the instance of the userSchema (a specific user document) 
  // that is calling the method getJWT after login by email and password it(user=this) get all 
  // information of that user.

  const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$790", {
    expiresIn: "365d",
  }); //payload and secret key for only server
  return token;
  //cosnt user=this;
  // userSchema.methods.getJWT=async function(){
  //        const token=await jwt.sign({_id:user._id},"hfjjhs",{})
  // return token
  //}
  // const tolek=await jwt.sign({_id:user.id},"XYZ",{expiresIn : "387d"})//sign takes payload and secret key with expire time
};

//USING THE SCHEMA METHODS TO MAKE HANDLER FUNCTIONS() or validating password
userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;//already the password is saved in hash formate at the time of singning up
  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  );

  return isPasswordValid;
  
  // userSchema.methods.validatePassword=async function(userinputpss){
  //   const user=this;
  //   const passwordHash=user.password;
  //   const isPassValid=await bcrypt.compare(userinputpss,pass)
  // }
};

const User = mongoose.model("User", userSchema);
module.exports ={User};//model name and schema
// user = mongoose.model("User", userSchema); //model name and schema
// module.exports ={
//   user,
// }
