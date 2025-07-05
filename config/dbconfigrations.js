import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://atharvapradhan749:4rB9NmxJ68JSzARU@cluster0.kl5vsr1.mongodb.net/ProjectDB?retryWrites=true&w=majority", 
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
        maxPoolSize: 10, // Maximum number of sockets in the connection pool
      }
    );
    
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

// Connection event listeners for better debugging
mongoose.connection.on('connecting', () => console.log('🔃 Connecting to MongoDB...'));
mongoose.connection.on('connected', () => console.log('✅ MongoDB connected'));
mongoose.connection.on('disconnected', () => console.log('❌ MongoDB disconnected'));
mongoose.connection.on('reconnected', () => console.log('🔁 MongoDB reconnected'));
mongoose.connection.on('error', (err) => console.error('❌ MongoDB connection error:', err));
//USE of the above  code
// ✔ Establishes a MongoDB connection using Mongoose with connection options like useNewUrlParser, useUnifiedTopology, serverSelectionTimeoutMS, and maxPoolSize.
// ✔ Handles connection success and logs the connected host.
// ✔ Catches connection errors and exits the process on failure.
// ✔ Adds event listeners for connecting, connected, disconnected, reconnected, and error events for better debugging.
