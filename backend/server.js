import mongoose from "mongoose";
import app from './app.js'
const port=process.env.PORT || 5000

mongoose.connect(process.env.DATA_BASE).then(() => { 
   console.log('db is connected')


 }).catch((err) => { 
    console.log(err)
  })
  app.listen(port,() => { 
   console.log('server running')
})