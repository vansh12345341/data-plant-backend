// src/routes/emailSchedules.ts
import express from 'express';
import EmailSchedule from '../models/EmailSchedule';

const router = express.Router();


const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  return String(error);
};


router.get('/', async (req, res) => {
  try {
    const schedules = await EmailSchedule.find();
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ message: getErrorMessage(error) });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const schedule = await EmailSchedule.findById(req.params.id);
    if (!schedule) {
      return res.status(404).send("No schedule found");
    }
    res.json(schedule);
  } catch (error) {
    res.status(500).json({ message: getErrorMessage(error) });
  }
});


router.post('/', async (req, res) => {
  const schedule = new EmailSchedule(req.body);
  try {
    const newSchedule = await schedule.save();
    res.status(201).json(newSchedule);
  } catch (error) {
    res.status(400).json({ message: getErrorMessage(error) });
  }
});


router.patch('/:id', async (req, res) => {
  try {
    const updatedSchedule = await EmailSchedule.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedSchedule) {
      return res.status(404).send("No schedule found");
    }
    res.json(updatedSchedule);
  } catch (error) {
    res.status(400).json({ message: getErrorMessage(error) });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const schedule = await EmailSchedule.findByIdAndDelete(req.params.id);
    if (!schedule) {
      return res.status(404).send("No schedule found");
    }
    res.status(200).send("Schedule deleted");
  } catch (error) {
    res.status(500).json({ message: getErrorMessage(error) });
  }
});

export default router;
