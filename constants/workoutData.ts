export interface Exercise {
  name: string;
  reps: string;
}

export interface WorkoutDay {
  title: string;
  note?: string;
  exercises: Exercise[];
}

export const WORKOUT_DATA: Record<string, WorkoutDay> = {
  day1: {
    title: "Full Body Fat Burn",
    exercises: [
      { name: "Jumping jacks", reps: "30 sec × 3" },
      { name: "Squats", reps: "15 × 3" },
      { name: "Push-ups", reps: "8–15 × 3" },
      { name: "Mountain climbers", reps: "30 sec × 3" },
      { name: "Plank", reps: "30–45 sec × 3" },
    ],
  },
  day2: {
    title: "Cardio + Core",
    exercises: [
      { name: "High knees", reps: "30 sec × 4" },
      { name: "Burpees", reps: "10 × 3" },
      { name: "Bicycle crunches", reps: "20 × 3" },
      { name: "Leg raises", reps: "15 × 3" },
      { name: "Fast walking", reps: "20–30 min" },
    ],
  },
  day3: {
    title: "Lower Body",
    exercises: [
      { name: "Squats", reps: "20 × 4" },
      { name: "Lunges", reps: "12 each leg × 3" },
      { name: "Glute bridge", reps: "20 × 3" },
      { name: "Wall sit", reps: "45 sec × 3" },
      { name: "Calf raises", reps: "25 × 3" },
    ],
  },
  day4: {
    title: "Upper Body",
    exercises: [
      { name: "Push-ups", reps: "3 sets" },
      { name: "Incline push-ups (bed/chair)", reps: "3 sets" },
      { name: "Chair dips", reps: "12 × 3" },
      { name: "Shoulder taps", reps: "20 × 3" },
      { name: "Plank", reps: "1 min × 3" },
    ],
  },
  day5: {
    title: "HIIT Fat Burn",
    note: "Repeat 4 rounds:",
    exercises: [
      { name: "Jump squats", reps: "15" },
      { name: "Mountain climbers", reps: "30 sec" },
      { name: "Burpees", reps: "10" },
      { name: "High knees", reps: "30 sec" },
      { name: "Rest", reps: "1 min" },
    ],
  },
  day6: {
    title: "Walking + Stretching",
    exercises: [
      { name: "Walk", reps: "45–60 min" },
      { name: "Light stretching", reps: "10–15 min" },
    ],
  },
  day7: {
    title: "Rest",
    exercises: [
      { name: "Active recovery (optional)", reps: "As needed" },
    ],
  },
};

export const DAY_LABELS = [
  { key: "day1", label: "Day 1", short: "D1" },
  { key: "day2", label: "Day 2", short: "D2" },
  { key: "day3", label: "Day 3", short: "D3" },
  { key: "day4", label: "Day 4", short: "D4" },
  { key: "day5", label: "Day 5", short: "D5" },
  { key: "day6", label: "Day 6", short: "D6" },
  { key: "day7", label: "Day 7", short: "D7" },
];

export const DAILY_TARGETS = [
  { icon: "💧", text: "Water: 3–4 liters" },
  { icon: "👟", text: "Steps: 8,000–12,000" },
  { icon: "🥩", text: "Protein every meal" },
];
