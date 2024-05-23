import channelModel from "../models/channelChatModel.js";
import userModel from "../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";
import HandleError from "../utils/handleError.js";
import tokenDecode from "../utils/tokenDecoded.js";

// groupCn
export const createGroup = catchAsync(async (req,res,  next) => {});
export const deleteGroup = catchAsync(async (req,res,  next) => {});
export const updateGroup = catchAsync(async (req,res,  next) => {});

// channelCn
export const createChannel = catchAsync(async (req,res,  next) => {
  const { id } = tokenDecode(req.headers);
  const { channelName, userName } = req.body;
  
  const img = "/media/" + req?.file?.filename;
  if (!channelName) return new HandleError("pls provide a name for ur channel");

  if (!userName) return new HandleError("pls provide a name for ur channel");

  const newChannel = await channelModel.create({
    ...req.body,
    owner: id,
    channelImg: req?.file?.filename ? img : "",
    members: [id],
  });

  if(newChannel){const updateUser=await userModel.findByIdAndUpdate(id,{$push:{channelMembership:newChannel._id}},{new:true})}
  
  return res.status(200).json({
    status:'success',
    data:newChannel,
    
  })
});

export const updateChannel = catchAsync(async (req, res, next) => {
  const {id}=tokenDecode(req.headers)
  const {channelId,...others}=req.body
  const img = "/media/" + req?.file?.filename;
  const channel=channelModel.findById(channelId)
  if(req?.body?.userName){
   const channels=channelModel.find({userName:req.body.userName})
   if(channels){return next (new  HandleError('username already exist',400))}
  }
  if(channel?.owner===id){
    const updatedChannel=channelModel.findByIdAndUpdate(channelId,{...others,channelImg:req?.file?.filename&&{$push:{channelImg:img}}},{new:true})
  }

});
export const deleteChannel = catchAsync(async (req, res, next) => {});

// privetChatCn
export const createPrivetChat = catchAsync(async (req, res, next) => {});

export const deletePrivetChat = catchAsync(async (req, res, next) => {});