import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { colors, spacing, radius, fontSize } from "../constants/theme";

interface ExerciseCardProps {
  name: string;
  reps: string;
  completed: boolean;
  onToggle: () => void;
  disabled?: boolean;
}

export default function ExerciseCard({
  name,
  reps,
  completed,
  onToggle,
  disabled,
}: ExerciseCardProps) {
  return (
    <Pressable
      onPress={onToggle}
      disabled={disabled}
      style={({ pressed }) => [
        styles.card,
        completed && styles.cardCompleted,
        pressed && !disabled && styles.cardPressed,
      ]}
    >
      <View style={styles.left}>
        <View
          style={[styles.bullet, completed && styles.bulletCompleted]}
        />
        <View style={styles.textContainer}>
          <Text
            style={[styles.name, completed && styles.nameCompleted]}
          >
            {name}
          </Text>
          <Text style={styles.reps}>{reps}</Text>
        </View>
      </View>

      <View style={styles.right}>
        {completed && <Text style={styles.star}>⭐</Text>}
        <TouchableOpacity
          onPress={onToggle}
          disabled={disabled}
          style={[styles.toggle, completed && styles.toggleOn]}
          activeOpacity={0.7}
        >
          <View
            style={[
              styles.toggleKnob,
              completed && styles.toggleKnobOn,
            ]}
          />
        </TouchableOpacity>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm + 2,
    borderWidth: 1,
    borderColor: "transparent",
  },
  cardCompleted: {
    backgroundColor: "rgba(52, 211, 153, 0.08)",
    borderColor: "rgba(52, 211, 153, 0.2)",
  },
  cardPressed: {
    backgroundColor: colors.surfaceHover,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  bullet: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.accent,
    marginRight: spacing.md,
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
  },
  bulletCompleted: {
    backgroundColor: colors.success,
    shadowColor: colors.success,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    color: colors.textPrimary,
    fontSize: fontSize.base,
    fontWeight: "600",
  },
  nameCompleted: {
    color: colors.success,
  },
  reps: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
    marginTop: 2,
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  star: {
    fontSize: 20,
  },
  toggle: {
    width: 48,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.surfaceLight,
    justifyContent: "center",
    paddingHorizontal: 3,
    borderWidth: 1,
    borderColor: colors.border,
  },
  toggleOn: {
    backgroundColor: colors.successGlow,
    borderColor: colors.success,
  },
  toggleKnob: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.textMuted,
  },
  toggleKnobOn: {
    backgroundColor: colors.success,
    alignSelf: "flex-end",
  },
});
