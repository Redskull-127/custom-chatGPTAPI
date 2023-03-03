import express from "express";
import Authenticator from "openai-authenticator";
import fetchData from "../fetchData.js";

const router = express.Router();
const authenticator = new Authenticator();

router.get("/", async (req, res) => {
  try {
    const email =
      (await req.body.email) ||
      res.status(500).json({ error: "Email is required" });
    const password =
      (await req.body.password) ||
      res.status(500).json({ error: "Password is required" });
    const token =
      (await authenticator.login(email, password)) ||
      res.json({ error: "Invalid email or password" });
    fetchData(req, res, token.accessToken);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

export default router;
