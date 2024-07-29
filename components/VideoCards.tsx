import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";

const VideoCards = ({ video }) => {
  const {
    title = '',
    thumbnail = '',
    video: videoUrl = '',
    creator = {}
  } = video || {};

  const { username = '', avatar = '' } = creator;
  const [play, setPlay] = useState(false);
  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center flex-row items-center flex-1 ">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
            <Image source={{ uri: avatar }} classname="w-full h-full rounded-lg" resizeMode="cover"></Image>
          </View>
          <View className="flex-1 justify-center ml-3 gap-y-1">
            <Text className="text-white font-psemibold text-sm" numberOfLines={1}>
              {title}
            </Text>
            <Text className="text-xs text-gray-100 font-pregular" numberOfLines={1}>
              {username}
            </Text>
          </View>
        </View>
        <View className="pt-2">
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain"></Image>
        </View>
      </View>
      {play ? (
        <Text className = "text-white">Playing</Text>
      ) : (
        <TouchableOpacity className="w-full h-60 rounded-xl mt-3 relative justify-center items-center" activeOpacity={0.7} onPress={() => setPlay(true)}>
          <Image source={{ uri: thumbnail }} className="w-full h-full rounded-xl mt-3" resizeMode="cover"></Image>
          <Image source={icons.play} className="w-12 h-12 absolute " resizeMode="contain"></Image>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCards;

const styles = StyleSheet.create({});
