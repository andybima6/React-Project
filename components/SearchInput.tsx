import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
import { usePathname } from "expo-router";
import { router } from "expo-router";

const SearchInput = ({ initialQuery }) => {
  const pathname = usePathname();

  const [query, setQuery] = useState(initialQuery || "");
  return (
    <View style={styles.inputContainer}>
      <TextInput style={styles.input} value={query} placeholder="Search For a Video Topic" placeholderTextColor="#CDCDE0" onChangeText={(e) => setQuery(e)} />
      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert("Missing Query", "Please input something to search for results across the database");
          }
          if (pathname.startsWith("/search")) {
            router.setParams({ query });
          } else {
            router.push(`/search/${query}`); // Perbaikan di sini
          }
        }}
      >
        <Image source={icons.search} className="w-5 h-5" resizeMethod="contain"></Image>
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: 8, // Adjust as needed
  },
  title: {
    color: "#D3D3D3", // Replace with your gray color
    fontFamily: "pmedium", // Replace with your font
    fontSize: 16, // Adjust as needed
    marginTop: 8, // Adjust as needed
  },
  inputContainer: {
    width: "100%",
    height: 64, // Adjust as needed
    paddingHorizontal: 16, // Adjust as needed
    backgroundColor: "#000", // Replace with your black color
    borderColor: "#333", // Replace with your border color
    borderWidth: 2,
    borderRadius: 20, // Adjust as needed
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    color: "#FFF", // Replace with your white color
    fontFamily: "psemibold", // Replace with your font
    fontSize: 16, // Adjust as needed
  },
  icon: {
    width: 24, // Adjust as needed
    height: 24, // Adjust as needed
  },
});
