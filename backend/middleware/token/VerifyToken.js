import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  // if (token == null) return response.sendStatus(401);
  if (token == null) return response.json(" شما ابتدا باید وارد حساب کاربری خود شوید");

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    // if (err) return res.sendStatus(403);
    if (err) return res.json("توکن منقضی شده است");

    req.email = decoded.email;
    next();
  });
};
