import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

const Profile = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Aora!!</Text>
      <Link href="/profile" style={styles.link}>Go  to Profile</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  link: {
    color: 'blue',
    fontSize: 18,
  },
});

export default Profile;
