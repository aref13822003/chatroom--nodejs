import express from 'express'
 const conversationRouter=express.Router();
 
 conversationRouter.route('/privet').post().delete()
 conversationRouter.route('/channel').post().delete().patch()
 conversationRouter.route('/groups').post().delete().patch()