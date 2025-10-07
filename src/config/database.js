// const mongoose=require("mongoose")

// const connectDB=async()=>{
//     await mongoose.connect(
//         "mongodb+srv://kartikkushwah1411:Sushilkushwah@sushilnode.gxkj2.mongodb.net/devTinder"
//     ,{
//         useNewUrlParser:true,
//         useUnifiedTopology:true,
//         keepAlive:true,
//         keepAliveInitialDelay:300000,

//     }
// );
// }
// module.exports={connectDB}

const mongoose = require("mongoose");//mongoose functions always returns a PROMISE so we use async and await

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://kartikkushwah1411:Sushilkushwah@sushilnode.gxkj2.mongodb.net/devTinder"
      // "mongodb+srv://sushildatabase1411:Sushil1411@sushilnode.z5tfj.mongodb.net/devtender"
    );
    // console.log("Database connection established successfully...");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1); // Exit the process if the connection fails
  }
};

module.exports = { connectDB };

// const mongoose = require("mongoose");

// const connectDB = async () => {
//   try {
//     await mongoose.connect(
//       "mongodb+srv://kartikkushwah1411:Sushilkushwah@sushilnode.gxkj2.mongodb.net/devTinder"
//     );
//     console.log("Database is connected with mongoose successfully");
//   } catch (error) {
//     console.error("connection failed",error.message)
//   }
// };

// module.exports=connectDB;
