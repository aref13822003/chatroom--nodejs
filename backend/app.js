import express  from "express";
import morgan from "morgan";

const app=express()
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))


// routes
app.use('/auth',)
app.use('/conversation',)