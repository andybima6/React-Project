import { View, Text, FlatList, Image, RefreshControl, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import SearchInput from "@/components/SearchInput";
import Trending from "@/components/Trending";
import EmptyState from "@/components/EmptyState";
import { searchPosts,getAllPosts } from "@/lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import VideoCards from "@/components/VideoCards";
import { ResizeMode, Video } from "expo-av";
import { useLocalSearchParams } from "expo-router";

const Search = () => {
  const { query } = useLocalSearchParams();
  const { data: posts, refetch } = useAppwrite(() => searchPosts(query));

  console.log(query,posts)
  useEffect(() => {
    refetch();
  }, [query]);
 
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
          <View className="my-6 px-4">
            <View>
              <Text className="font-pmedium text-sm text-gray-100">Search Result</Text>
              <Text className="text-2xl font-psemibold text-white mb-2">{query}</Text>
              <View classNamew="mt-6 mb-8">
                <SearchInput initialQuery={query} />
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={() => <EmptyState title="No Videos Found" subtitle="No Video Found for this search query" />}
        // seperti instagram membuaka data baru atau tampilan baru yang terbaru
      />
    </SafeAreaView>
  );
};

export default Search;
