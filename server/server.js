import express from 'express';
import 'dotenv/config'
import cors from 'cors';
import connectDB from './config/mongodb.js';
import  router  from './Routes/userRoute.js';
import imageRouter from './Routes/imageRoutes.js';
const PORT = process.env.PORT || 4000;
const app = express();

// Middleware
app.use(cors());                     
app.use(express.json());


await connectDB(); // Connect to MongoDB
app.use('/api/user', router); // Use user routes
// Basic route
app.use('/api/image', imageRouter); // Use image routes

app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});