import express from "express";
import http from "http";

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 80;

app.get("/", (req, res) => {
  res.send("Server is running on port " + PORT);
});

server.listen(PORT, () => {
  console.log(`Listening on the port ${PORT}`);
});
