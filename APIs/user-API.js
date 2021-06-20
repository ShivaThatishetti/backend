//create mini express
const exp=require("express")
const userApi=exp.Router()
//body parsing middle ware
userApi.use(exp.json())
//bcryptjs for hashing pswrds
const bcrypt=require("bcryptjs")
//json web token
const token=require("jsonwebtoken")
//express error handler
const expressErrorHandler=require("express-async-handler")
//import MongoClient
const mc=require("mongodb").MongoClient
const { Router } = require("express")
//connection string
const databaseUrl="mongodb+srv://shiva123:shiva123@shiva123.jlecp.mongodb.net/myFirstDB?retryWrites=true&w=majority"
//middleware 
const checkToken=require("./middlewares/verifyToken")


let databaseObj
let collectionOb
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
        collectionObj=databaseObj.collection("My_first_collection")
        console.log("Connected to database myFirstDB users")
    }
})

//GET http://localhost:2000/users/getusers
userApi.get("/getusers", expressErrorHandler(async(req,res)=>{
      let userList= await collectionObj.find().toArray()
      if(userList.length===0)
      {
          res.send({message:"Users list is empty"})
      }
      else
      {
        res.send(userList)
      }
}))

//GET http://localhost:2000/users/getusers/Shiva
userApi.get("/getusers/:username",expressErrorHandler(async(req,res)=>{
    let un=req.params.username
    let userObj=await collectionObj.findOne({username:un})
    if(userObj===null)
    {
        res.send({message:"User not existed"})
    }
    else
    {
        res.send(userObj)
    }
}))

//POST http://localhost:2000/users/createuser 
userApi.post("/createuser",expressErrorHandler(async(req,res)=>{
    let newUser=req.body
    let userObj=await collectionObj.findOne({username:newUser.username})
    if(userObj!==null)
    {res.send({message:"User already exiest"})}
    else
    {
        //hash pswrd
        let hashedPswrd=await bcrypt.hash(newUser.password,7)
        newUser.password=hashedPswrd
        await collectionObj.insertOne(newUser)
        res.send({message:"user successfully created "})
    }

}))

//PUT http://localhost:2000/users/updateuser
userApi.put("/updateuser/:username",expressErrorHandler(async(req,res,next)=>{
    let updateUser=req.body
    //update
    let userObj=await collectionObj.findOne({username:updateUser.username})
    if(userObj===null)
    {
        res.send({message:"User not found"})
    }
    else
    {
        await collectionObj.updateOne({username:updateUser.username},{$set:{...updateUser}})
        res.send({message:"User update successfully"})
    }
}))

//DELETE http://localhost:2000/users/deleteusers/10
userApi.delete("/deleteusers/:userName",expressErrorHandler(async(req,res)=>{
    let uName=req.params.userName
    let user=await collectionObj.findOne({username:uName}) 
    if(user===null)
    {
        res.send({message:"User not found"})
    }
    else
    {
        await collectionObj.deleteOne({username:uName})
      res.send({message:"User delete successfully"})
    }
}))

//user login
userApi.post('/login',expressErrorHandler(async(req,res)=>{
    let credientials=req.body
    let user=await collectionObj.findOne({username:credientials.username})
    if(user===null)
    {
        res.send({message:"User not found"})
    }
    else
    {
        let result=await bcrypt.compare(credientials.password,user.password)
        if(result===false)
        {
            res.send({message:"Invalid password"})
        }
        else
        {
            //create token
            let signedToken= await token.sign({username:credientials.username},"abcdef",{expiresIn:10})
            //send token to client
            res.send({message:"Login success",username:credientials.username,token:signedToken,userObj:user})
        }
    }
}))


//dummy Router
userApi.get("/testing",checkToken,(req,res)=>{
    res.send({message:"this is protected data"})
})
//exports
module.exports=userApi