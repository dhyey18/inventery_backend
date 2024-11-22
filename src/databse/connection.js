import mongoose, { connect } from "mongoose";

// Connect to MongoDB

function connectDb(DB_url) {
  return mongoose.connect(DB_url);
}

export default connectDb;
