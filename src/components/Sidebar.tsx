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
  TextInput,
} from 'react-native';
import useStore from '../store/store';

type RegisterProps = {
  name: string;
  index: number;
  isActive: boolean;
};

const Register: React.FC<RegisterProps> = ({name, index, isActive}) => {
  const {
    setActiveRegister,
    removeRegister,
    renameRegister,
    clearCardsAttendance,
  } = useStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownHeight = useRef(new Animated.Value(0)).current;
  const handleActiveRegister = () => {
    if (isEditable) return;
    setActiveRegister(index);
  };
  const [displayName, setDisplayName] = useState(name);
  const [isEditable, setIsEditable] = useState(false);
  const toggleDropdown = () => {
    if (isDropdownOpen) {
      Animated.timing(dropdownHeight, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        setIsDropdownOpen(false);
      });
    } else {
      setIsDropdownOpen(true);
      Animated.timing(dropdownHeight, {
        toValue: 125, // Adjust based on the number of items
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };
  const handleRegisterDelete = () => {
    Alert.alert(
      'Delete Register',
      'Are you sure you want to delete this register?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            removeRegister(index);
            toggleDropdown();
          },
        },
      ],
      {cancelable: false},
    );
  };

  const handleInputChange = (text: string) => {
    setDisplayName(text);
  };
  const handleRename = () => {
    setIsEditable(true);
    toggleDropdown();
  };
  const handleMenuOrRename = () => {
    if (isEditable) {
      if (displayName.length == 0) {
        Alert.alert('Invalid Name', 'Name cannot be empty', [
          {
            text: 'OK',
          },
        ]);
        return;
      }
      renameRegister(index, displayName);
      setIsEditable(false);
    } else {
      toggleDropdown();
    }
  };
  const handleClearCards = () => {
    Alert.alert(
      'Clear Register',
      'Are you sure you want to clear this register?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            clearCardsAttendance(index);
            toggleDropdown();
          },
        },
      ],
      {cancelable: false},
    );
  };
  return (
    <View style={styles.registerBox}>
      <Text style={styles.regId}>{index + 1}</Text>
      <TouchableOpacity style={styles.menu} onPress={handleMenuOrRename}>
        {isEditable ? (
          <Image
            source={require('../assets/icons/mark-present.png')}
            style={{
              width: 20,
              height: 20,
              objectFit: 'contain',
            }}
          />
        ) : (
          <Image
            source={require('../assets/icons/three-dot.png')}
            style={{
              width: 20,
              height: 20,
              tintColor: '#fff',
              objectFit: 'contain',
            }}
          />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={isActive ? styles.activeRegisterButton : styles.registerButton}
        onPress={handleActiveRegister}>
        <Text style={styles.emojiText}>📝</Text>
        <TextInput
          value={displayName}
          editable={isEditable}
          onChangeText={text => handleInputChange(text)}
          style={styles.menuText}
        />
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
            <TouchableOpacity style={styles.firstBtn} onPress={handleRename}>
              <Text style={styles.dropdownItemText}>rename</Text>
              <View style={styles.fixLine}></View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={handleClearCards}>
              <Text style={styles.dropdownItemText}>clear</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={handleRegisterDelete}>
              <Text style={styles.dropdownItemText}>delete</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      )}
    </View>
  );
};
const Sidebar: React.FC = () => {
  const {registers, activeRegister, addRegister} = useStore();
  const handleAddRegister = () => {
    if (Object.keys(registers).length >= 10) {
      Alert.alert(
        'Limit Reached',
        'You have reached the limit of 10 registers. Please delete some registers to add new ones.',
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
          return (
            <Register
              name={registers[key].name}
              isActive={key == activeRegister ? true : false}
              index={parseInt(key)}
              key={index}
            />
          );
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
            style={{width: 20, height: 20}}
          />
        </TouchableOpacity>
      </View>
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
    paddingBottom: 100,
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
    right: 5,
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
    marginRight: 40,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2B2B2B',
    paddingLeft: 25,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#464646',
  },
  activeRegisterButton: {
    minWidth: '80%',
    marginRight: 40,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#128700',
    borderRadius: 10,
    paddingLeft: 25,
    borderWidth: 1,
    borderColor: '#045600',
  },
  regId: {
    position: 'absolute',
    left: 7,
    top: 15,
    fontSize: 12,
    color: '#fff',
    zIndex: 100000000,
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
    borderWidth: 1,
    borderColor: '#828282',
    borderRadius: 8,
    gap: 10,
    padding: 7,
    paddingLeft: 14,
    paddingRight: 14,
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
