import mongoose from "mongoose";

const channelSchema=mongoose.Schema({
    channelName:{
        type: String,
        required: [true,'pls provide a channel name']

    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,ref:'User',
        required: [true,'who is the owner']
    },
    userName:{
        type: String,
        required: [true,'to create a channel u must provide username'],
        unique:[true,'userName is already exist'],
    },
    channelImg:{
        type: String,
    },
    title:{ type: String,default:''},
    members:{type: [mongoose.Schema.ObjectId], ref: "User",default:[]},
    admins: { type: [mongoose.Schema.ObjectId], ref: "User" ,default:[]},

} ,{ timestamps: true })
const channelModel=mongoose.model('Channel',channelSchema)
export default channelModel