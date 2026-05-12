import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Link } from "expo-router";
import { useAuthStore } from "../../stores/authStore";
import { colors, spacing, radius, fontSize } from "../../constants/theme";

export default function RegisterScreen() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { register, isLoading, error } = useAuthStore();
  const [localError, setLocalError] = useState<string | null>(null);

  const handleRegister = () => {
    setLocalError(null);
    if (!displayName.trim() || !email.trim() || !password.trim()) {
      setLocalError("All fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      setLocalError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setLocalError("Password must be at least 6 characters.");
      return;
    }
    register(email.trim(), password, displayName.trim());
  };

  const displayError = localError || error;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.emoji}>🏋️</Text>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>
            Start tracking your workout progress
          </Text>
        </View>

        <View style={styles.form}>
          {displayError && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{displayError}</Text>
            </View>
          )}

          <Text style={styles.label}>DISPLAY NAME</Text>
          <TextInput
            style={styles.input}
            placeholder="Your name"
            placeholderTextColor={colors.textMuted}
            autoCapitalize="words"
            value={displayName}
            onChangeText={setDisplayName}
          />

          <Text style={styles.label}>EMAIL</Text>
          <TextInput
            style={styles.input}
            placeholder="your@email.com"
            placeholderTextColor={colors.textMuted}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>PASSWORD</Text>
          <TextInput
            style={styles.input}
            placeholder="Min 6 characters"
            placeholderTextColor={colors.textMuted}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <Text style={styles.label}>CONFIRM PASSWORD</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            placeholderTextColor={colors.textMuted}
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleRegister}
            disabled={isLoading}
            activeOpacity={0.8}
          >
            {isLoading ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              <Text style={styles.buttonText}>Create Account</Text>
            )}
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <Link href="/(auth)/login" asChild>
              <TouchableOpacity>
                <Text style={styles.footerLink}>Sign In</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    padding: spacing.lg,
  },
  header: {
    alignItems: "center",
    marginBottom: spacing.xxl,
  },
  emoji: {
    fontSize: 56,
    marginBottom: spacing.md,
  },
  title: {
    fontSize: fontSize.xxxl,
    fontWeight: "800",
    color: colors.accentLight,
    marginBottom: spacing.sm,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: fontSize.base,
  },
  form: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  errorBox: {
    backgroundColor: colors.dangerGlow,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.danger,
  },
  errorText: {
    color: colors.danger,
    fontSize: fontSize.sm,
    textAlign: "center",
  },
  label: {
    color: colors.textSecondary,
    fontSize: fontSize.xs,
    fontWeight: "600",
    letterSpacing: 1.5,
    marginBottom: spacing.sm,
    marginTop: spacing.md,
  },
  input: {
    backgroundColor: "rgba(15, 23, 42, 0.8)",
    color: colors.textPrimary,
    fontSize: fontSize.base,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  button: {
    backgroundColor: colors.accent,
    padding: spacing.md,
    borderRadius: radius.md,
    alignItems: "center",
    marginTop: spacing.lg,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: colors.white,
    fontSize: fontSize.lg,
    fontWeight: "700",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: spacing.lg,
  },
  footerText: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
  },
  footerLink: {
    color: colors.accent,
    fontSize: fontSize.sm,
    fontWeight: "700",
  },
});
