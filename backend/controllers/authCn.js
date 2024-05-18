import userModel from "../models/userModel"

export const Otp=(res,req,next)=>{
    

}
export const checkOtp=(res,req,next)=>{

}
export const Register=async(res,req,next)=>{
const {name,phone}=req.body
if(!name || !phone){
    return  next(res.status(400).json({
        status:'failed',
        massage:'pls provide phone and name'
    }))

    const newUser=userModel.create({
        name,
        number:phone
    })
    return res.status(200).json({
        status:'success',
        Data:{
            newUser,
            token
        }
    })
}




const newUser=await userModel.create()
return

}