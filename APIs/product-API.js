//create mini express
const exp=require("express")
const proApi=exp.Router()
proApi.use(exp.json())
//errorhandler
const ErrorHandler=require("express-async-handler")

//import
const mc=require("mongodb").MongoClient
//database url
const databaseUrl="mongodb+srv://shiva123:shiva123@shiva123.jlecp.mongodb.net/myFirstDB?retryWrites=true&w=majority"

let databaseObj
let collectionObj

//connect to database
/*mc.connect(databaseUrl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client)=>{
    if(err)
    {
        console.log("Error in db connection products:",err)
    }
    else
    {
        //database object
        databaseObj=client.db("myFirstDB")
        //create user collection obj
        collectionObj=databaseObj.collection("products")
        console.log("Connected to database myFirstDB Products")
    }
})*/


//GET http://localhost:2000/products/getproducts
proApi.get("/getproducts",ErrorHandler(async(req,res)=>{
    let productsList=await collectionObj.find().toArray()
    if(productsList.length===0)
    {
        res.send({message:"Products list is empty"})
    }
    else
    {
        res.send(productsList)
    }
}))

//GET http://localhost:2000/products/getproducts/10
proApi.get("/getproducts/:id",ErrorHandler(async(req,res)=>{
    let pId=(+req.params.id)
    let proObj=await collectionObj.findOne({pid:pId})
    if(proObj===null)
    {
        res.send({message:"Product not found"})
    }
    else
    {
        res.send(proObj)
    }
}))

//POST http://localhost:2000/products/createproduct 
proApi.post("/createproduct",ErrorHandler(async(req,res,next)=>{
    let newProduct=req.body
    let proObj= await collectionObj.findOne({pid:newProduct.pid})
    if(proObj===null)
    {
        await collectionObj.insertOne(newProduct)
        res.send({message:"Product successfully created "})
    }
    else
    {
        res.send({message:"product already exiest"})
    }
}))

//PUT http://localhost:2000/products/updateproduct
proApi.put("/updateproduct",ErrorHandler(async(req,res)=>{
    let updateProduct=req.body
    let proObj=await collectionObj.findOne({pid:updateProduct.pid})
    if(proObj===null)
    {
        res.send({message:"Product not found"})
    }
    else
    {
        await collectionObj.updateOne({pid:updateProduct.pid},{$set:{...updateProduct}})
        res.send({message:"Product update successfully"})
    }
}))

//DELETE http://localhost:2000/products/deleteproducts/100
proApi.delete("/deleteproducts/:id",ErrorHandler(async(req,res)=>{
    let pId=(+req.params.id)
    let proObj=await collectionObj.findOne({pid:pId})
    if(proObj===null)
    {
        res.send({message:"Product not found"})
    }
    else
    {
        await collectionObj.deleteOne({pid:pId})
        res.send({message:"Product deleted successfully"})
    }
}))





//export
module.exports=proApi