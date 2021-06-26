let jwt=require("jsonwebtoken")
const checkToken=(req,res,next)=>{
    //get token from 
    let tokenWithBearer=req.headers.authorization
    let token=tokenWithBearer
    //if token not exist
    if(token===undefined)
    {
        return res.send({message:"Un auhtorize access"})
    }
    //if token is exiestd verified
    else
    {
         token=tokenWithBearer.split(" ")[1]
        jwt.verify(token,process.env.SECRET,(err,decoded)=>{
            if(err)
            {
                return res.send({message:"Session expired login again to continue"})
            }
            else
            {
                next()
            }
        })
    }
}


module.exports=checkToken