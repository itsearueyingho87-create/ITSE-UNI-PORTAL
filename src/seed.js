require('dotenv').config();
const connectDB = require('./config/db');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

async function seed() {
  await connectDB(process.env.MONGO_URI);
  const pw = await bcrypt.hash('password123', parseInt(process.env.SALT_ROUNDS || 10));
  const user = new User({
    name: 'John Doe',
    email: 'student@vareya.edu.ng',
    matricNumber: 'VUY/2025/001',
    password: pw,
    level: 200,
    courses: [
      { code: 'CSC101', title: 'Computer Science 101', credits: 3 },
      { code: 'WEB201', title: 'Web Development', credits: 4 }
    ],
    timetable: [
      { day: 'Monday', startTime: '09:00', endTime: '11:00', courseCode: 'CSC101' }
    ],
    fees: [ { amount: 150000, status: 'pending', reference: 'INIT-001'} ]
  });
  await user.save();
  console.log('Seeded user');
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
