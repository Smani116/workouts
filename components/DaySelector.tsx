import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { DAY_LABELS } from "../constants/workoutData";
import { colors, spacing, radius, fontSize } from "../constants/theme";

interface DaySelectorProps {
  selectedDay: string;
  onSelect: (day: string) => void;
}

export default function DaySelector({ selectedDay, onSelect }: DaySelectorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>SELECT YOUR DAY</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {DAY_LABELS.map((day) => {
          const isActive = selectedDay === day.key;
          return (
            <TouchableOpacity
              key={day.key}
              onPress={() => onSelect(day.key)}
              style={[styles.chip, isActive && styles.chipActive]}
              activeOpacity={0.7}
            >
              <Text style={[styles.chipShort, isActive && styles.chipShortActive]}>
                {day.short}
              </Text>
              <Text
                style={[styles.chipLabel, isActive && styles.chipLabelActive]}
              >
                {day.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  label: {
    color: colors.textSecondary,
    fontSize: fontSize.xs,
    fontWeight: "600",
    letterSpacing: 1.5,
    marginBottom: spacing.sm,
    marginLeft: spacing.xs,
  },
  scrollContent: {
    gap: spacing.sm,
    paddingHorizontal: spacing.xs,
  },
  chip: {
    backgroundColor: colors.surfaceLight,
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    minWidth: 56,
  },
  chipActive: {
    backgroundColor: colors.accentGlow,
    borderColor: colors.accent,
  },
  chipShort: {
    color: colors.textSecondary,
    fontSize: fontSize.lg,
    fontWeight: "700",
  },
  chipShortActive: {
    color: colors.accentLight,
  },
  chipLabel: {
    color: colors.textMuted,
    fontSize: fontSize.xs,
    marginTop: 2,
  },
  chipLabelActive: {
    color: colors.accent,
  },
});
