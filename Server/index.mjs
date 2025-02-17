import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
const app = express();

//controller import

import login_ctr from "./Controller/login_ctr.mjs";
import profile_ctr from "./Controller/profile_ctr.mjs";

//middleware import

import verifyToken from "./Middleware/verify_token_middleware.mjs";

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cors());

app.post("/login", login_ctr);

app.get("/profile", verifyToken, profile_ctr);

app.listen(8000, () => console.log("server start"));
