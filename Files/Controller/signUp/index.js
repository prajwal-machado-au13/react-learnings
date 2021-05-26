const jwt=require('jsonwebtoken')
const mongoose=require('mongoose')
import userModel from "./../../Model/userModel"
const signUp={
    singUpRequest:async(req,resp)=>{
        try{
            let presentUser=await userModel.findOne({email:req.body.email})
            if(presentUser){
                return resp.json({
                    data:req.body.email,
                    msg:'email is alredy present'
                })
            }
            let newUser=new userModel({
                ...req.body
            })
            await newUser.save()
            let token=await jwt.sign({id:userModel._id},'zzz')
            resp.cookie('token',token)
            return resp.json({
                newUser,
                token
            })
        }
        catch(e){
            if(e){
                if(e instanceof mongoose.Error.ValidationError){
                    let fields={}
                    for(let field in e.errors ){
                        fields[field]=e.errors[field].message
                    }
                    return resp.json({
                        data:[],
                        err:fields
                    })
                }
                else{
                    return resp.json({
                        data:[],
                        err:e.message
                    })
                }
            }
        }
    }
}
export default signUp