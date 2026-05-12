import React, { useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DaySelector from "../../components/DaySelector";
import ExerciseCard from "../../components/ExerciseCard";
import DailyTargets from "../../components/DailyTargets";
import RestDayBanner from "../../components/RestDayBanner";
import { useWorkoutStore, getTodayDate } from "../../stores/workoutStore";
import { useAuthStore } from "../../stores/authStore";
import { WORKOUT_DATA } from "../../constants/workoutData";
import { colors, spacing, fontSize } from "../../constants/theme";

export default function WorkoutScreen() {
  const {
    selectedDay,
    currentProgress,
    isLoading,
    setSelectedDay,
    loadProgress,
    toggleExercise,
    toggleRestDay,
  } = useWorkoutStore();

  const user = useAuthStore((s) => s.user);

  const today = getTodayDate();
  const dayData = WORKOUT_DATA[selectedDay];

  useEffect(() => {
    loadProgress(today, selectedDay);
  }, [selectedDay]);

  const onRefresh = useCallback(() => {
    loadProgress(today, selectedDay);
  }, [today, selectedDay]);

  const completedCount =
    currentProgress?.exercises.filter((e) => e.completed).length ?? 0;
  const totalExercises = dayData.exercises.length;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={onRefresh}
            tintColor={colors.accent}
          />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>
              Hey, {user?.displayName ?? "Champ"} 👋
            </Text>
            <Text style={styles.date}>{new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}</Text>
          </View>
          <View style={styles.starBadge}>
            <Text style={styles.starCount}>⭐ {completedCount}</Text>
          </View>
        </View>

        {/* Day Selector */}
        <DaySelector selectedDay={selectedDay} onSelect={setSelectedDay} />

        {/* Workout Panel */}
        <View style={styles.panel}>
          <View style={styles.panelHeader}>
            <Text style={styles.dayTitle}>
              Day {selectedDay.replace("day", "")} – {dayData.title}
            </Text>
            {dayData.note && (
              <Text style={styles.note}>{dayData.note}</Text>
            )}
          </View>

          {/* Rest Day Banner */}
          <RestDayBanner
            isRestDay={currentProgress?.isRestDay ?? false}
            onToggle={toggleRestDay}
          />

          {/* Progress Bar */}
          {!currentProgress?.isRestDay && (
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width:
                        totalExercises > 0
                          ? `${(completedCount / totalExercises) * 100}%`
                          : "0%",
                    },
                  ]}
                />
              </View>
              <Text style={styles.progressText}>
                {completedCount}/{totalExercises} done
              </Text>
            </View>
          )}

          {/* Exercises or Rest Message */}
          {currentProgress?.isRestDay ? (
            <View style={styles.restMessage}>
              <Text style={styles.restEmoji}>😴</Text>
              <Text style={styles.restTitle}>Rest Day</Text>
              <Text style={styles.restSubtitle}>
                Your body recovers and grows stronger while you rest.
              </Text>
            </View>
          ) : isLoading ? (
            <ActivityIndicator
              color={colors.accent}
              size="large"
              style={{ marginVertical: spacing.xl }}
            />
          ) : (
            <View style={styles.exerciseList}>
              {dayData.exercises.map((exercise, index) => {
                const progress = currentProgress?.exercises[index];
                return (
                  <ExerciseCard
                    key={`${selectedDay}-${index}`}
                    name={exercise.name}
                    reps={exercise.reps}
                    completed={progress?.completed ?? false}
                    onToggle={() => toggleExercise(index)}
                  />
                );
              })}
            </View>
          )}
        </View>

        {/* Daily Targets */}
        <DailyTargets />

        <View style={{ height: spacing.xl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.xl,
  },
  greeting: {
    color: colors.textPrimary,
    fontSize: fontSize.xxl,
    fontWeight: "800",
  },
  date: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
    marginTop: 4,
  },
  starBadge: {
    backgroundColor: colors.goldGlow,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.gold,
  },
  starCount: {
    color: colors.gold,
    fontSize: fontSize.base,
    fontWeight: "700",
  },
  panel: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  panelHeader: {
    marginBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: spacing.md,
  },
  dayTitle: {
    color: colors.textPrimary,
    fontSize: fontSize.xl,
    fontWeight: "700",
  },
  note: {
    color: colors.accent,
    fontSize: fontSize.sm,
    fontWeight: "600",
    fontStyle: "italic",
    marginTop: spacing.sm,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: colors.surfaceLight,
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: colors.success,
    borderRadius: 4,
  },
  progressText: {
    color: colors.textSecondary,
    fontSize: fontSize.xs,
    fontWeight: "600",
    minWidth: 55,
    textAlign: "right",
  },
  exerciseList: {
    marginTop: spacing.sm,
  },
  restMessage: {
    alignItems: "center",
    paddingVertical: spacing.xxl,
  },
  restEmoji: {
    fontSize: 64,
    marginBottom: spacing.md,
  },
  restTitle: {
    color: colors.purple,
    fontSize: fontSize.xxl,
    fontWeight: "800",
    marginBottom: spacing.sm,
  },
  restSubtitle: {
    color: colors.textSecondary,
    fontSize: fontSize.base,
    textAlign: "center",
    lineHeight: 24,
  },
});
