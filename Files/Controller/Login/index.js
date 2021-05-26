import { validationResult } from "express-validator";
import userModel from "../../Model/userModel";
const jwt  = require('jsonwebtoken')
const login = {
  postLogin: async (req, resp) => {
      try{
    let err=validationResult(req)
    if(!err.isEmpty()){
        let error=err.array()
        err={}
        for(let i=0;i<error.length;i++){
            err[error[i].param]=error[i].msg
        }
        return resp.json({
            data:[],
            err
        })
    }
    let presentUser=await userModel.findOne({email:req.body.email})
    if(!presentUser){
        return resp.json({
            data:[],
            err:{
                email:'user is not present'
            }
        })
    }
    if(presentUser.password!=req.body.password){
        return resp.json({
            data:[],
            err:{
                password:'enter teh correct password'
            }
        })
    }
    let token=await jwt.sign({id:presentUser._id},'zzz')
    resp.cookie('token',token)
    return resp.json({
        presentUser,token
    })
}
catch(e){
    console.log(e.message)
    return resp.json({
        data:[],
        err:'some error'
    })
}

  }
};
export default login
