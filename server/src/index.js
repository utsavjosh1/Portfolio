const express = require("express");
const helmet = require("helmet");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(helmet()); // Use Helmet for basic security headers

// Sample route
app.get("/", (req, res) => {
  res.send("Hello, this is your Express server!");
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
