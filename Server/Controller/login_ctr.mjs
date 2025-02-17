import jwt from "jsonwebtoken";
const secretKey = "jwtauth";

const login_ctr = (req, res) => {
  let userdata = req.body;

  jwt.sign(userdata, secretKey, { expiresIn: "300s" }, (err, token) => {
    if (err) {
      res.status(403).send("Invalid Token");
    } else {
      res.json({ token });
    }
  });
};

export default login_ctr;
