import mongoose from "mongoose";
import channelModel from "../models/channelChatModel.js";
import userModel from "../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";
import HandleError from "../utils/handleError.js";
import tokenDecode from "../utils/tokenDecoded.js";

// groupCn
export const createGroup = catchAsync(async (req, res, next) => {});
export const deleteGroup = catchAsync(async (req, res, next) => {});
export const updateGroup = catchAsync(async (req, res, next) => {});

// channelCn
export const createChannel = catchAsync(async (req, res, next) => {
  const { id } = tokenDecode(req.headers);
  const { channelName, userName } = req.body;

  const img = "/media/" + req?.file?.filename;
  if (!channelName) return new HandleError("pls provide a name for ur channel");

  if (!userName) return new HandleError("pls provide a name for ur channel");

  const newChannel = await channelModel.create({
    ...req.body,
    owner: id,
    channelImg: req?.file?.filename ? img : "",
    members: [id],
  });

  const updateUser = await userModel.findByIdAndUpdate(
    id,
    { $push: { channelMembership: newChannel._id } },
    { new: true }
  );

  return res.status(200).json({
    status: "success",
    data: newChannel,
  });
});

export const updateChannel = catchAsync(async (req, res, next) => {
  const { id } = tokenDecode(req.headers);
  const { channelId, ...others } = req.body;
  const img = "/media/" + req?.file?.filename;
  const channel = channelModel.findById(channelId);

  if (channel?.owner === id || channel.admins.includes(id)) {
    if (req?.body?.userName) {
      const channels = channelModel.find({ userName: req.body.userName });
      if (channels) {
        return next(new HandleError("username already exist", 400));
      }
    }
    const updatedChannel = channelModel.findByIdAndUpdate(
      channelId,
      {
        ...others,
        channelImg: req?.file?.filename && { $push: { channelImg: img } },
      },
      { new: true }
    );
    return res.status(200).json({
      status: "success",
      data: updateChannel,
    });
  } else {
    return next(new HandleError("u cant do this action"));
  }
});
export const deleteChannel = catchAsync(async (req, res, next) => {
  const { id } = tokenDecode(req.headers);
  const { channelId } = req.body;
  const channel = channelModel.findById(channelId);
  if (channel.owner === id) {
    channel.members.forEach(async (member) => {
      await userModel.findByIdAndUpdate(
        member,
        {
          $pull: { channelMembership: channel._id },
        },
        { new: true }
      );
    });
    const deleteChannel = await channelModel.findOneAndDelete({ channelId });

    return res.status(200).json({
      status: "success",
      message: "channel deleted ",
    });
  } else {
    channel.members.forEach(async (e) => {
      if (e === id) {
        const user = await userModel.findByIdAndUpdate(e, {
          $pull: { channelMembership: channel._id }, //new:true => yse or not???
        });
        return res.status(200).json({
          status: "success",
          message: "channel deleted for you",
        });
      }
    });
  }
});
export const updateChannelMembers = catchAsync(async (req, res, next) => {
  const { memberId, channelId } = req.body;
  const { id } = tokenDecode(req.headers);
  const channel = await channelModel.findById(channelId);
  if (channel.owner === id) {
    if (channel.admins.includes(memberId)) {
      return next(new HandleError("this member is already admin"));
    } else {
      channel.members.forEach(async (member) => {
        if (member === memberId) {
          const channel = await channelModel.findByIdAndUpdate(channelId, {
            $push: { admins: memberId },
          });
        }
      });
    }
  } else {
    return next(new HandleError("u cant do this action", 400));
  }
});
export const deleteMembers = catchAsync(async (req, res, next) => {
  const { memberId, channelId } = req.body;
  const { id } = tokenDecode(req.headers);
  const channel = await channelModel.findById(channelId);

  if (channel.owner === id) {
    if (channel.admins.includes(memberId)) {
      const newConversation = await channelModel.findByIdAndUpdate(
        channelId,
        {
          members: channel.members.filter((member) => member !== memberId),
          admins: channel.admins.filter((admin) => admin !== memberId),
        },
        { new: true }
      );
      await userModel.findByIdAndUpdate(memberId, {
        $pull: { channelMembership: channel._id },
      }); //new:true => yse or not???)
      return res.status(200).json({
        status: "success",
        data: newConversation,
        message: "admin successfully deleted",
      });
    } else {
      const newConversation = await channelModel.findByIdAndUpdate(
        channelId,
        { members: channel.members.filter((member) => member !== memberId) },
        { new: true }
      );
      await userModel.findByIdAndUpdate(memberId, {
        $pull: { channelMembership: channel._id },
      }); //new:true => yse or not???)
      return res.status(200).json({
        status: "success",
        data: newConversation,
        message: "member successfully deleted",
      });
    }
  } //if admins req
  if (
    channel.admins.includes(id) &&
    !channel.admins.includes(memberId) &&
    memberId !== channel.owner
  ) {
    const newConversation = await channelModel.findByIdAndUpdate(
      channelId,
      { members: channel.members.filter((member) => member !== memberId) },
      { new: true }
    );
    await userModel.findByIdAndUpdate(memberId, {
      $pull: { channelMembership: channel._id },
    }); //new:true => yse or not???)
    return res.status(200).json({
      status: "success",
      data: newConversation,
      message: "member successfully deleted",
    });
  } //if members req
  else {
    return next(new HandleError("u cant remove this user from channel"));
  }
});
// privetChatCn
export const createPrivetChat = catchAsync(async (req, res, next) => {});

export const deletePrivetChat = catchAsync(async (req, res, next) => {});
