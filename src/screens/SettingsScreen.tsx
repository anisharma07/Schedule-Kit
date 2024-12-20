import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Footer from '../components/footer';

const SettingsScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Settings Screen</Text>
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

export default SettingsScreen;
