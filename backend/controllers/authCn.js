import userModel from "../models/userModel.js";
import { sendCode, validateCode } from "../utils/OtpSms.js";
import catchAsync from "../utils/catchAsync.js";
import HandleError from "../utils/handleError.js";
import jwt from 'jsonwebtoken'
export const Otp = catchAsync(async(req, res, next) => {
//  console.log(req.body)
  const { phone } = req.body;
console.log(phone)
  const codeData =await sendCode(phone);
  if (codeData.success) {
    return res.status(200).json({
      status: "success",
      massage: "code successfully sended",
      data:{phone:phone}
    });
  } else {
    return next(new HandleError(codeData.message, 400));
  }
});

export const checkOtp = catchAsync(async (req,res,next) => {
  const { phone, code } = req.body;
  try {
    const user = await userModel.findOne({ phone }).populate("channelMembership");
    console.log(user)
    const validateOtp =await validateCode(user.phone, code);
    if (validateOtp.success) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
      return res.status(200).json({
        status: "success",
        data: {
          user,
          token,
        },
        message: `welcome back ${user.name}`,
      });
    } else {
      return next(new HandleError("code is wrong", 401));
    }
  } catch (err) {
    console.log(phone)
    const validateOtp =await validateCode(phone, code);
    if (validateOtp.success) {
      return res.status(200).json({
        status: "success",

        message: `ty for joining use pls fill some other filed to complete ur registration`,
      });
    } else {
      return next(new HandleError("code is wrong", 401));
    }
  }
});

export const Register = catchAsync(async ( req,res, next) => {
  const { name, phone } = req.body;
  if (!name || !phone) {
    return next(new HandleError("pls provide phone and name", 400));
  }
  try {
    const newUser =await  userModel.create({
      name,
      phone
    });
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    return res.status(200).json({
      status: "success",
      data: {
        token,
        newUser,
      },
      message: "welcome to our chat",
    });
  } catch (err) {
    return new HandleError('something went wrong',401);
  }
});
