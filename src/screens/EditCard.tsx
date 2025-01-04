import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
  Alert,
} from 'react-native';
import useStore from '../store/store';
import {CardInterface, Days} from '../types/cards';

const EditCard: React.FC = ({navigation, route}: any) => {
  const {card_register, card_id} = route.params;
  const {editCard, registers} = useStore();

  const [card, setCard] = useState<CardInterface>({
    id: 1,
    title: '',
    present: 0,
    total: 0,
    target_percentage: 0,
    tagColor: '',
    days: {
      mon: [],
      tue: [],
      wed: [],
      thu: [],
      fri: [],
      sat: [],
      sun: [],
    },
    markedAt: [],
    hasLimit: false,
    limit: 0,
    limitType: 'with-absent',
  });
  useEffect(() => {
    const currCard = registers[card_register]?.cards?.find(
      curr => curr.id === card_id,
    );
    if (currCard) setCard(currCard);
  }, [card_register, card_id]);
  const handleInputChange = (
    field: keyof CardInterface,
    value: string | number,
  ) => {
    setCard(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDaysChange = (day: keyof Days, value: string) => {
    setCard(prev => ({
      ...prev,
      days: {
        ...prev.days,
        [day]: value.split(',').map(item => item.trim()),
      },
    }));
  };

  const handleSubmit = () => {
    if (!card.title) {
      Alert.alert('Error', 'Please fill all required fields!');
      return;
    }
    if (card.total < card.present) {
      Alert.alert('Error', 'total<presents');
      return;
    }
    editCard(card_register, card, card_id);
    navigation.navigate('Tab');
    // Add logic to save or navigate
  };

  return (
    <View style={styles.topContainer}>
      <ScrollView style={styles.container}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter title"
          placeholderTextColor="#999"
          value={card.title}
          onChangeText={value => handleInputChange('title', value)}
        />

        <Text style={styles.label}>Present</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter present count"
          placeholderTextColor="#999"
          keyboardType="numeric"
          value={card.present.toString()}
          onChangeText={value =>
            handleInputChange('present', parseInt(value) || 0)
          }
        />

        <Text style={styles.label}>Total</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter total count"
          placeholderTextColor="#999"
          keyboardType="numeric"
          value={card.total.toString()}
          onChangeText={value =>
            handleInputChange('total', parseInt(value) || 0)
          }
        />

        <Text style={styles.label}>Target Percentage</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter target percentage"
          placeholderTextColor="#999"
          keyboardType="numeric"
          value={card.target_percentage.toString()}
          onChangeText={value =>
            handleInputChange('target_percentage', parseInt(value) || 0)
          }
        />

        <Text style={styles.label}>Tag Color</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter tag color (e.g., #FF5733)"
          placeholderTextColor="#999"
          value={card.tagColor}
          onChangeText={value => handleInputChange('tagColor', value)}
        />

        <Text style={styles.label}>Days</Text>
        {Object.keys(card.days).map(day => (
          <View key={day}>
            <Text style={styles.subLabel}>{day.toUpperCase()}</Text>
            <TextInput
              style={styles.input}
              placeholder={`Enter tasks for ${day} (comma-separated)`}
              placeholderTextColor="#999"
              value={card.days[day as keyof Days].join(', ')}
              onChangeText={value => handleDaysChange(day as keyof Days, value)}
            />
          </View>
        ))}

        <Button title="Submit" onPress={handleSubmit} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    backgroundColor: '#18181B',
    padding: 16,
  },
  container: {
    flex: 1,
    backgroundColor: '#18181B',
    padding: 0,
  },
  label: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
    marginTop: 16,
  },
  subLabel: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 4,
    marginTop: 8,
  },
  input: {
    backgroundColor: '#282828',
    color: '#fff',
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 8,
  },
});

export default EditCard;
