import mongoose from 'mongoose';

const DiarySchema = new mongoose.Schema({
  date: { type: String, required: true },
  time: { type: String, required: true },
  content: { type: String, required: true },
});

const Diary = mongoose.models.Diary || mongoose.model('Diary', DiarySchema);

export default Diary;
