
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import emailSchedulesRouter from './routes/emailSchedules';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();


const app = express();


app.use(cors());
app.use(bodyParser.json());


const MONGO_URI : any= process.env.MONGO_URI;
mongoose.connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Could not connect to MongoDB:", error));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


app.use('/schedules', emailSchedulesRouter);