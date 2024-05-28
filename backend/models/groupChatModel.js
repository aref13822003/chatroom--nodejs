import mongoose from "mongoose";

const groupSchema = mongoose.Schema(
  {
    groupName: {
      type: String,
      required: [true, "pls provide a channel name"],
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "who is the creator"],
    },
    userName: {
      type: String,
      default: "",
      unique: [true, "userName is already exist"],
    },
    groupImg: {
      type: [String],
    },
    title: { type: String, default: "" },
    members: { type: [mongoose.Schema.ObjectId], ref: "User", default: [] },
    admins: { type: [mongoose.Schema.ObjectId], ref: "User", default: [] },
  },
  { timestamps: true }
);
const groupModel = mongoose.model("Group", groupSchema);
export default groupModel;
