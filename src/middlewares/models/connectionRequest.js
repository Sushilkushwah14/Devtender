const mongoose=require("mongoose")


const sendConnectionRequestSchema=new mongoose.Schema({
 
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"User",
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"User",
    },
    status:{
        type:String,
        require:true,
        enum:{
            values:["ignored","interested","accepted","rejected"],
            message:`{VALUE} is not supported`,
        }
    },


},
{
    timestamps:true
}
)

//compound indexing is when the query with this two is performed will executed very fast,it optimizes the searching   
sendConnectionRequestSchema.index({fromUserId:1,toUserId:1})

//checking if the fromUserId is same as toUserId
sendConnectionRequestSchema.pre("save",function(next){
    const connectionRequest=this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Cannot send connection request to yourself!")
    }
    next();
})

const ConnectionRequestModel=new mongoose.model("ConnectionRequest",sendConnectionRequestSchema)
// mongoose.exports=new mongoose.model("sendconnectionRequest",sendConnectionRequestSchema);
module.exports=ConnectionRequestModel;