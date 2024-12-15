/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  StyleSheet,
  Dimensions,
} from 'react-native';

import MainApp from './src/main';
import Footer from './src/components/footer';
import Header from './src/components/Header';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={[styles.container]}>
      <StatusBar barStyle={'light-content'} backgroundColor="#18181B" />
      <Header />
      <MainApp />
      <Footer />
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
