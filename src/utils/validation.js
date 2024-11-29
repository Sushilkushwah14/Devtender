const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is not present");
  } else if (firstName.length < 2 && firstName.length > 50) {
    throw new Error("Name length are not valid");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please strong password");
  }
};

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
    allowedEditFields.includes(fields)//ever key(field) is present in allowedEditFields and isEditAllowed will return a boolean value means true(can edit) or false
  );
return isEditAllowed//returns a boolean value if it is made from this like  Object.keys(req.body).every((fields) =>........);
};

module.exports = {
  validateSignUpData,
  validateProfileData,
};
