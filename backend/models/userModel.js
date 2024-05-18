import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  number: {},
  name: {},
  username: {},
  profileImage: {},
  membership:{},



});
const userModel=mongoose.model('user',userSchema)
export default userModel