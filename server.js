import express from "express";
import fetch from "node-fetch";
import Router from "./routers/router.js";
globalThis.fetch = fetch
const app = express();

app.use(express.json());
app.use("/", Router);

const port = 8080;
app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.info("Server running on port %s.", port);
});
