import express from 'express'
import { createChannel, updateChannel } from '../controllers/conversationCn.js';
import upload from '../utils/UploadFile.js';
 const conversationRouter=express.Router();
 
 conversationRouter.route('/privet').post().delete()
 conversationRouter.route('/channel').post(upload.single('file'),createChannel).delete().patch(updateChannel)
 conversationRouter.route('/groups').post().delete().patch()

 export default conversationRouter