import { StyleSheet, Text, View, ScrollView, Image, } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import {Link} from "expo-router"

const signUp = () => {
  const [form, setForm] = useState({
    username:"",
    email: "",
    password: "",
  });

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[70vh] px-4 my-6">
          <Image source={images.logo} resizeMode="contain" className="w-[115px] h-[35px] "></Image>
          <Text className="text-white text-2xl  text-semibold mt-10 font-psemibold">Log in To Aora</Text>

          <FormField
            title="Username"
            value={form.username}
            hadnleChangeText={(event) =>
              setForm({
                ...form,
                username: event,
              })
            }
            otherStyles="mt-7"
            keyboardType="username-address"
          />

          <FormField
            title="Email"
            value={form.email}
            hadnleChangeText={(event) =>
              setForm({
                ...form,
                email: event,
              })
            }
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            hadnleChangeText={(event) =>
              setForm({
                ...form,
                password: event,
              })
            }
            otherStyles="mt-7"
            keyboardType="password-address"
          />

          <CustomButton
          title="Sig In"
          // handlePress={submit}
          containerStyles="mt-7"
          // isLoading={isSubmitting}
          >

          </CustomButton>

          <View className="justify-center items-center pt-5 flex-row gap-2">
            <Text className="text-white font-pregular">have an account already?</Text>
            <Link href={"/sign-in"} className="text-lg text-secondary-100 font-psemibold">Sign in
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default signUp;

const styles = StyleSheet.create({});
