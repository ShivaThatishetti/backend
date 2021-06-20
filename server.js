//create express
const exp=require("express")
const app=exp()

//import apis
const userApi=require('./APIs/user-API')
const proApi=require('./APIs/product-API')

//connect server
const path1=require("path")
//connect angular with express server
app.use(exp.static(path1.join(__dirname,'./dist/backend-Angular')))

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
port=2000
app.listen(port,()=>{console.log(`server listening on port ${port}`)})