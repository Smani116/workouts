import React, { useEffect } from "react";
import { Slot, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useAuthStore } from "../stores/authStore";
import { colors } from "../constants/theme";

export default function RootLayout() {
  const { token, isLoading, loadToken } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    loadToken();
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!token && !inAuthGroup) {
      router.replace("/(auth)/login");
    } else if (token && inAuthGroup) {
      router.replace("/(tabs)");
    }
  }, [token, isLoading, segments]);

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={colors.accent} />
        <StatusBar style="light" />
      </View>
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <Slot />
    </>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
});
