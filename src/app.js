

const express=require("express")
const app=express();

app.use("/ab?c",(req,res)=>{
    res.send("b is optional")
})
app.use("/ab+c",(req,res)=>{
    res.send("b can be howmuch")
})

app.use("/ab*c",(req,res)=>{
    res.send("anthing can be between ab and c")
})


app.use("/a(bc)?d",(req,res)=>{
    res.send("bc is optional")
})

app.get("/user",(req,res)=>{
    console.log(req.query);//for query at api request time
    res.send({firstName:"Sushil",LastName:"Kushwah"})
    })
    app.get("/user/:userId/:name/:loc",(req,res)=>{
        console.log(req.params);//for params at api dynamic request time
        res.send("user id direct passing and dynamic routing")
        
    })

    
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

app.listen(3000,()=>{
    console.log("Server running successfully on 3000..."); 
})//we are listening the request.