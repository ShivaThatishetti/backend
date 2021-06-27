//create express
const exp=require("express")
const app=exp()

//env import
require("dotenv").config()

//import apis
const userApi=require('./APIs/user-API')
const proApi=require('./APIs/product-API')

//connect backend
const path1=require("path")
//connect angular with express server
app.use(exp.static(path1.join(__dirname,'./dist/backend-Angular')))

//import MongoClient
const mc=require("mongodb").MongoClient
//connection string
const databaseUrl=process.env.DATABASE_URL

let databaseObj
//connect to database
mc.connect(databaseUrl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client)=>{
    if(err)
    {
        console.log("Error in db connection users:",err)
    }
    else
    {
        //database object
        databaseObj=client.db("myFirstDB")
        
        //create user collection obj
        userCollectionObj=databaseObj.collection("My_first_collection")
        app.set("userCollectionObj",userCollectionObj)
        //create product collection obj
        productCollectionObj=databaseObj.collection("products")
        app.set("productCollectionObj",productCollectionObj)
        //user cart collection
        usercartCollectionObj=databaseObj.collection("usercart")
        app.set("usercartCollectionObj",usercartCollectionObj)
        //admin collection
        adminCollectionObj=databaseObj.collection("admins")
        app.set("adminCollectionObj",adminCollectionObj)

        console.log("Connected to database")
    }
})

//excute specific apis
app.use("/users",userApi)
app.use("/products",proApi)

//invalid api path
app.use((req,res)=>{
    res.send({message:`invalid path ${req.url} `})
})
//error handling middleware
app.use((err,req,res,next)=>{
    res.send({message:`error is ${err.message}`})
})

//assign port
port=process.env.PORT ||8000;
app.listen(port,()=>{console.log(`server listening on port ${port}`)})