import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

type Props = {
  toggler: () => void;
  changeStack: (type: string) => void;
  registerName: string;
};

const Header: React.FC<Props> = ({toggler, changeStack, registerName}) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <TouchableOpacity onPress={toggler}>
          <Image
            source={require('../assets/images/registers.png')}
            style={{width: 45, height: 45}}
          />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            marginLeft: 10,
            color: 'white',
          }}>
          {registerName}
        </Text>
        <TouchableOpacity
          onPress={() => changeStack('Add')}
          style={styles.addBtn}>
          <Text style={{color: 'white', fontSize: 20}}>Add</Text>
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
  addBtn: {
    padding: 5,
    paddingHorizontal: 15,
    backgroundColor: '#690000',
    borderRadius: 10,
    textAlign: 'center',
  },
});

export default Header;
