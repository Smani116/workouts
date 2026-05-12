const express = require("express");
const WorkoutDay = require("../models/WorkoutDay");
const auth = require("../middleware/auth");

const router = express.Router();

// All workout routes require authentication
router.use(auth);

// GET /api/workouts/:date — Get workout progress for a specific date
router.get("/:date", async (req, res) => {
  try {
    const workout = await WorkoutDay.findOne({
      userId: req.userId,
      date: req.params.date,
    });

    if (!workout) {
      return res.status(404).json({ message: "No workout found for this date." });
    }

    res.json(workout);
  } catch (err) {
    console.error("Get workout error:", err);
    res.status(500).json({ message: "Server error." });
  }
});

// POST /api/workouts — Create a new workout day entry
router.post("/", async (req, res) => {
  try {
    const { dayNumber, date, exercises } = req.body;

    // Check if entry already exists
    const existing = await WorkoutDay.findOne({
      userId: req.userId,
      date,
    });

    if (existing) {
      return res.json(existing);
    }

    const workout = new WorkoutDay({
      userId: req.userId,
      dayNumber,
      date,
      exercises,
    });

    await workout.save();
    res.status(201).json(workout);
  } catch (err) {
    console.error("Create workout error:", err);
    res.status(500).json({ message: "Server error." });
  }
});

// PATCH /api/workouts/:id/toggle/:exerciseIndex — Toggle exercise completion
router.patch("/:id/toggle/:exerciseIndex", async (req, res) => {
  try {
    const workout = await WorkoutDay.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!workout) {
      return res.status(404).json({ message: "Workout not found." });
    }

    const index = parseInt(req.params.exerciseIndex, 10);
    if (index < 0 || index >= workout.exercises.length) {
      return res.status(400).json({ message: "Invalid exercise index." });
    }

    const exercise = workout.exercises[index];
    exercise.completed = !exercise.completed;
    exercise.completedAt = exercise.completed ? new Date() : null;

    // Recalculate stars
    workout.starsEarned = workout.exercises.filter(
      (e) => e.completed
    ).length;

    await workout.save();
    res.json(workout);
  } catch (err) {
    console.error("Toggle exercise error:", err);
    res.status(500).json({ message: "Server error." });
  }
});

// PATCH /api/workouts/:id/rest — Toggle rest day
router.patch("/:id/rest", async (req, res) => {
  try {
    const workout = await WorkoutDay.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!workout) {
      return res.status(404).json({ message: "Workout not found." });
    }

    workout.isRestDay = !workout.isRestDay;
    await workout.save();

    res.json(workout);
  } catch (err) {
    console.error("Toggle rest day error:", err);
    res.status(500).json({ message: "Server error." });
  }
});

module.exports = router;
