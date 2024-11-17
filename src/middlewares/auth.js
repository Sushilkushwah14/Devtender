 const adminauth=(req,res,next)=>{
    console.log("Admin auth is getting checked");
    
    const token="1"
    const isAdminAuthorized=token==="1";
    if (!isAdminAuthorized) {
        return res.status(401).send("Unauthorized access");
      }
    
  console.log("Authorization passed");
      next(); // Proceed to the next middleware or route handler
}

 const usernauth=(req,res,next)=>{
    console.log("user auth is getting checked");
    
    const token="2"
    const isAdminAuthorized=token==="2";
    if (!isAdminAuthorized) {
        return res.status(401).send("Unauthorized user access");
      }
    
      next(); // Proceed to the next middleware or route handler
}
 const Admin=(req,res,next)=>{
    console.log("user auth is getting checked");
    
    const token="3"
    const isAdminAuthorized=token==="3";
    if (!isAdminAuthorized) {
        return res.status(401).send("Unauthorized user access not admin cannot delete the user data");
      }
    
      next(); // Proceed to the next middleware or route handler
}
module.exports={
    adminauth,
usernauth,
Admin,
}