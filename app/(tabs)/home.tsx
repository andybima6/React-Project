import { View, Text, FlatList, Image, RefreshControl, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import SearchInput from "@/components/SearchInput";
import Trending from "@/components/Trending";
import EmptyState from "@/components/EmptyState";
import { getAllPosts, getLatestPosts } from "@/lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import VideoCards from "@/components/VideoCards";
import { ResizeMode, Video } from "expo-av";

const Home = () => {
  const { data: posts, refetch } = useAppwrite(getAllPosts);
  const { data: latestPosts } = useAppwrite(getLatestPosts);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    // Re call video -> if any new video appeard
    setRefreshing(false);
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
              thumbnail : item.thumbnail,
              video: item.video,
              creator: { username: item.creator.username, avatar: item.creator.avatar},
            }}
          />
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">Welcome back</Text>
                <Text className="text-2xl font-psemibold text-white">AndyMystery</Text>
              </View>
              <View className="mt-1.5">
                <Image source={images.logoSmall} className="w-9 h-10" resizeMode="contain"></Image>
              </View>
            </View>
            <SearchInput />

            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 text-lg font-pregular mb-3">latest Videos</Text>

              <Trending posts={latestPosts ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => <EmptyState title="No Videos Found" subtitle="be the first on to upload a video" />}
        // seperti instagram membuaka data baru atau tampilan baru yang terbaru
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  );
};

export default Home;
