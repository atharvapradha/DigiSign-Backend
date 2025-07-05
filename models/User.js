import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export default mongoose.model("User", userSchema);

//USE of the above  code
// ✔ Defines a Mongoose schema for users with fields: name, email, and password.
// ✔ Sets all fields as required.
// ✔ Ensures the email field is unique in the collection.
// ✔ Creates and exports a Mongoose model named 'User' based on the schema.
