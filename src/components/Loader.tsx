// components/Loader.js
import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

const Loader = ({size = 'large', color = '#007bff'}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loader;
