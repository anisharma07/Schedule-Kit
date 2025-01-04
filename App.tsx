import React from 'react';

import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import Toast from 'react-native-toast-message';
import MainApp from './src/main';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={[styles.container]}>
      <StatusBar barStyle={'light-content'} backgroundColor="#18181B" />
      <MainApp />
      <Toast />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#18181B',
  },
});
export default App;
