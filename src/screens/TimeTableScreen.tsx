import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const TimeTableScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Time Table Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#18181B',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TimeTableScreen;
