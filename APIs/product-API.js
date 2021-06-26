//create mini express
const exp=require("express")
const proApi=exp.Router()
proApi.use(exp.json())
//errorhandler
const ErrorHandler=require("express-async-handler")
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
const productsStorage=new CloudinaryStorage({
    cloudinary:cloudinary,
    params:async(req,file)=>{
        return {
        folder:"Products Profiles",
        public_id:file.fieldname+'-'+Date.now()
        }
    }
})
//configure multer
const multerObj=multer1({storage:productsStorage})

//GET http://localhost:2000/products/getproducts
proApi.get("/getproducts",ErrorHandler(async(req,res)=>{
    let collectionObj=req.app.get("productCollectionObj")
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
    let collectionObj=req.app.get("productCollectionObj")
        let pId=(+req.params.id)
    let proObj=await collectionObj.findOne({pid:pId})
    if(proObj===null)
    {
        res.send({message:"Product not found"})
    }
    else
    {
        res.send({message:proObj})
    }
}))

//POST http://localhost:2000/products/createproduct 
proApi.post("/addProduct",multerObj.single('image'),ErrorHandler(async(req,res)=>{
    let collectionObj=req.app.get("productCollectionObj")
    let newProduct=JSON.parse(req.body.proObj)
    let proObj= await collectionObj.findOne({productname:newProduct.productname})
    if(proObj===null)
    {
        newProduct.image=req.file.path
        delete newProduct.photo
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
    let collectionObj=req.app.get("productCollectionObj")
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
proApi.delete("/deleteproducts/:name",ErrorHandler(async(req,res)=>{
    let collectionObj=req.app.get("productCollectionObj")
    let nm=req.params.name
    let proObj=await collectionObj.findOne({productname:nm})
    if(proObj===null)
    {
        res.send({message:"Product not found"})
    }
    else
    {
        await collectionObj.deleteOne({productname:nm})
        res.send({message:"Product deleted successfully"})
    }
}))





//export
module.exports=proApi