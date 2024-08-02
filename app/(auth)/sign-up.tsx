import { StyleSheet, Text, View, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, useRouter } from "expo-router";
import { createUsers } from "../../lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
   const {setUser,setIsLoggedIn} = useGlobalContext();

  const submit = async () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert("Error", "Please Fill in All the Fields");
      return;
    }
    setIsSubmitting(true);

    try {
      const result = await createUsers(form.email, form.password, form.username);
    
      setUser(result);
      setIsLoggedIn(true);
      router.replace('/home');
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Error", error.message);
      } else {
        Alert.alert("Error", "An unknown error occurred.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[70vh] px-4 my-6">
          <Image source={images.logo} resizeMode="contain" className="w-[115px] h-[35px]" />
          <Text className="text-white text-2xl mt-10 font-psemibold">Sign Up To Aora</Text>

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(event) =>
              setForm({
                ...form,
                username: event,
              })
            }
            otherStyles="mt-7"
          />

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(event) =>
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
            handleChangeText={(event) =>
              setForm({
                ...form,
                password: event,
              })
            }
            otherStyles="mt-7"
            secureTextEntry
          />

          <CustomButton title="Sign Up" handlePress={submit} containerStyles="mt-7" isLoading={isSubmitting} />

          <View className="justify-center items-center pt-5 flex-row gap-2">
            <Text className="text-white font-pregular">Already have an account?</Text>
            <Link href={"/sign-in"} className="text-lg text-secondary-100 font-psemibold">
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
