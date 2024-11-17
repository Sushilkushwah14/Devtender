

const express=require("express")
const app=express();
const PORT=3000;
// app.use("/ab?c",(req,res)=>{
//     res.send("b is optional")
// })
// app.use("/ab+c",(req,res)=>{
//     res.send("b can be howmuch")
// })

// app.use("/ab*c",(req,res)=>{
//     res.send("anthing can be between ab and c")
// })


// app.use("/a(bc)?d",(req,res)=>{
//     res.send("bc is optional")
// })

// app.get("/user",(req,res)=>{
//     console.log(req.query);//for query at api request time
//     res.send({firstName:"Sushil",LastName:"Kushwah"})
//     })
//     app.get("/user/:userId/:name/:loc",(req,res)=>{
//         console.log(req.params);//for params at api dynamic request time
//         res.send("user id direct passing and dynamic routing")
        
//     })


// app.get("/user",(req,res)=>{
//     console.log(req.query);
//     res.send({firstName:"Sushil",LastName:"Kushwah"})
    
// })


// app.get("/33/23",(req,res)=>{
//     res.send("this is by get method")
// })

// app.get("/user",(req,res)=>{
//     res.send({firstName:"Sushil",LastName:"Kushwah"})
// })

// app.post("/user",(req,res)=>{
//     //saving data to the database
//     res.send("Data successfully saved to the database")
// })

// app.use("/user",(req,res)=>{
//     res.send("HAHAHAHAH")
// })

// app.delete("/user",(req,res)=>{
//     //To delete data form database
//     res.send("data deleted successfully")
// })

// app.use("/",(req,res)=>{
//     res.send("only by / ")
// })//it is by default type of rout,after"/" anything then this will be executed
// app.use("/hello",(req,res)=>{
//     res.send("hello hello.")
// })


//****Handling the routers****//
// app.use("/routers",[r1,r2,r3,r4,r5])
// res.send("1st response") are called request handlers
//("/user",[(req,res,next)=>{
    // res.send("1st response")
    //} this whole is called middlewares


//***handle Auth Middleware for only all GET,Post,Patch.. request ***/
    // const {adminauth}=require("./middlewares/auth")
    // const {usernauth,Admin}=require("./middlewares/auth")


    // app.use("/admin",adminauth);

    // app.post("/admin/login",(req,res)=>{
    //   res.send(" user logged in successfully")
    // })
        
        // Route to get all admin data
        // app.get("/admin/getAllData", usernauth,(req, res) => {
        //   res.send("All data is sent");
        // });
        
        // Route to delete a user
        // app.get("/admin/deleteUser", Admin,(req, res) => {
        //   res.send("User data deleted");
        // });
      app.get("/getUserData", (req, res) => {
         //logic of Db callling and get userdata
       
         throw new Error("fkhahlkeh")   
       
         res.send("user data is sent");
        });
        app.use("/",(err,req,res,next)=>{
              if(err){
                res.status(500).send("something went wrong")
              }
        })


app.listen(PORT,()=>{
    console.log("Server running successfully on 3000..."); 
})//we are listening the request.