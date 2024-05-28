import express from 'express'
import { createChannel, deleteChannel, deleteMembers, updateChannel, updateChannelMembers } from '../controllers/conversationCn.js';
import upload from '../utils/UploadFile.js';
 const conversationRouter=express.Router();
 
 conversationRouter.route('/privet').post().delete()
 conversationRouter.route('/channel').post(upload.single('file'),createChannel).delete(deleteChannel).patch(updateChannel)
 conversationRouter.route('/channel/settings').delete(deleteMembers).patch(updateChannelMembers)
 conversationRouter.route('/groups').post().delete().patch()

 export default conversationRouter