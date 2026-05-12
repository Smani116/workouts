import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthStore } from "../../stores/authStore";
import { colors, spacing, radius, fontSize } from "../../constants/theme";

export default function ProfileScreen() {
  const { user, logout } = useAuthStore();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.avatarSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.displayName?.charAt(0)?.toUpperCase() ?? "?"}
            </Text>
          </View>
          <Text style={styles.name}>{user?.displayName ?? "User"}</Text>
          <Text style={styles.email}>{user?.email ?? ""}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>📊 Stats (Coming Soon)</Text>
          <View style={styles.statRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>—</Text>
              <Text style={styles.statLabel}>Workouts</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>—</Text>
              <Text style={styles.statLabel}>Stars</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>—</Text>
              <Text style={styles.statLabel}>Streak</Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>🚀 Coming Soon</Text>
          <View style={styles.featureRow}>
            <Text style={styles.featureIcon}>👥</Text>
            <View>
              <Text style={styles.featureName}>Share with Friends</Text>
              <Text style={styles.featureDesc}>
                Compare progress individually or in groups
              </Text>
            </View>
          </View>
          <View style={styles.featureRow}>
            <Text style={styles.featureIcon}>🏆</Text>
            <View>
              <Text style={styles.featureName}>Leaderboard</Text>
              <Text style={styles.featureDesc}>
                See who's giving their best this week
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={logout}
          activeOpacity={0.7}
        >
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
  },
  avatarSection: {
    alignItems: "center",
    marginBottom: spacing.xl,
    marginTop: spacing.md,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.accentGlow,
    borderWidth: 2,
    borderColor: colors.accent,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
  },
  avatarText: {
    color: colors.accent,
    fontSize: fontSize.xxxl,
    fontWeight: "800",
  },
  name: {
    color: colors.textPrimary,
    fontSize: fontSize.xxl,
    fontWeight: "800",
  },
  email: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
    marginTop: 4,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
  },
  cardTitle: {
    color: colors.textPrimary,
    fontSize: fontSize.lg,
    fontWeight: "700",
    marginBottom: spacing.md,
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statValue: {
    color: colors.accentLight,
    fontSize: fontSize.xxl,
    fontWeight: "800",
  },
  statLabel: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.border,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  featureIcon: {
    fontSize: 28,
  },
  featureName: {
    color: colors.textPrimary,
    fontSize: fontSize.base,
    fontWeight: "600",
  },
  featureDesc: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
    marginTop: 2,
  },
  logoutButton: {
    backgroundColor: colors.dangerGlow,
    borderRadius: radius.md,
    padding: spacing.md,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.danger,
    marginTop: spacing.md,
  },
  logoutText: {
    color: colors.danger,
    fontSize: fontSize.base,
    fontWeight: "700",
  },
});
