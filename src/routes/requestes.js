const express=require("express")
const {userAuth}=require("../middlewares/auth");
const ConnectionRequest=require("../middlewares/models/connectionRequest");
const { User } = require("../middlewares/models/user");
const requestRouter=express.Router()


requestRouter.post("/request/send/:status/:toUserId",userAuth,async(req,res)=>{
try{ 
  const fromUserId=req.user._id;
  const toUserId=req.params.toUserId;
  const status=req.params.status;

  const allowedStatus=["ignored","interested"];
  if(!allowedStatus.includes(status)){
   return res.status(400).json({message:"Invalid status type : "+ status})
  }

  const touser=await User.findById(toUserId);
  if(!touser){
    return res.status(404).send({message:"User not found"})
  }

  //if there is an exsiting/again sent connectionrequest
   const existingConnectionRequest=await ConnectionRequest.findOne({
    $or:[
      {fromUserId,toUserId},
      {fromUserId:toUserId,toUserId:fromUserId},
    ]  
   });
  
   if(existingConnectionRequest){
    return res
    .status(400)
    .send({message:"Connection request already exists!"})
   }

  const connectionRequest = new ConnectionRequest({
    fromUserId,
    toUserId,
    status,
  })

  
  const data=await connectionRequest.save();

  res.json({
    message: req.user.firstName + " is " + data.status + " at " + touser.firstName,
    data,
  })
}
  catch(err){
    res.status(400).send("ERROR" + err.message)

  }
  })

requestRouter.post("/request/review/:status/:requestId",userAuth,async(req,res)=>{
                                          //requestId is of mongo connectionrequest id (not the fromUserId)
  try {
    const {status,requestId}=req.params;
      const loggedInUser=req.user;
  const  allowedStatus=["accepted","rejected"]
  if(!allowedStatus.includes(status)){
    return res.status(400).json({message:"Status not allowed"})
  }

  const connectionRequest=await ConnectionRequest.findOne({
    _id:requestId,
    toUserId:loggedInUser._id,
    status:"interested",
  })
     if(!connectionRequest){
    return res.status(400).json({message:"Connection  request not found"})
  }

  connectionRequest.status=status//updating the status interested->accepter

const data=await connectionRequest.save();
res.json({
  message:"Connection request "+status,
  data
})

  //loggedInUser=toUserid
  //status=interested
  //request id should be valid in db

  } catch (err) {
    res.status(400).send("ERROR :"+err.message)
  }

})

 module.exports=requestRouter;
 