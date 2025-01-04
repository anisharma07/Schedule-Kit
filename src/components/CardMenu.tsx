import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  Alert,
} from 'react-native';
import useStore from '../store/store';

interface CardMenuProps {
  isVisible: boolean;
  onClose: () => void;
  RegisterId: number;
  CardId: number;
  navigation: any;
  makeChange: () => void;
}

const CardMenu: React.FC<CardMenuProps> = ({
  isVisible,
  onClose,
  RegisterId,
  CardId,
  navigation,
  makeChange,
}) => {
  const {removeCard, registers, undoChanges, renameRegister} = useStore();
  const [cardName, setCardName] = useState('');
  const slideAnim = useRef(new Animated.Value(342)).current; // Initial position off-screen
  useEffect(() => {
    if (
      RegisterId != -1 &&
      CardId != -1 &&
      registers[RegisterId]?.cards[CardId]?.title
    )
      setCardName(registers[RegisterId].cards[CardId].title);
  }, [RegisterId, CardId]);

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isVisible ? 0 : 342, // Slide up to 0 if visible, down to 300 if not
      duration: 342,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, [isVisible]);

  const handleEdit = () => {
    navigation.navigate('Edit', {
      card_register: RegisterId,
      card_id: CardId,
    });
    onClose();
  };

  const handleUndoChanges = () => {
    undoChanges(RegisterId, CardId);
    makeChange();
  };
  const handleViewDetails = () => {
    navigation.navigate('CardDetails', {
      card_register: RegisterId,
      card_id: CardId,
    });
    onClose();
  };

  const handleRemoveCard = () => {
    Alert.alert('Delete Card', 'Are you sure you want to delete ' + cardName, [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: () => {
          removeCard(RegisterId, CardId);
          onClose();
        },
      },
    ]);
  };

  if (RegisterId == -1 || CardId == -1) return null;
  return (
    <Animated.View
      style={[styles.container, {transform: [{translateY: slideAnim}]}]}>
      <TouchableOpacity style={styles.button} onPress={handleEdit}>
        <Text style={styles.buttonText}>Edit Subject</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleViewDetails}>
        <Text style={styles.buttonText}>View Details</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleUndoChanges}>
        <Text style={styles.buttonText}>Undo Last Change</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleRemoveCard}>
        <Text style={styles.buttonText}>Delete Subject</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#18181B',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    zIndex: 1000000,
  },
  button: {
    padding: 15,
    maxWidth: 600,
    backgroundColor: '#333',
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 'auto',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  closeButton: {
    padding: 15,
    backgroundColor: '#555',
    borderRadius: 10,
    marginVertical: 5,
  },
  closeButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default CardMenu;
