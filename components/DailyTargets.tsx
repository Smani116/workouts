import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { DAILY_TARGETS } from "../constants/workoutData";
import { colors, spacing, radius, fontSize } from "../constants/theme";

export default function DailyTargets() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔥 Daily Targets</Text>
      {DAILY_TARGETS.map((target, index) => (
        <View key={index} style={styles.row}>
          <View style={styles.iconBox}>
            <Text style={styles.icon}>{target.icon}</Text>
          </View>
          <Text style={styles.text}>{target.text}</Text>
        </View>
      ))}
      <View style={styles.divider} />
      <Text style={styles.hashtags}>
        #trending #reels #gymmotivation #gym #diet
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  title: {
    color: colors.gold,
    fontSize: fontSize.xl,
    fontWeight: "700",
    marginBottom: spacing.md,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
  },
  icon: {
    fontSize: 22,
  },
  text: {
    color: colors.textPrimary,
    fontSize: fontSize.base,
    fontWeight: "500",
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginTop: spacing.sm,
    marginBottom: spacing.md,
  },
  hashtags: {
    color: colors.textMuted,
    fontSize: fontSize.sm,
    letterSpacing: 0.5,
    lineHeight: 22,
  },
});
