const express=require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../middlewares/models/connectionRequest");
const authRouter = require("./auth");
const {User}=require("../middlewares/models/user")

const userRouter=express.Router();


//Get all the pending connection requests for the loggedIn user
userRouter.get("/user/request/recieved",userAuth,async(req,res)=>{
try {

    const loggedInUser=req.user;

     const connectionRequest=await ConnectionRequest.find({
        toUserId:loggedInUser._id,
        status:"interested",
     }).populate("fromUserId","firstName lastName phototUrl skills")
    //    .populate("fromUserId",["firstName","lastName"])
     res.json({
        message:"Data fetched successfully",
        data:connectionRequest,
    })
    
} catch (err) {
    req.statusCode(404).send("ERROR :"+err.message)
}

})


const User_safe_data="firstName lastName age gender about skills phototUrl";
userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", User_safe_data)
      .populate("toUserId", User_safe_data);

      const data=connectionRequests.map((row)=>{
        if(row.fromUserId._id.equals(loggedInUser._id)){
            return row.toUserId
        }
        return row.fromUserId;
      });

    res.json({
      message: "All accepted connections",
      data,
    });
  } catch (err) {
    res.status(404).send({ message: err.message });
  }
});


userRouter.get("/feed",userAuth,async(req,res)=>{

  try {
    
    //user should see all connections cards except 
//0.his own card
//1.his connections
//2.ignored peoples
//3.already sent the connection requests

const loggedInUser=req.user;

const page=parseInt(req.query.page) || 1;
let limit=parseInt(req.query.limit) || 10;
limit=limit > 50 ? 50 : limit;
const skip=(page-1)*limit;

const connectionRequests=await ConnectionRequest.find({
  $or:[
    {fromUserId : loggedInUser._id},{toUserId : loggedInUser._id}],
}).select("fromUserId toUserId")

const hideUsersFromFeed=new Set();
// connectionRequests.forEach((req) => {
//   hideUsersFromFeed.add(req.fromUserId.toString());
//   hideUsersFromFeed.add(req.toUserId.toString());
// });

connectionRequests.forEach((request) => {
  if (request.fromUserId) {
    hideUsersFromFeed.add(request.fromUserId.toString());
  }
  if (request.toUserId) {
    hideUsersFromFeed.add(request.toUserId.toString());
  }
});

const users=await User.find({
$and :[
  {_id : {$nin : Array.from(hideUsersFromFeed)}},
  {_id :{$ne : loggedInUser._id}},
],
}).select(User_safe_data).skip(skip).limit(limit);

res.json({data : users})

// console.log(hideUsersFromFeed);

//find all connections request (sent + recieved) ;will not be seen in the feed

  } catch (err) {
    res.status(404).send("ERROR :"+ err.message)
  }

  
})


module.exports=userRouter;