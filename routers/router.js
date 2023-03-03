// import Authenticator from "openai-authenticator";
// const authenticator = new Authenticator();
import express from "express";
import { ChatGPTAuthTokenService } from "chat-gpt-authenticator";
import fetchData from "../fetchData.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const email =
      (await req.body.email) ||
      res.status(500).json({ error: "Email is required" });
    const password =
      (await req.body.password) ||
      res.status(500).json({ error: "Password is required" });
    const chatGptAuthTokenService = new ChatGPTAuthTokenService(
      email,
      password
    );
    const token =
      (await chatGptAuthTokenService.getToken()) ||
      res.json({ error: "Invalid email or password" });
    fetchData(req, res, token);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
