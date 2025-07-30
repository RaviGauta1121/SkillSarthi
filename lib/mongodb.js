import mongoose from 'mongoose';

const connection = {}; // Connection cache

const connectMongoDB = async () => {
  if (connection.isConnected) {
    // Use existing connection
    return;
  }

  try {
    // Hardcoded local connection string instead of using env variable
    const uri = 'mongodb://localhost:27017/study';
    
    // Connect to MongoDB
    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    connection.isConnected = conn.connections[0].readyState === 1; // 1 means connected
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    throw error; // Throw the error instead of exiting the process for Next.js to handle
  }
};

export default connectMongoDB;