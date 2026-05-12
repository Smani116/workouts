import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors, spacing, radius, fontSize } from "../constants/theme";

interface RestDayBannerProps {
  isRestDay: boolean;
  onToggle: () => void;
}

export default function RestDayBanner({
  isRestDay,
  onToggle,
}: RestDayBannerProps) {
  return (
    <TouchableOpacity
      onPress={onToggle}
      style={[styles.banner, isRestDay && styles.bannerActive]}
      activeOpacity={0.7}
    >
      <Text style={styles.icon}>{isRestDay ? "😴" : "🛌"}</Text>
      <Text style={[styles.text, isRestDay && styles.textActive]}>
        {isRestDay ? "Rest Day Active — Tap to Undo" : "Mark as Rest Day"}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surfaceLight,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm,
  },
  bannerActive: {
    backgroundColor: colors.purpleGlow,
    borderColor: colors.purple,
  },
  icon: {
    fontSize: 22,
  },
  text: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
    fontWeight: "600",
  },
  textActive: {
    color: colors.purple,
  },
});
