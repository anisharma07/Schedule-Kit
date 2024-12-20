import React, {useState} from 'react';
import Card from '../components/Card';
import Spacer from '../components/Spacer';
import Header from '../components/Header';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
} from 'react-native';
// import Footer from '../components/footer';
const HomeScreen: React.FC = () => {
  const [isDrawerVisible, setDrawerVisible] = useState(false);
  const [slideAnim] = useState(
    new Animated.Value(-Dimensions.get('window').width),
  ); // Initial position off-screen

  const toggleDrawer = () => {
    if (isDrawerVisible) {
      // Slide out
      Animated.timing(slideAnim, {
        toValue: -Dimensions.get('window').width, // Move off-screen
        duration: 150,
        useNativeDriver: true,
      }).start(() => setDrawerVisible(false));
    } else {
      setDrawerVisible(true);
      // Slide in
      Animated.timing(slideAnim, {
        toValue: 0, // Move to visible position
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };
  return (
    <View style={styles.homeView}>
      <Header toggler={toggleDrawer} />

      {/* Custom Drawer */}
      {isDrawerVisible && (
        <Modal
          transparent={true}
          animationType="none"
          visible={isDrawerVisible}>
          <TouchableOpacity style={styles.overlay} onPress={toggleDrawer} />

          <Animated.View
            style={[
              styles.drawerContainer,
              {transform: [{translateX: slideAnim}]},
            ]}>
            <View style={styles.drawerContent}>
              <Text style={styles.drawerTitle}>Activity Registers</Text>

              {/* List of Registers */}
              {Array.from({length: 5}, (_, index) => (
                <View key={index} style={styles.registerItem}>
                  <Text style={styles.registerText}>Register {index + 1}</Text>
                  <TouchableOpacity style={styles.editButton}>
                    <Text style={styles.editText}>✏️</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.deleteButton}>
                    <Text style={styles.deleteText}>🗑️</Text>
                  </TouchableOpacity>
                </View>
              ))}

              {/* Add New Register */}
              <TouchableOpacity style={styles.addButton}>
                <Text style={styles.addText}>Create New Register ➕</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </Modal>
      )}

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Spacer />
      </ScrollView>
      {/* <Footer navigate={navigate} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  homeView: {
    flex: 1,
    backgroundColor: '#18181B',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 20,
    paddingTop: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 24,
    color: '#fff',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  drawerContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: Dimensions.get('window').width * 0.8, // 80% of screen width
    backgroundColor: '#1e1e1e',
    padding: 20,
  },
  drawerContent: {
    flex: 1,
  },
  drawerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  registerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    marginVertical: 5,
    padding: 7,
    borderRadius: 5,
  },
  registerText: {
    flex: 1,
    color: '#fff',
  },
  editButton: {
    marginHorizontal: 5,
  },
  editText: {
    color: '#00ff00',
  },
  deleteButton: {
    marginHorizontal: 5,
  },
  deleteText: {
    color: '#ff0000',
  },
  addButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#4caf50',
    borderRadius: 5,
    alignItems: 'center',
  },
  addText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
