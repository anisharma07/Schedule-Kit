import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';

const CustomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  return (
    <View style={styles.navigationBar}>
      <View style={styles.footer}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          let iconName: any = null;
          if (route.name === 'Home') {
            iconName = require('../assets/icons/navigation/home.png');
          } else if (route.name === 'Settings') {
            iconName = require('../assets/icons/navigation/settings.png');
          } else if (route.name === 'Ai') {
            iconName = require('../assets/icons/navigation/ai.png');
          } else if (route.name === 'Teams') {
            iconName = require('../assets/icons/navigation/team.png');
          } else if (route.name === 'Time') {
            iconName = require('../assets/icons/navigation/time-table.png');
          }

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.button}>
              <View style={styles.boxy}>
                <Image source={iconName} style={styles.logo} />
              </View>
              {isFocused && (
                <Image
                  source={require('../assets/icons/navigation/glow.png')}
                  style={styles.activeTab}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navigationBar: {
    width: '100%',
    height: 70,
    position: 'absolute',
    bottom: 12,
    left: 0,
  },
  footer: {
    width: '95%',
    borderRadius: 50,
    margin: 'auto',
    backgroundColor: '#27272A',
    height: 70,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  footerText: {
    color: '#ffffff',
    fontSize: 14,
  },
  logo: {
    width: 25,
    height: 25,
  },
  button: {
    alignItems: 'center',
    position: 'relative',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 12,
  },
  activeTab: {
    width: 70,
    height: 70,
    position: 'absolute',
    top: 0,
    left: -17,
    zIndex: -1,
  },
  boxy: {
    paddingLeft: 5,
    paddingRight: 5,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomTabBar;
