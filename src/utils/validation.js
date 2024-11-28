
const validator=require("validator")
const validateSignUpData=(req)=>{
 const {firstName,lastName,emailId,password}=req.body;

 if(!firstName || !lastName){
    throw new Error("Name is not present")
 }
 else if(firstName.length<2 && firstName.length>50  ){
    throw new Error("Name length are not valid")
 }
 else if(!validator.isEmail(emailId)){
    throw new Error("Email is not valid")
 }
 else if(!validator.isStrongPassword(password)){
    throw new Error("Please strong password")
 }

}

module.exports={
    validateSignUpData,
};