import api from "./api";

export interface ExerciseProgress {
  name: string;
  reps: string;
  completed: boolean;
  completedAt: string | null;
}

export interface WorkoutProgress {
  _id: string;
  userId: string;
  dayNumber: number;
  date: string;
  isRestDay: boolean;
  exercises: ExerciseProgress[];
  starsEarned: number;
}

export const workoutService = {
  getProgress: async (date: string): Promise<WorkoutProgress | null> => {
    try {
      const { data } = await api.get<WorkoutProgress>(`/workouts/${date}`);
      return data;
    } catch (err: any) {
      if (err.response?.status === 404) return null;
      throw err;
    }
  },

  createDay: async (
    dayNumber: number,
    date: string,
    exercises: { name: string; reps: string }[]
  ): Promise<WorkoutProgress> => {
    const { data } = await api.post<WorkoutProgress>("/workouts", {
      dayNumber,
      date,
      exercises: exercises.map((ex) => ({
        ...ex,
        completed: false,
        completedAt: null,
      })),
    });
    return data;
  },

  toggleExercise: async (
    workoutId: string,
    exerciseIndex: number
  ): Promise<WorkoutProgress> => {
    const { data } = await api.patch<WorkoutProgress>(
      `/workouts/${workoutId}/toggle/${exerciseIndex}`
    );
    return data;
  },

  toggleRestDay: async (workoutId: string): Promise<WorkoutProgress> => {
    const { data } = await api.patch<WorkoutProgress>(
      `/workouts/${workoutId}/rest`
    );
    return data;
  },
};
