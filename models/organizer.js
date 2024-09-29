import mongoose, { Schema, models } from "mongoose";

const organizerSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "organizer" }, 
  bio: { type: String },
  profilePicture: { type: String },
  id: { type: String },
  phone: { type: String },
}, { timestamps: true });

const Organizer = models.Organizer || mongoose.model("Organizer", organizerSchema);
export default Organizer;
