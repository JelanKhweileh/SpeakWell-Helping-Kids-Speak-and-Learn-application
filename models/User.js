// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true, unique: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   userType: { type: String, enum: ['Parent', 'Therapist'], required: true },
// });

// const User = mongoose.model('User', userSchema);

// module.exports = User;

const mongoose = require('mongoose');
const { Schema } = mongoose;

// Kid Schema
const kidSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  parentName: { type: String, required: true },
  profilePhoto: { type: String },
  bio: { type: String },
  interests: { type: [String] },
});

// Appointment Schema
const appointmentSchema = new Schema({
  appointmentName: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  kidName: { type: String, required: true },
  parentName: { type: String, required: true },
});

// Base User Schema
const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { discriminatorKey: 'role', _id: false }
);

// Parent Schema
const parentSchema = new Schema({
  kids: { type: [kidSchema], default: [] },
});

// Therapist Schema
const therapistSchema = new Schema({
  profilePhoto: { type: String },
  qualifications: { type: String, required: false },
  certifications: { type: String },
  experience: { type: Number, required: false },
  specialization: { type: String, required: false },
  about: { type: String },
  appointments: { type: [appointmentSchema], default: [] },
});

// Main User Model
const User = mongoose.model('User', userSchema);

// Discriminators for Parent and Therapist
const Parent = User.discriminator('Parent', parentSchema);
const Therapist = User.discriminator('Therapist', therapistSchema);

// Export the models
module.exports = { User, Parent, Therapist };
