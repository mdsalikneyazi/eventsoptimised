// server/seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const Club = require('./models/Club');
const bcrypt = require('bcryptjs'); // You might need: npm install bcryptjs

mongoose.connect(process.env.MONGO_URI);

const seedDB = async () => {
  // 1. Clear existing data (Optional)
  await Admin.deleteMany({});
  await Club.deleteMany({});

  // 2. Create a Dummy Club
  const newClub = await Club.create({
    name: "Tech Society",
    description: "The official coding club.",
    adminEmail: "admin@college.edu"
  });

  // 3. Create the Admin for that Club
  // Hash the password so it's secure
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash("password123", salt);

  await Admin.create({
    email: "admin@college.edu",
    password: hashedPassword,
    role: "super_admin",
    clubId: newClub._id
  });

  console.log("🌱 Database Seeded!");
  process.exit();
};

seedDB();

