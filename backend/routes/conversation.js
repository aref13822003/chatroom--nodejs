import express from 'express'
import { createChannel, createGroup, deleteChannel, deleteGroup, deleteGroupMembers, deleteMembers, updateChannel, updateChannelMembers, updateGroup, updateGroupMember } from '../controllers/conversationCn.js';
import upload from '../utils/UploadFile.js';
 const conversationRouter=express.Router();
 
 conversationRouter.route('/group').post(upload.single('file'),createGroup).delete(deleteGroup).patch(updateGroup)
 conversationRouter.route('/group/settings').delete(deleteGroupMembers).patch(updateGroupMember)
 conversationRouter.route('/channel').post(upload.single('file'),createChannel).delete(deleteChannel).patch(updateChannel)
 conversationRouter.route('/channel/settings').delete(deleteMembers).patch(updateChannelMembers)
 conversationRouter.route('/privet').post().delete().patch()

 export default conversationRouter