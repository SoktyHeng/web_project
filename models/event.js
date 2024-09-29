import mongoose, { Schema } from "mongoose";

const eventSchema = new Schema(
  {
    id: String,
    eventTitle: String,
    description: String,
    
    date: String,
    startTime: String,
    endTime: String,
    location: String,

    price: String,
    capacity: String,
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);

export default Event;
