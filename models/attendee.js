import mongoose, { Schema, models } from "mongoose";

const attendeeSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "attendee" },
  profilePicture:{ type: String},
  id: { type: String },
  phone: { type: String },
}, { timestamps: true });

const Attendee = models.Attendee || mongoose.model("Attendee", attendeeSchema);
export default Attendee;
