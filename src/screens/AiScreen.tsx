import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import SmoothDrawer from '../components/SmoothDrawer';

const AiScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={{color: '#fff'}}>AI Screen</Text>
      <SmoothDrawer />
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

export default AiScreen;
