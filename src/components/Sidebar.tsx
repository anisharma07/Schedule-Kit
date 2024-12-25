import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Animated,
  Easing,
  Alert,
} from 'react-native';
import useStore from '../store/store';

type Props = {
  closeSideBar: () => void;
};

type RegisterProps = {
  name: string;
  index: number;
};

const Register: React.FC<RegisterProps> = ({name, index}) => {
  const {setActiveRegister} = useStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownHeight = useRef(new Animated.Value(0)).current;
  const handleActiveRegister = () => {
    setActiveRegister(index);
  };

  const toggleDropdown = () => {
    if (isDropdownOpen) {
      Animated.timing(dropdownHeight, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.exp),
        useNativeDriver: false,
      }).start(() => {
        setIsDropdownOpen(false);
      });
    } else {
      setIsDropdownOpen(true);
      Animated.timing(dropdownHeight, {
        toValue: 260, // Adjust based on the number of items
        duration: 300,
        easing: Easing.out(Easing.exp),
        useNativeDriver: false,
      }).start();
    }
  };
  return (
    <View style={styles.registerBox}>
      <TouchableOpacity style={styles.menu} onPress={toggleDropdown}>
        <Image
          source={require('../assets/icons/three-dot.png')}
          style={{
            width: 25,
            height: 25,
            tintColor: '#fff',
            objectFit: 'contain',
          }}
        />
      </TouchableOpacity>
      {index == 0 && (
        <Text
          style={{
            position: 'absolute',
            color: '#F97676',
            top: 15,
            left: -15,
            fontSize: 18,
          }}>
          *
        </Text>
      )}
      <TouchableOpacity
        style={styles.registerButton}
        onPress={handleActiveRegister}>
        <Text style={styles.emojiText}>📝</Text>
        <Text style={styles.menuText}>
          {name.length > 16 ? name.substring(0, 16) + '...' : name}
        </Text>
      </TouchableOpacity>
      {isDropdownOpen && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            right: 10,
            zIndex: 10000000,
            width: 150,
          }}>
          <Animated.View style={[styles.dropdown, {height: dropdownHeight}]}>
            <TouchableOpacity
              style={styles.dropdownClose}
              onPress={toggleDropdown}>
              <Text style={styles.textX}>x</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.firstBtn}>
              <Text style={styles.dropdownItemText}>rename</Text>
              <View style={styles.fixLine}></View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dropdownItem}>
              <Text style={styles.dropdownItemText}>copy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dropdownItem}>
              <Text style={styles.dropdownItemText}>paste</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dropdownItem}>
              <Text style={styles.dropdownItemText}>share</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dropdownItem}>
              <Text style={styles.dropdownItemText}>clear</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dropdownItem}>
              <Text style={styles.dropdownItemText}>delete</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      )}
    </View>
  );
};
const ActiveRegister: React.FC<RegisterProps> = ({name, index}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownHeight = useRef(new Animated.Value(0)).current;

  const toggleDropdown = () => {
    if (isDropdownOpen) {
      Animated.timing(dropdownHeight, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.exp),
        useNativeDriver: false,
      }).start(() => {
        setIsDropdownOpen(false);
      });
    } else {
      setIsDropdownOpen(true);
      Animated.timing(dropdownHeight, {
        toValue: 260, // Adjust based on the number of items
        duration: 300,
        easing: Easing.out(Easing.exp),
        useNativeDriver: false,
      }).start();
    }
  };
  return (
    <View style={styles.registerBox}>
      <TouchableOpacity style={styles.menu} onPress={toggleDropdown}>
        <Image
          source={require('../assets/icons/three-dot.png')}
          style={{
            width: 25,
            height: 25,
            tintColor: '#fff',
            objectFit: 'contain',
          }}
        />
      </TouchableOpacity>
      {index == 0 && (
        <Text
          style={{
            position: 'absolute',
            color: '#F97676',
            top: 15,
            left: -15,
            fontSize: 18,
          }}>
          *
        </Text>
      )}
      <TouchableOpacity style={styles.activeRegisterButton}>
        <Text style={styles.emojiText}>📝</Text>
        <Text style={styles.menuText}>
          {name.length > 16 ? name.substring(0, 16) + '...' : name}
        </Text>
      </TouchableOpacity>

      {isDropdownOpen && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            right: 10,
            zIndex: 10000000,
            width: 150,
          }}>
          <Animated.View style={[styles.dropdown, {height: dropdownHeight}]}>
            <TouchableOpacity
              style={styles.dropdownClose}
              onPress={toggleDropdown}>
              <Text style={styles.textX}>x</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.firstBtn}>
              <Text style={styles.dropdownItemText}>rename</Text>
              <View style={styles.fixLine}></View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dropdownItem}>
              <Text style={styles.dropdownItemText}>copy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dropdownItem}>
              <Text style={styles.dropdownItemText}>paste</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dropdownItem}>
              <Text style={styles.dropdownItemText}>share</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dropdownItem}>
              <Text style={styles.dropdownItemText}>clear</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dropdownItem}>
              <Text style={styles.dropdownItemText}>delete</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      )}
    </View>
  );
};

const Sidebar: React.FC<Props> = ({closeSideBar}) => {
  const {registers, activeRegister, addRegister, setActiveRegister} =
    useStore();
  const handleAddRegister = () => {
    if (Object.keys(registers).length >= 25) {
      Alert.alert(
        'Limit Reached',
        'You have reached the limit of 25 registers. Please delete some registers to add new ones.',
        [
          {
            text: 'OK',
          },
        ],
        {cancelable: false},
      );
      return;
    }

    Alert.alert(
      'Add New Register',
      'Are you sure you want to add a new register?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            const newRegisterId = Object.keys(registers).length;
            addRegister(newRegisterId, `Register ${newRegisterId + 1}`);
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <View style={styles.container}>
      {/* Sidebar */}
      <View style={styles.mainContent}>
        <Text style={styles.sidebarText}>Available Registers</Text>
      </View>
      {/* register component */}
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}>
        {Object.keys(registers).map((key: any, index: number) => {
          if (key == activeRegister) {
            return (
              <ActiveRegister
                name={registers[key].name}
                index={index}
                key={index}
              />
            );
          } else {
            return (
              <Register
                name={registers[key].name}
                index={parseInt(key)}
                key={index}
              />
            );
          }
        })}

        {/* <ActiveRegister name={'Active Register'} index={0} />
        <Register name={'Register 1dsgdashgdfgsd'} index={1} /> */}
      </ScrollView>
      <View style={styles.createButton}>
        <TouchableOpacity
          style={styles.createButtonStyles}
          onPress={handleAddRegister}>
          <Text style={styles.mainText}>Create New</Text>
          <Image
            source={require('../assets/icons/add-register.png')}
            style={{width: 30, height: 30}}
          />
          <Image
            source={require('../assets/icons/create-bg.png')}
            style={{
              width: 200,
              height: 60,
              objectFit: 'contain',
              position: 'absolute',
              zIndex: -1,
            }}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.menuButton} onPress={closeSideBar}>
        <Image
          source={require('../assets/icons/sidebar-close.png')}
          style={{width: 30, height: 30}}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  sidebarText: {
    color: '#fff',
    fontSize: 21,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },

  mainContent: {
    marginTop: 20,
    marginBottom: 35,
  },
  menuButton: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  registerBox: {
    position: 'relative',
  },
  menu: {
    position: 'absolute',
    top: 11,
    right: 11,
  },
  menuText: {
    marginLeft: 8,
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  emojiText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  mainText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'semibold',
  },
  registerButton: {
    minWidth: '80%',

    marginRight: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2B2B2B',
    padding: 10,
    paddingLeft: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#464646',
  },
  activeRegisterButton: {
    minWidth: '80%',

    marginRight: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#128700',
    padding: 10,
    borderRadius: 10,
    paddingLeft: 15,

    borderWidth: 2,
    borderColor: '#045600',
  },
  createButton: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30,
    marginBottom: 10,
  },
  createButtonStyles: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1e1e1e',
    gap: 10,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  dropdown: {
    width: '100%',
    backgroundColor: '#f0f0f0',
    overflow: 'hidden',
    borderRadius: 10,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  dropdownItemText: {
    fontSize: 16,
  },
  firstBtn: {
    padding: 10,
    marginRight: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  textX: {
    fontSize: 20,
    color: '#ff0000',
  },
  dropdownClose: {
    position: 'absolute',
    top: 0,
    right: 0,
    alignItems: 'center',
    width: 40,
    height: 40,
    borderBottomColor: '#ccc',
  },
  fixLine: {
    position: 'absolute',
    bottom: -1,
    right: -40,
    width: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default Sidebar;
