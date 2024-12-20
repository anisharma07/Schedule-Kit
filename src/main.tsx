import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {StyleSheet} from 'react-native';
import Tabs from './Tabs/Tabs';
import AddCard from './screens/AddCard';

type RootStackParamList = {
  Tab: undefined;
  Add: undefined;
  Edit: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainApp = ({}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Tab"
          component={Tabs}
          options={{animation: 'slide_from_bottom'}}
        />

        <Stack.Screen
          name="Add"
          component={AddCard}
          options={{animation: 'slide_from_right'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default MainApp;
