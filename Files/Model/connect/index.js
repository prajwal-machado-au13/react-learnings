const mongoose=require("mongoose")
const uri='mongodb://localhost:27017/forntEndcc'
const connect=async()=>{
    try{
        await mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology: true})

    }
    catch(e){
        console.log(error)
    }
}
export default connect