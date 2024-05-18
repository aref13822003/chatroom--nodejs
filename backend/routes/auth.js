import express from 'express'
import { Otp, Register, checkOtp } from '../controllers/authCn';
 const authRouter=express.Router();
 
 conversationRouter.route('/').post(Otp)
 conversationRouter.route('/checkOtp').post(checkOtp)
 conversationRouter.route('/Register').post(Register)