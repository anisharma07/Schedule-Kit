import React from 'react';

import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';

import MainApp from './src/main';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={[styles.container]}>
      <StatusBar barStyle={'light-content'} backgroundColor="#18181B" />
      <MainApp />
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
