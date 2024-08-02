import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "@/components/EmptyState";
import { getUserPosts, signOut } from "@/lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import VideoCards from "@/components/VideoCards";
import { useGlobalContext } from "@/context/GlobalProvider";
import { icons } from "@/constants";
import InfoBox from "@/components/InfoBox";
import { router } from "expo-router";

const profile = () => {
  
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const { data: posts } = useAppwrite(() => getUserPosts(user.$id));
  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);

    router.replace('/sign-in');
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCards
            videos={{
              tittle: item.tittle,
              thumbnail: item.thumbnail,
              video: item.video,
              creator: { username: item.creator.username, avatar: item.creator.avatar },
            }}
          />
        )}
        ListHeaderComponent={() => (
          <View className="justify-center items-center mt-6 mb-12 px-4 w-full">
            <TouchableOpacity className="w-full items-end mt-2" onPress={logout}>
              <Image source={icons.logout} resizeMode="contain" className="w-6 h-6"></Image>
            </TouchableOpacity>
            <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
              <Image source={{ uri: user?.avatar }} className="w-[90%] h-[90%] rounded-lg" resizeMode="cover"></Image>
            </View>
            <InfoBox title={user?.username} containerStyles="mt-5" titleStyles="text-lg"></InfoBox>
            <View className="mt-2 flex-row">
              <InfoBox title={posts.length || 0} subtitle="Posts" containerStyles="mr-10" titleStyles="text-xl"></InfoBox>
              <InfoBox title="1.2k" subtitle="Followers" titleStyles="text-xl"></InfoBox>
            </View>
          </View>
        )}
        ListEmptyComponent={() => <EmptyState title="No Videos Found" subtitle="No Video Found for this search query" />}
        // seperti instagram membuaka data baru atau tampilan baru yang terbaru
      />
    </SafeAreaView>
  );
};

export default profile;
