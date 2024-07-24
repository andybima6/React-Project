import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {Link} from 'expo-router';

import { StatusBar } from 'expo-status-bar';

const index = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white ">
       <StatusBar style="auto" />
      <Text className="text-3xl font-pblack">Aora!!</Text>
      <Link href="/home" style={{color:'blue'}}>Go to Home</Link>
    </View>
  )
}

export default index

const styles = StyleSheet.create({})