import { create } from "zustand";
import {
  workoutService,
  WorkoutProgress,
  ExerciseProgress,
} from "../services/workouts";
import { WORKOUT_DATA } from "../constants/workoutData";

interface WorkoutState {
  selectedDay: string;
  currentProgress: WorkoutProgress | null;
  isLoading: boolean;
  error: string | null;

  setSelectedDay: (day: string) => void;
  loadProgress: (date: string, dayKey: string) => Promise<void>;
  toggleExercise: (exerciseIndex: number) => Promise<void>;
  toggleRestDay: () => Promise<void>;
}

// Get today's date in YYYY-MM-DD format
export const getTodayDate = () => {
  const d = new Date();
  return d.toISOString().split("T")[0];
};

export const useWorkoutStore = create<WorkoutState>((set, get) => ({
  selectedDay: "day1",
  currentProgress: null,
  isLoading: false,
  error: null,

  setSelectedDay: (day) => set({ selectedDay: day }),

  loadProgress: async (date, dayKey) => {
    set({ isLoading: true, error: null });
    try {
      let progress = await workoutService.getProgress(date);
      if (!progress) {
        // Create a new entry for today
        const dayData = WORKOUT_DATA[dayKey];
        const dayNum = parseInt(dayKey.replace("day", ""), 10);
        progress = await workoutService.createDay(
          dayNum,
          date,
          dayData.exercises
        );
      }
      set({ currentProgress: progress, isLoading: false });
    } catch (err: any) {
      const msg = err.response?.data?.message || "Failed to load progress.";
      set({ error: msg, isLoading: false });
    }
  },

  toggleExercise: async (exerciseIndex) => {
    const { currentProgress } = get();
    if (!currentProgress) return;

    // Optimistic update
    const updatedExercises = [...currentProgress.exercises];
    const ex = updatedExercises[exerciseIndex];
    const newCompleted = !ex.completed;
    updatedExercises[exerciseIndex] = {
      ...ex,
      completed: newCompleted,
      completedAt: newCompleted ? new Date().toISOString() : null,
    };

    const newStars = updatedExercises.filter((e) => e.completed).length;

    set({
      currentProgress: {
        ...currentProgress,
        exercises: updatedExercises,
        starsEarned: newStars,
      },
    });

    try {
      const updated = await workoutService.toggleExercise(
        currentProgress._id,
        exerciseIndex
      );
      set({ currentProgress: updated });
    } catch (err: any) {
      // Revert on failure
      set({ currentProgress });
    }
  },

  toggleRestDay: async () => {
    const { currentProgress } = get();
    if (!currentProgress) return;

    // Optimistic update
    set({
      currentProgress: {
        ...currentProgress,
        isRestDay: !currentProgress.isRestDay,
      },
    });

    try {
      const updated = await workoutService.toggleRestDay(currentProgress._id);
      set({ currentProgress: updated });
    } catch (err: any) {
      set({ currentProgress });
    }
  },
}));
