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
//const multerObj=multer1({storage:CloudinaryStorage})
const multerObj1=multer1({storage:usersStorage})


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
const multerObj2=multer1({storage:productsStorage})


module.exports=multerObj1;
module.exports=multerObj2;
