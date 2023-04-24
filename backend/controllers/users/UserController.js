import User from "../../models/user/User.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { syncIndexes } from "mongoose";

export const getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.json(error);
  }
});

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
  const { email, password } = req.body;
  const userFound = await User.findOne({ email });
  if (userFound && (await userFound.isPasswordMatched(password))) {
    const userId = userFound._id;
    const firstName = userFound.firstName;
    const lastName = userFound.lastName;
    const emailuser = userFound.email;
    const profilePhoto = userFound.profilePhoto;
    const admin = userFound.isAdmin;
    const isAccountVerified = userFound.isAccountVerified;
    const accessToken = jwt.sign(
      {
        userId,
        firstName,
        lastName,
        emailuser,
        profilePhoto,
        admin,
        isAccountVerified,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15s",
      }
    );
    const refreshToken = jwt.sign(
      {
        userId,
        firstName,
        lastName,
        emailuser,
        profilePhoto,
        admin,
        isAccountVerified,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    await User.findByIdAndUpdate(userId, { refresh_token: refreshToken });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({
      userId,
      firstName,
      lastName,
      emailuser,
      profilePhoto,
      admin,
      isAccountVerified,
      accessToken,
    });
  } else {
    res.status(401);
    throw new Error("ایمیل یا پسورد صحیح نیست");
  }
});

export const deleteUser = asyncHandler(async (req, res) => {
  // console.log(req.params.id);
  // const {id} = req.params;
  // if(!id) throw new Error("شما شناسه را وارد نکردید");

  const id = req.params.id;
  try {
    const user = await User.findByIdAndDelete(id);
    res.json(user);
  } catch (error) {
    res.json(error);
  }

  res.send("delete User");
});
