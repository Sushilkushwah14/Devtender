

const express=require("express")
const app=express();

app.use("/test",(req,res)=>{
    res.send("Hello form the server to web")
})

app.get("/33",(req,res)=>{
    res.send("this is by get method")
})

app.use("/hello",(req,res)=>{
    res.send("hello hello.")
})

app.listen(3000,()=>{
    console.log("Server running successfully on 3000..."); 
})//we are listening the request.