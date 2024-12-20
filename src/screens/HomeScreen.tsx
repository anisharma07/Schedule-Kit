import React, {useState, useRef} from 'react';
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
import Sidebar from '../components/Sidebar';
import MiniCard from '../components/MiniCard';
// import Footer from '../components/footer';
const {width} = Dimensions.get('window');

const HomeScreen: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarTranslate = useRef(new Animated.Value(-width * 0.8)).current;

  const toggleSidebar = () => {
    Animated.timing(sidebarTranslate, {
      toValue: isOpen ? -width * 0.8 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setIsOpen(!isOpen);
    });
  };
  return (
    <View style={styles.homeView}>
      {/* Custom Drawer */}
      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={isOpen}
        onRequestClose={toggleSidebar}
      /> */}

      {/* overlay */}
      {/* <View style={styles.overlay}>
        
      </View> */}

      {/* Cards  */}
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}>
        {/* <Card />
        <Card />
        <Card />
        <Card />
        <Card /> */}
        <Card />

        <MiniCard />
        <MiniCard />
        <MiniCard />
        <MiniCard />
        <MiniCard />
        <MiniCard />
        <MiniCard />
        <MiniCard />
        <MiniCard />
        <MiniCard />
        <MiniCard />
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
  sidebar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: Dimensions.get('window').width * 0.8, // 80% of screen width
    backgroundColor: '#1e1e1e',
    padding: 20,
    zIndex: 1000000,
  },
  sidebarText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default HomeScreen;
