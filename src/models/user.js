const mongoose = require("mongoose");
const validator=require("validator")
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required:true,
    maxLength:50,
  },
  lastName: {
    type: String,
    maxLength:50,
  },
  emailId: {
    type: String,
    require:true,
    unique:true,
    lowercase:true,
    trim:true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error("invalid email address :" +value)
      }
    }
  },
  password: {
    type: String,
    required:true,
    validate(value){
      if(!validator.isStrongPassword(value)){
        throw new Error("invalid password :"+value)
      }
    }
  },
  age: {
    type: Number,
    min:18,

  },
  gender: {
    type: String,
     validate(value){
     if(!["male","female","others"].includes(value)){
      throw new Error("Gender data is not valid")
     }
    },
  },
  phototUrl:{
    type:String,
    default:"https://photo.url.defaulturl.com",
    validate(value){
      if(!validator.isURL(value)){
        throw new Error("invalid photo url :"+value)
      }
    }
  },
  about:{
    type:String,
    default:"this is a default description",
  },
  skills:{
    type:[String],
  }
},
{
timestamps:true,
}
);
module.exports = mongoose.model("User", userSchema); //model name and schema
