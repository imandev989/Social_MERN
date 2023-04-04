import User from "../../models/user/User.js";

export const userRegister = async (req, res) => {
  try {
    const user = await User.create({
      firstName: "ایمان",
      lastName: "نمازی",
      email: "iman@iman.com",
      password: "imaniman",
    });
    res.json(user);
  } catch (error) {
    res.json(error);
  }
};
