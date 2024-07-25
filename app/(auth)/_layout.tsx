import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="sign-in"
          options={{
            headerShown: false,
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="sign-up"
          options={{
            headerShown: false,
          }}
        ></Stack.Screen>
      </Stack>

      <StatusBar backgroundColor="#161622" style="light"></StatusBar>
    </>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({});
