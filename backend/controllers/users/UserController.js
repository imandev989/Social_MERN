import User from "../../models/user/User.js";

export const userRegister = async (req, res) => {
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists) {
    return res.json("این کاربر قبلا ثبت نام کرده است");
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
};
