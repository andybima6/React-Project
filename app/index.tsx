import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "../components/CustomButton";

const index = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        {/* vh membantu memusaaatkan tampilan ke tengah */}
        <View className="w-full min-h-[85vh]  items-center px-4">
          <Image source={images.logo} className="w-[130px] h-[84px]" resizeMode="contain"></Image>
          {/* resizeMode adalah properti dari komponen Image di React Native yang menentukan bagaimana gambar 
          akan diubah ukurannya untuk menyesuaikan dengan ukuran yang ditentuka */}
          <Image source={images.cards} className="max-w-[380px] w-full h-[300px]" resizeMode="contain"></Image>

          <View claassName="relative mt-5">
            {/* Kelas text-3xl mengatur ukuran teks menjadi sangat besar, membuat teks lebih menonjol. */}
            <Text className="text-3xl text-center text-white font-bold">
              Discover Endless Possibilities With <Text className="text-secondary-200">Aora</Text>
            </Text>
            <Image source={images.path} className="w-[135px] h-[15px] absolute -bottom-3 -right-8" resizeMode="contain"></Image>
          </View>
          <Text
            //  text-sm mengatur ukuran teks menjadi kecil, cocok untuk teks deskriptif atau tambahan yang tidak perlu terlalu menonjol.
            className="text-center text-gray-100 font-pregular mt-8 text-sm"
          >
            Where Creativity Meets innovation: Embark on a Journey of limitless With Aora
          </Text>
            {/* code customButoon berada di components */}
          <CustomButton title="Continue With Email" handlePress={() => router.push('/sign-in')} containerStyles="w-full mt-7" />
        </View>
      </ScrollView>
        {/* Digunakan untuk menerangkan seperti baterai,wifi,dll yaang berada diatas */}
      <StatusBar backgroundColor="#161622" style="light"/>
    </SafeAreaView>
  );
};

export default index;
