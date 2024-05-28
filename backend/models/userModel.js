import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  phone: {
    type: String,
    required: [true, "number is required"],
    unique: [true, "this number already exist"],
    match: [
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/gm,
      "phone number invalid",
    ],
  },
  name: { type: String, 
    required: [true, "Name is required"],
     trim: true 
    },
  username: {
    type: String,
    default:'',
    trim: true,
  },
  bio:{
    type :String,
    default:""
  },
  profileImage: { type:[String]},
channelMembership: { type:[ mongoose.Schema.Types.ObjectId], ref: "Channel" ,default:[]},
});
const userModel = mongoose.model("User", userSchema);
export default userModel;
