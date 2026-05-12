const mongoose = require("mongoose");

const exerciseProgressSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    reps: { type: String, required: true },
    completed: { type: Boolean, default: false },
    completedAt: { type: Date, default: null },
  },
  { _id: false }
);

const workoutDaySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    dayNumber: {
      type: Number,
      required: true,
      min: 1,
      max: 7,
    },
    date: {
      type: String,
      required: true, // YYYY-MM-DD format
    },
    isRestDay: {
      type: Boolean,
      default: false,
    },
    exercises: [exerciseProgressSchema],
    starsEarned: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Compound index for fast lookups: one entry per user per date
workoutDaySchema.index({ userId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("WorkoutDay", workoutDaySchema);
