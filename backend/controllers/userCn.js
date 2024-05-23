import catchAsync from "../utils/catchAsync.js";
import jwt from 'jsonwebtoken'
import tokenDecode from "../utils/tokenDecoded.js";
import userModel from "../models/userModel.js";
import HandleError from "../utils/handleError.js";
export const updateImageProfile = catchAsync(async (req,res,  next) => {
    const {id}=tokenDecode(req.headers)
    const img='/media/'+req?.file?.filename
    const updateImg=await userModel.findByIdAndUpdate(id,{$push:{profileImage:img}},{new:true})
    return res.status(200).json({
        status:'success',
        data:updateImg
    })
});


export const updateProfile = catchAsync(async (req,res,  next) => {
  
const {id}=tokenDecode(req.headers)
// const {id}=jwt.verify(req.headers.authorization.split(' ')[1],process.env.JWT_SECRET)
// console.log(id)
const {bio,username}=req.body

if(!username && !bio){return next(new HandleError('pls provide more info',400))}

 
const updateUser=await userModel.findByIdAndUpdate(id,{...req.body},{new:true})
return res.status(200).json({
    status:'success',
    data:updateUser
})
});


export const deleteAccount = catchAsync(async (req,res,  next) => {
    const {id}=tokenDecode(req.headers)
    if(id==='invalid'){
        return next(new HandleError('invalid token',401))
    }else{
        await userModel.findByIdAndDelete(id)
        return res.status(200).json({
            status:'success',
            message:'account successfully deleted'
        })
    }
});
// 
export const deleteProfileImage = catchAsync(async (req,res,  next) => {
    const {id}=tokenDecode(req.headers)

    const {imgNum=null}=req.body
    if(!imgNum){return new HandleError('pic index is require')}
    const user=await userModel.findById(id)
    user.profileImage.splice(imgNum,1)
    const newUser=await userModel.findByIdAndUpdate(id,{profileImage:user.profileImage},{new:true}).select('-__v')
    return res.status(200).json({
        status:'success',
        data:newUser
    })
    });


    
export const getAllProfileImages = catchAsync(async (req,res,  next) => {
    const {id}=tokenDecode(req.headers)
    const user=await userModel.findById(id)
    const profileImage=user?.profileImage
    return res.status(200).json({
        status:'success',
        data:profileImage
    })
    });