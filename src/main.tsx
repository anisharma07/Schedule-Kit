import React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import CustomTabBar from './components/CustomTabBar';
type TabParamList = {
  Home: undefined;
  Teams: undefined;
  Ai: undefined;
  Time: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const MainApp = ({}) => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        tabBar={props => <CustomTabBar {...props} />}
        screenOptions={{
          headerShown: false,
          tabBarStyle: {backgroundColor: '#000000'}, // Set background color to transparent
        }}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Teams" component={SettingsScreen} />
        <Tab.Screen name="Ai" component={SettingsScreen} />
        <Tab.Screen name="Time" component={SettingsScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MainApp;
