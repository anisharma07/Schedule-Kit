import React, {useState, useRef} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Sidebar from '../components/Sidebar';
import AiScreen from '../screens/AiScreen';
import TimeTableScreen from '../screens/TimeTableScreen';
import TeamsScreen from '../screens/TeamsScreen';

import {
  Animated,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Easing,
  PanResponder,
} from 'react-native';
import CustomTabBar from '../components/CustomTabBar';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
const {width} = Dimensions.get('window');

type TabParamList = {
  Home: undefined;
  Teams: undefined;
  Ai: undefined;
  Time: undefined;
  Settings: undefined;
};
const Tab = createBottomTabNavigator<TabParamList>();

const Tabs: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarTranslate = useRef(new Animated.Value(-width * 0.8)).current;

  const toggleSidebar = () => {
    Animated.timing(sidebarTranslate, {
      toValue: isOpen ? -width * 0.8 : 0,
      duration: 500, // Increase duration for smoother animation
      easing: Easing.out(Easing.exp), // Use easing function for smoother curve
      useNativeDriver: true,
    }).start(() => {
      setIsOpen(!isOpen);
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return Math.abs(gestureState.dx) > 20;
      },
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dx < 0) {
          sidebarTranslate.setValue(gestureState.dx);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx < -width * 0.4) {
          Animated.timing(sidebarTranslate, {
            toValue: -width * 0.8,
            duration: 500,
            easing: Easing.out(Easing.exp),
            useNativeDriver: true,
          }).start(() => {
            setIsOpen(false);
          });
        } else {
          Animated.timing(sidebarTranslate, {
            toValue: 0,
            duration: 500,
            easing: Easing.out(Easing.exp),
            useNativeDriver: true,
          }).start(() => {
            setIsOpen(true);
          });
        }
      },
    }),
  ).current;

  const overlayOpacity = sidebarTranslate.interpolate({
    inputRange: [-width * 0.8, 0],
    outputRange: [0, 0.7],
    extrapolate: 'clamp',
  });

  return (
    <>
      <Tab.Navigator
        initialRouteName="Home"
        tabBar={props => <CustomTabBar {...props} />}
        screenOptions={{
          headerShown: false,
          tabBarStyle: {backgroundColor: '#000000'},
        }}>
        <Tab.Screen name="Home">
          {props => <HomeScreen {...props} toggleSidebar={toggleSidebar} />}
        </Tab.Screen>
        <Tab.Screen name="Teams" component={TeamsScreen} />
        <Tab.Screen name="Ai" component={AiScreen} />
        <Tab.Screen name="Time" component={TimeTableScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
      {/* SIDEBAR  */}
      <Animated.View
        style={[styles.overlay, {opacity: overlayOpacity}]}
        pointerEvents={isOpen ? 'auto' : 'none'}>
        <TouchableOpacity
          activeOpacity={1}
          style={StyleSheet.absoluteFill}
          onPress={toggleSidebar}
        />
      </Animated.View>
      <Animated.View
        style={[styles.sidebar, {transform: [{translateX: sidebarTranslate}]}]}
        {...panResponder.panHandlers}>
        <Sidebar closeSideBar={toggleSidebar} />
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: width * 0.8,
    maxWidth: width * 1,
    backgroundColor: '#18181B',
    padding: 20,
    borderRightWidth: 1,
    borderColor: '#252525',
    zIndex: 1000000,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 100,
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
});
export default Tabs;
