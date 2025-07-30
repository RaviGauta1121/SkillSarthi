import mongoose from 'mongoose';

const connectMongoDB = async () => {
  try {
    // Replace Atlas connection with local connection
    await mongoose.connect('mongodb://localhost:27017/study', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB locally');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error('Failed to connect to MongoDB');
  }
};

export default connectMongoDB;