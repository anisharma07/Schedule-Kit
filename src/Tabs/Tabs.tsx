import React, {useState, useRef} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import AiScreen from '../screens/AiScreen';
import TimeTableScreen from '../screens/TimeTableScreen';
import TeamsScreen from '../screens/TeamsScreen';
import {
  Animated,
  Button,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewComponent,
  Text,
} from 'react-native';
import CustomTabBar from '../components/CustomTabBar';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import {StackNavigationProp} from '@react-navigation/stack';
const {width} = Dimensions.get('window');

type TabParamList = {
  Home: undefined;
  Teams: undefined;
  Ai: undefined;
  Time: undefined;
  Settings: undefined;
};
const Tab = createBottomTabNavigator<TabParamList>();

const Tabs: React.FC = ({navigation, route}: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarTranslate = useRef(new Animated.Value(-width * 0.8)).current;

  const toggleSidebar = () => {
    Animated.timing(sidebarTranslate, {
      toValue: isOpen ? -width * 0.8 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setIsOpen(!isOpen);
    });
  };
  return (
    <>
      <Header toggler={toggleSidebar} changeStack={navigation.navigate} />
      <Tab.Navigator
        initialRouteName="Home"
        tabBar={props => <CustomTabBar {...props} />}
        screenOptions={{
          headerShown: false,
          tabBarStyle: {backgroundColor: '#000000'}, // Set background color to transparent
        }}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Teams" component={TeamsScreen} />
        <Tab.Screen name="Ai" component={AiScreen} />
        <Tab.Screen name="Time" component={TimeTableScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
      {/* SIDEBAR  */}
      {isOpen && (
        <TouchableOpacity
          activeOpacity={1}
          style={styles.overlay}
          onPress={toggleSidebar}></TouchableOpacity>
      )}
      <Animated.View
        style={[styles.sidebar, {transform: [{translateX: sidebarTranslate}]}]}>
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
    width: width * 0.8, // 80% of screen width
    backgroundColor: '#1e1e1e',
    padding: 20,
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
export default Tabs;
