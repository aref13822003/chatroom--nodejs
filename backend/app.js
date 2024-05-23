import dotenv from 'dotenv';
import express  from "express";
import morgan from "morgan";
import cors from 'cors'
// import routes
import authRouter from './routes/auth.js';
import userRouter from './routes/user.js';
import catchError from './utils/catchError.js';
import conversationRouter from './routes/conversation.js';
dotenv.config({path:'./config.env'})

const app=express()
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))


// routes
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/user',userRouter)

app.use('/api/v1/conversation',conversationRouter)

app.use('*',(req,res,next)=>{
    return next(new HandleError('route not found',404))
})

app.use(catchError)
export default app