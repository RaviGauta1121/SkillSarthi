// app/models/Diary.js (Fixed filename - was 'Dairy')
import mongoose from 'mongoose';

const DiarySchema = new mongoose.Schema({
  userId: { 
    type: String, 
    required: true,
    default: 'default-user' // Provide a default value
  },
  date: { type: String, required: true },
  time: { type: String, required: true },
  content: { type: String, required: true },
}, {
  timestamps: true // Optional: adds createdAt and updatedAt fields
});

const Diary = mongoose.models.Diary || mongoose.model('Diary', DiarySchema);

export default Diary;