import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

type Props = {
  closeSideBar: () => void;
};

const Sidebar: React.FC<Props> = ({closeSideBar}) => {
  return (
    <View style={styles.container}>
      {/* Sidebar */}
      <View style={styles.mainContent}>
        <Text style={styles.mainText}>Main Content</Text>
        <Text style={styles.sidebarText}>Sidebar Content</Text>
      </View>

      <TouchableOpacity style={styles.menuButton} onPress={closeSideBar}>
        <Text style={styles.menuText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebarText: {
    color: '#fff',
    fontSize: 18,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: '#6200ee',
    padding: 10,
    borderRadius: 5,
  },
  menuText: {
    color: '#fff',
    fontSize: 16,
  },
  mainText: {
    fontSize: 20,
    color: '#333',
  },
});

export default Sidebar;
