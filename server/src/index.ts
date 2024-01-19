import express from "express";
import dotenv from "dotenv";
import http from "http";

dotenv.config();
const app = express();
const server = http.createServer(app);


const PORT = process.env.PORT || 80;

app.get("/", (req, res) => {
  res.send("listening");
});

server.listen(PORT, () => {
  console.log(`Listening on the port ${PORT}`);
});
