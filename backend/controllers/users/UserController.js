import User from "../../models/user/User.js";
import asyncHandler from "express-async-handler";

export const userRegister = asyncHandler(async (req, res) => {
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists) {
    throw new Error("این کاربر قبلا ثبت نام کرده است");
  }
  try {
    const user = await User.create({
      firstName: req?.body?.firstName,
      lastName: req?.body?.lastName,
      email: req?.body?.email,
      password: req?.body?.password,
    });
    res.json("شما با موفقیت ثبت نام شدید");
  } catch (error) {
    res.json(error);
  }
});

export const userLogin = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req?.body?.email });
  if (!user) {
    throw new Error(`این کاربر وجود ندارد`);
  }
  res.json("شما وارد شدید");
});
