import React, {useState, useEffect} from 'react';
import Card from '../components/Cards/Card';
import Spacer from '../components/Spacer';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import MiniCard from '../components/Cards/MiniCard';
import useStore from '../store/store';
import {CardInterface} from '../types/cards';
import Header from '../components/Header';
interface HomeScreenProps {
  toggleSidebar: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({
  navigation,
  route,
  toggleSidebar,
}: any) => {
  const {registers, activeRegister, updatedAt, setRegisterCardSize} =
    useStore();
  const [cardSize, setCardSize] = useState('normal');
  const [currentRegister, setCurrentRegister] = useState<CardInterface[]>([]);

  useEffect(() => {
    setCurrentRegister(registers[activeRegister]?.cards || []);
    // console.log('lele', registers['default'][0]?.days);
    setCardSize(registers[activeRegister]?.card_size);
  }, [updatedAt, activeRegister]);

  const handleEdit = (id: number) => {
    navigation.navigate('Edit', {card_register: activeRegister, card_id: id});
  };

  const toggleSort = () => {
    if (cardSize == 'small') setRegisterCardSize(activeRegister, 'normal');
    else setRegisterCardSize(activeRegister, 'small');
  };

  return (
    <View style={styles.homeView}>
      <Header
        toggler={toggleSidebar}
        changeStack={navigation.navigate}
        registerName={registers[activeRegister]?.name}
      />
      {/* Custom Drawer */}

      <TouchableOpacity onPress={toggleSort}>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.logo}
        />
      </TouchableOpacity>
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
        {currentRegister.map((card, index) =>
          cardSize == 'small' ? (
            <MiniCard
              key={index}
              id={card.id}
              title={card.title}
              present={card.present}
              total={card.total}
              target_percentage={card.target_percentage}
              tagColor={card.tagColor}
              activeRegister={activeRegister}
              handleEdit={handleEdit}
            />
          ) : (
            <Card
              key={index}
              id={card.id}
              title={card.title}
              present={card.present}
              total={card.total}
              target_percentage={card.target_percentage}
              tagColor={card.tagColor}
              activeRegister={activeRegister}
              handleEdit={handleEdit}
            />
          ),
        )}
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
  logo: {
    width: 50,
    height: 50,
    marginLeft: '50%',
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
