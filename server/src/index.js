import express from 'express';
import helmet from 'helmet';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Parse incoming JSON requests
app.use(helmet()); // Use Helmet for basic security headers

// Sample route
app.get('/', (req, res) => {
  res.send('Welcome to your Express server!');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({error: 'Internal Server Error'});
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
