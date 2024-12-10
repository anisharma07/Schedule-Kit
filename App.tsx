/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme, Text} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import MainApp from './src/main';
import Footer from './src/components/footer';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <MainApp />
      <Footer />
    </SafeAreaView>
  );
}
export default App;
