import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

type Props = {
  toggler: () => void;
};

const Header: React.FC<Props> = ({toggler}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => toggler()}>
        <Image
          source={require('../assets/images/registers.png')}
          style={{width: 50, height: 50}}
        />
      </TouchableOpacity>

      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          marginLeft: 10,
          color: 'white',
        }}>
        Semester V
      </Text>
      <TouchableOpacity>
        <Image
          source={require('../assets/images/profile.png')}
          style={{width: 50, height: 50}}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 70,
    margin: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '92%',
    marginBottom: 5,
    marginTop: 10,
  },
});

export default Header;
