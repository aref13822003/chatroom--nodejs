import express from 'express'

import { deleteAccount, deleteProfileImage, getAllProfileImages, updateImageProfile, updateProfile } from '../controllers/userCn.js';
import upload from '../utils/UploadFile.js';
 const userRouter=express.Router();
 
 userRouter.route('/').patch(updateProfile).delete(deleteAccount)
 userRouter.route('/profile-img').patch(upload.single('file'),updateImageProfile).get(getAllProfileImages).delete(deleteProfileImage)


 export default userRouter