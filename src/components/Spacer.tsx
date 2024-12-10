import React from 'react';
import {View, StyleSheet} from 'react-native';

const Spacer = () => {
  return <View style={styles.spacer} />;
};

const styles = StyleSheet.create({
  spacer: {
    height: 80,
  },
});

export default Spacer;
