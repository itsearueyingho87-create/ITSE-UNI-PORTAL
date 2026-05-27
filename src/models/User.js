const mongoose = require('mongoose');

const FeeSchema = new mongoose.Schema({
    amount: { type: Number, required: true},
    status: { type: String, enum: ['pending', 'paid', 'partial'], default: 'pending'},
    reference: String,
    createdAt: { type: Date, default: Date.now}
});

const TimetableItemSchema = new mongoose.Schema({
    day: {type: String, required: true},
    startTime: String,
    endTime: String,
    courseCode: String,
    location: String
});

const CourseSchema = new mongoose.Schema({
  code: String,
  title: String,
  credits: Number,
  lecturer: String,
  registeredAt: { type: Date, default: Date.now }
});

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  matricNumber: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  level: { type: Number, default: 100 },
  courses: [CourseSchema],
  timetable: [TimetableItemSchema],
  fees: [FeeSchema],
  gpa: { type: Number, default: 0 },
  role: { type: String, enum: ['student','admin'], default: 'student' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);