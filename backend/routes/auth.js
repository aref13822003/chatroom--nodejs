import express from 'express'
import { Otp, Register, checkOtp } from '../controllers/authCn.js';
 const authRouter=express.Router()
 
 authRouter.route('/otp').post(Otp)
 authRouter.route('/check-otp').post(checkOtp)
 authRouter.route('/Register').post(Register)


 export default authRouter