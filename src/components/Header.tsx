import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

type Props = {
  toggler: () => void;
  changeStack: (type: string) => void;
};

const Header: React.FC<Props> = ({toggler, changeStack}) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
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
        <TouchableOpacity onPress={() => changeStack('Add')}>
          <Image
            source={require('../assets/icons/add.png')}
            style={{width: 50, height: 50}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    backgroundColor: '#18181B',
  },
  headerContent: {
    height: 70,
    margin: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '92%',
    paddingBottom: 5,
    paddingTop: 10,
  },
});

export default Header;
