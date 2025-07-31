// app/lib/mongodb.js
import mongoose from 'mongoose';

// Get MongoDB URI from environment variable
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

const connectMongoDB = async () => {
  // Check if we already have a connection
  if (mongoose.connections[0].readyState) {
    console.log('🔄 Using existing MongoDB Atlas connection');
    console.log('📊 Connection status:', mongoose.connections[0].readyState);
    console.log('🏷️  Database name:', mongoose.connections[0].name);
    return;
  }

  try {
    console.log('🔗 Connecting to MongoDB Atlas...');
    console.log('🌐 Connection URI:', MONGODB_URI.replace(/\/\/[^:]+:[^@]+@/, '//***:***@')); // Hide credentials
    
    // Disconnect any existing connections first
    await mongoose.disconnect();
    
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    
    console.log('✅ MongoDB Atlas connected successfully');
    console.log('🏷️  Database name:', mongoose.connection.name);
    console.log('📊 Connection status:', mongoose.connection.readyState);
    console.log('🔗 Host:', mongoose.connection.host);
    
  } catch (error) {
    console.error('❌ MongoDB Atlas connection error:', error);
    throw error;
  }
};

export default connectMongoDB;