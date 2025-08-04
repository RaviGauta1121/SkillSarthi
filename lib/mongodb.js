import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectMongoDB = async () => {
  // If we have a cached connection and it's ready, return it
  if (cached.conn && mongoose.connection.readyState === 1) {
    console.log('🔄 Using existing MongoDB connection');
    console.log('📊 Connection status:', mongoose.connection.readyState);
    console.log('🏷️  Database name:', mongoose.connection.db?.databaseName || 'skillSarthi');
    return cached.conn;
  }

  // If there's no cached promise, create a new connection
  if (!cached.promise) {
    const opts = {
      // Core connection settings
      bufferCommands: true,
      maxPoolSize: 10,
      
      // Timeout settings - more aggressive for SRV issues
      serverSelectionTimeoutMS: 15000, // Increased timeout
      socketTimeoutMS: 45000,
      connectTimeoutMS: 15000, // Increased timeout
      
      // Network settings to help with DNS issues
      family: 4, // Force IPv4
      
      // MongoDB Atlas specific settings
      retryWrites: true,
      w: 'majority',
      
      // Additional options to handle SRV resolution issues
      useNewUrlParser: true,
      useUnifiedTopology: true,
      
      // Disable SRV polling to reduce DNS queries
      srvMaxHosts: 0,
    };

    console.log('🔗 Connecting to MongoDB Atlas...');
    console.log('🌐 Using SRV connection string');
    
    // Ensure we disconnect any existing connections first
    if (mongoose.connection.readyState !== 0) {
      console.log('🔄 Disconnecting existing connection...');
      await mongoose.disconnect();
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log('✅ MongoDB Atlas connected successfully');
        console.log('🏷️  Database name:', mongoose.connection.db?.databaseName || 'skillSarthi');
        console.log('📊 Connection status:', mongoose.connection.readyState);
        console.log('🔗 Host:', mongoose.connection.host);
        
        // Set up connection event listeners
        mongoose.connection.on('error', (err) => {
          console.error('❌ MongoDB connection error:', err.message);
        });
        
        mongoose.connection.on('disconnected', () => {
          console.log('📡 MongoDB disconnected');
          cached.conn = null;
          cached.promise = null;
        });
        
        return mongoose;
      })
      .catch((error) => {
        console.error('❌ MongoDB Atlas connection error:', error.message);
        cached.promise = null; // Reset promise on error
        
        // Specific handling for SRV timeout errors
        if (error.message.includes('querySrv ETIMEOUT')) {
          console.log('💡 Suggestion: Try using a standard connection string instead of SRV');
          console.log('💡 Or check your network/DNS settings');
        }
        
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
    
    // Additional wait to ensure connection is fully established
    if (mongoose.connection.readyState !== 1) {
      console.log('⏳ Waiting for connection to be fully ready...');
      await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error('Connection readiness timeout'));
        }, 10000);
        
        if (mongoose.connection.readyState === 1) {
          clearTimeout(timeout);
          resolve();
        } else {
          mongoose.connection.once('connected', () => {
            clearTimeout(timeout);
            resolve();
          });
          mongoose.connection.once('error', (err) => {
            clearTimeout(timeout);
            reject(err);
          });
        }
      });
    }
    
    return cached.conn;
  } catch (e) {
    cached.promise = null;
    cached.conn = null;
    throw e;
  }
};

export default connectMongoDB;