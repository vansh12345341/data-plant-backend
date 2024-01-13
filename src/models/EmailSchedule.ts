// src/models/EmailSchedule.ts
import mongoose, { Schema, Document } from 'mongoose';

interface IEmailSchedule extends Document {
  title: string;
  description: string;
  subject: string;
  frequency: string;
  repeat: string;
  time: string;
}

const EmailScheduleSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  subject: { type: String, required: true },
  frequency: { type: String, required: true },
  repeat: { type: String, required: false },
  time: { type: String, required: true }
});

export default mongoose.model<IEmailSchedule>('EmailSchedule', EmailScheduleSchema);
