import jwt from "jsonwebtoken";
const secretKey = "jwtauth";
const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];

    jwt.verify(token, secretKey, (err, authData) => {
      if (err) {
        res.status(403).send("Invalid Token");
      } else {
        req.authData = authData;
        next();
      }
    });
  } else {
    res.status(403).send("Token missing");
  }
};

export default verifyToken;
