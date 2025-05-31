import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import productRoutes from './routes/products';
import orderRoutes from './routes/orders';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection with better error handling
mongoose.connect('mongodb+srv://youssefllotfyy:oeF9fyCwX5XieKLB@mydatabase.zsisrgu.mongodb.net/clothing-store')
  .then(() => {
    console.log('✅ Connected to MongoDB successfully');
    
    // Log the current collections in the database
    mongoose.connection.db.listCollections().toArray((err, collections) => {
      if (err) {
        console.error('Error listing collections:', err);
      } else {
        console.log('📚 Available collections:', collections.map(c => c.name));
      }
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1); // Exit if cannot connect to database
  });

// Log MongoDB queries in development
if (process.env.NODE_ENV !== 'production') {
  mongoose.set('debug', true);
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
}); 