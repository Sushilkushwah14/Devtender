const validator = require("validator");

// const validateSignUpData = (req) => {
//   const { firstName, lastName, emailId, password } = req.body;

//   if (!firstName || !lastName) {
//     throw new Error("Name is not present");
//   } else if (firstName.length < 2 && firstName.length > 50) {
//     throw new Error("Name length are not valid");
//   } else if (!validator.isEmail(emailId)) {
//     throw new Error("Email is not valid");
//   } else if (!validator.isStrongPassword(password)) {
//     throw new Error("Please strong password");
//   }
// };

const validateSignUpData=(req)=>{
  const {firstName,lastName,emailId,password}=req.body;
  if(!firstName ||!lastName){
    throw new Error("Name is not present")
  }else if(firstName.length<2 && lastName.length>40){
throw new Error("Name length is not valid")
  }else if(!validator.isEmail(emailId)){
    throw new Error("Entered emailid is not valid")
  }else if(!validator.isStrongPassword(password)){
    throw new Error("Password is not too strong!!")
  }
}

// const validateProfileData=(req)=>{
//   const allowededitData=[
//     "firstName",
//     "lastName",
//     "age",
//     "skills",
//     "photoUrl",
//     "about",
//     "gender",
//   ]
//   const isEditedData=Object.keys(req.body).every((key)=>{
//     allowededitData.includes(key)
//   })
//   return isEditedData
// }

const validateProfileData = (req) => {
  

  const allowedEditFields =[
    "firstName",
    "lastName",
    "age",
    "emailId",
    "skills",
    "photoUrl",
    "about",
    "gender",
  ];
  const isEditAllowed = Object.keys(req.body).every((fields) =>
    allowedEditFields.includes(fields)//ever key(field)"which is form input browser" is present in allowedEditFields and isEditAllowed will return a boolean value means true(can edit) or false
  );
return isEditAllowed//returns a boolean value if it is made from this like  Object.keys(req.body).every((fields) =>........);
};


const validateProfileForgotPassword=(req)=>{
  const allowedEditPassword=[
    "password",
  ]
const isEditPasswordAllowed=Object.keys(req.body).every((password)=>{
  allowedEditPassword.includes(password)
})
return isEditPasswordAllowed
}


module.exports = {
  validateSignUpData,
  validateProfileData,
  validateProfileForgotPassword,
};
