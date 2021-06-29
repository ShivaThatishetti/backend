//create mini express
const exp=require("express")
const userApi=exp.Router()
//body parsing middle ware
userApi.use(exp.json())
//import env
require("dotenv").config
//bcryptjs for hashing pswrds
const bcrypt=require("bcryptjs")
//json web token
const token=require("jsonwebtoken")
//express error handler
const expressErrorHandler=require("express-async-handler")
//middleware 
const checkToken=require("./middlewares/verifyToken")
//import cloudinary modules
const cloudinary=require("cloudinary").v2
const multer1=require("multer")
const {CloudinaryStorage}=require("multer-storage-cloudinary")
//configure cloudinary
cloudinary.config({
    cloud_name:"dzaifpaib",
    api_key:"173283952955522",
    api_secret:"yWeFctpjNBPUUErFuv1O80nCsk4"
})
//configure multer-storage-cloudinary for users
const usersStorage=new CloudinaryStorage({
    cloudinary:cloudinary,
    params:async(req,file)=>{
        return {
        folder:"Users Profiles",
        public_id:file.fieldname+'-'+Date.now()
        }
    }
})
//configure multer
const multerObj=multer1({storage:usersStorage})


//GET http://localhost:2000/users/getusers
userApi.get("/getusers", expressErrorHandler(async(req,res)=>{
    let collectionObj=req.app.get("userCollectionObj")
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
    let collectionObj=req.app.get("userCollectionObj")
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
userApi.post("/createuser",multerObj.single('image'),expressErrorHandler(async(req,res)=>{
    let collectionObj=req.app.get("userCollectionObj")
    //userObj from formDataObj send by register user
    let newUser=JSON.parse(req.body.userObj)
    let userObj=await collectionObj.findOne({username:newUser.username})
    if(userObj!==null)
    {res.send({message:"User already exiest"})}
    else
    {
        //hash pswrd
        let hashedPswrd=await bcrypt.hash(newUser.password,7)
        newUser.password=hashedPswrd
        //add image path ti daatabase obj
        newUser.profileImage=req.file.path
        delete newUser.photo
        await collectionObj.insertOne(newUser)
        res.send({message:"user successfully created "})
    }

}))

//PUT http://localhost:2000/users/updateuser
userApi.put("/updateuser/:username",expressErrorHandler(async(req,res,next)=>{
    let collectionObj=req.app.get("userCollectionObj")
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
    let collectionObj=req.app.get("userCollectionObj")
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
userApi.post('/loginuser',expressErrorHandler(async(req,res)=>{
    let collectionObj=req.app.get("userCollectionObj")
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
            let signedToken= await token.sign({username:credientials.username},process.env.SECRET,{expiresIn:10})
            //send token to client
            res.send({message:"Login success",username:credientials.username,token:signedToken,userObj:user})
        }
    }
}))
//admin login
userApi.post('/loginadmin',expressErrorHandler(async(req,res)=>{
    let collectionObj=req.app.get("adminCollectionObj")
    let credientials=req.body
    let user=await collectionObj.findOne({username:credientials.username})
    if(user===null)
    {
        res.send({message:"admin not found"})
    }
    else
    {
        if(user.password!==credientials.password)
        {
            res.send({message:"Invalid password"})
        }
        else
        {
            res.send({message:"Login success",username:credientials.username,userObj:user})
        }
    }
}))

//add to cart
userApi.post("/addtocart",expressErrorHandler(async(req,res)=>{
    let collectionObj=req.app.get("usercartCollectionObj")
    let newProObj=req.body
    //find usercart collection
    let userCartObj=await collectionObj.findOne({username:newProObj.username})
    //if user cart obj is not exiest
    if(userCartObj===null)
    {
        let products=[]
        products.push(newProObj.product)
        let newUserCartobj={username:newProObj.username,products}
        //insert to backend
        await collectionObj.insertOne(newUserCartobj)
        let latestCartObj=await collectionObj.findOne({username:newProObj.username})
        res.send({message:"Product added to cart",latestCartObj:latestCartObj})
    }
    else
    {
        //push productObj to products array then update document
        userCartObj.products.push(newProObj.product)
        
        await collectionObj.updateOne({username:newProObj.username},{$set:{...userCartObj}})
        //await collectionObj.insertOne(newUserCartobj)
        let latestCartObj=await collectionObj.findOne({username:newProObj.username})
        res.send({message:"New product added",latestCartObj:latestCartObj})
    }
}))

//get products from user cart
userApi.get("/getproducts/:username",expressErrorHandler(async(req,res)=>{
    let collectionObj=req.app.get("usercartCollectionObj")
    let un=req.params.username
    let userObj=await collectionObj.findOne({username:un})
    
    if(userObj===null)
    {
        res.send({message:"User cart is empty"})
    }
    else{let products=userObj.products; res.send(products)}
}))
//delete product from user cart
userApi.delete("/deleteproducts/:username",expressErrorHandler(async(req,res)=>{
    let collectionObj=req.app.get("usercartCollectionObj")
    let un=req.params.username
    let index=req.body
    let userObj=await collectionObj.findOne({username:un})
    let products=userObj.products
    products.splice(index,1)
    let updateUserCartobj={username:un,products}
    await collectionObj.updateOne({username:un},{$set:{...updateUserCartobj}})
    latestUserObj=await collectionObj.findOne({username:un})
    res.send({message:"Product Successfully Removed",products:products,latestUserObj:latestUserObj})
    
}))

//dummy Router
userApi.get("/testing",checkToken,(req,res)=>{
    res.send({message:"this is protected data"})
})
//exports
module.exports=userApi