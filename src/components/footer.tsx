import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Svg, {Path} from 'react-native-svg';

const Footer: React.FC = () => {
  return (
    <View style={styles.footer}>
      <Image
        source={require('../assets/images/team.png')}
        style={styles.logo}
      />
      <Image
        source={require('../assets/images/home.png')}
        style={styles.logo}
      />
      <Image
        source={require('../assets/images/settings.png')}
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: '#27272A',
    height: 80,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  footerText: {
    color: '#ffffff',
    fontSize: 14,
  },
  logo: {
    width: 30,
    height: 30,
    marginBottom: 10,
  },
});

export default Footer;
