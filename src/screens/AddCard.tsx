import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import useStore from '../store/store';
import {Days, CardInterface, Slots} from '../types/cards';
import {Picker} from '@react-native-picker/picker';
import {convertTo24Hrs, convertToUTM} from '../utils/functions';
import Calendar from '../components/Calendar';

const daysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
type DayOfWeek = (typeof daysOfWeek)[number];

const daysOfWeekMap: Record<DayOfWeek, string> = {
  sun: 'Sunday',
  mon: 'Monday',
  tue: 'Tuesday',
  wed: 'Wednesday',
  thu: 'Thursday',
  fri: 'Friday',
  sat: 'Saturday',
};

interface currDayTimeProps {
  day: keyof Days;
  startTime: string;
  isAM_start: boolean;
  endTime: string;
  isAM_end: boolean;
}

const AddCard: React.FC = ({navigation, route}: any) => {
  const {addCard, activeRegister, registers, defaultTargetPercentage} =
    useStore();
  const [currDayTime, setCurrDayTime] = useState<currDayTimeProps>({
    day: 'mon',
    startTime: '00:00',
    isAM_start: true,
    endTime: '00:00',
    isAM_end: true,
  });
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [card, setCard] = useState<CardInterface>({
    id: 1,
    title: '',
    present: 0,
    total: 0,
    target_percentage: defaultTargetPercentage,
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

  const handleInputChange = (
    field: keyof CardInterface,
    value: string | number,
  ) => {
    setCard(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleTimeChange = (field: string, value: string | number) => {
    setCurrDayTime(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDayChange = (day: keyof Days) => {
    setCurrDayTime(prev => ({
      ...prev,
      day,
    }));
  };
  const handleIdChange = (value: number) => {
    setCard(prev => ({
      ...prev,
      id: value,
    }));
  };

  useEffect(() => {
    handleIdChange(registers[activeRegister]?.cards?.length);
  }, [registers, activeRegister]);

  const toggleStartAM = () => {
    setCurrDayTime(prev => ({
      ...prev,
      isAM_start: !prev.isAM_start,
    }));
  };
  const toggleEndAM = () => {
    setCurrDayTime(prev => ({
      ...prev,
      isAM_end: !prev.isAM_end,
    }));
  };

  const isValidTime = (time: string) => {
    // check format HH:MM and not alphabets
    if (!/^\d{2}:\d{2}$/.test(time)) return false;

    // check if hours and minutes are in valid range
    const [hours, minutes] = time.split(':').map(Number);
    if (hours < 1 || hours > 12) return false;
    if (minutes < 0 || minutes > 59) return false;
    return true;
  };

  const handleAddTime = () => {
    if (currDayTime.startTime === '00:00' && currDayTime.endTime === '00:00') {
      Alert.alert('Error', 'Please fill all required fields!');
      return;
    }
    if (card.days[currDayTime.day].length >= 3) {
      Alert.alert('Error', 'Maximum 3 Slots Allowed on a single Day!');
      return;
    }
    const isNew = card.days[currDayTime.day].findIndex(
      dayTime =>
        dayTime.start ===
          convertTo24Hrs(currDayTime.startTime, currDayTime.isAM_start) &&
        dayTime.end ===
          convertTo24Hrs(currDayTime.endTime, currDayTime.isAM_end),
    );
    if (isNew !== -1) {
      Alert.alert('Error', 'Slot already exists!');
      return;
    }
    if (
      !isValidTime(currDayTime.startTime) ||
      !isValidTime(currDayTime.endTime)
    ) {
      Alert.alert('Error', 'Time Should be in HH:MM Format!');
      return;
    }

    setCard(prev => ({
      ...prev,
      days: {
        ...prev.days,
        [currDayTime.day]: [
          ...prev.days[currDayTime.day],
          {
            start: convertTo24Hrs(
              currDayTime.startTime,
              currDayTime.isAM_start,
            ),
            end: convertTo24Hrs(currDayTime.endTime, currDayTime.isAM_end),
          },
        ],
      },
    }));
  };

  const handleRemoveTime = (day: string, dayTime: Slots) => {
    setCard(prev => ({
      ...prev,
      days: {
        ...prev.days,
        [day]: prev.days[day as keyof Days].filter(
          time => time.start !== dayTime.start && time.end !== dayTime.end,
        ),
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
    addCard(activeRegister, card);
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
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}>
          <View style={{width: '48%', minWidth: 75}}>
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
          </View>

          <View style={{width: '48%', minWidth: 75}}>
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
          </View>
        </View>

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

        <Text style={styles.label}>Add Time</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}>
          <Text style={styles.label}>Select Day: </Text>
          <View style={styles.pickerView}>
            <Picker
              selectedValue={currDayTime.day}
              onValueChange={(day: keyof Days) => handleDayChange(day)}
              style={styles.picker}>
              {daysOfWeek.map(day => (
                <Picker.Item key={day} label={daysOfWeekMap[day]} value={day} />
              ))}
            </Picker>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}>
          <Text style={styles.label}>Select Time: </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              gap: 8,
              flexWrap: 'wrap',
            }}>
            <TextInput
              style={styles.input}
              value={currDayTime.startTime}
              onChangeText={value => handleTimeChange('startTime', value)}
            />
            <TouchableOpacity onPress={toggleStartAM}>
              <Text style={styles.input}>
                {currDayTime.isAM_start ? 'AM' : 'PM'}
              </Text>
            </TouchableOpacity>
            <Text style={styles.label}>to</Text>
            <TextInput
              style={styles.input}
              value={currDayTime.endTime}
              onChangeText={value => handleTimeChange('endTime', value)}
            />
            <TouchableOpacity onPress={toggleEndAM}>
              <Text style={styles.input}>
                {currDayTime.isAM_end ? 'AM' : 'PM'}
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            contentContainerStyle={styles.tabContainer}
            showsHorizontalScrollIndicator={false}
            style={styles.scrollView}>
            {Object.keys(card.days).map(day =>
              card.days[day as keyof Days].map((dayTime: Slots) => (
                <View style={styles.tabViewStyle}>
                  {' '}
                  <TouchableOpacity
                    key={dayTime.start}
                    style={styles.tabButton}>
                    <Text style={styles.tabLabel}>
                      {daysOfWeekMap[day].substring(0, 3)},{' '}
                      {convertToUTM(dayTime.start)}
                      {' - '}
                      {convertToUTM(dayTime.end)}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.removeTimeBtn}
                    onPress={() => handleRemoveTime(day, dayTime)}>
                    <Image
                      source={require('../assets/icons/remove-time-btn.png')}
                      style={styles.remove_time_btn}
                    />
                  </TouchableOpacity>
                </View>
              )),
            )}
          </ScrollView>
        </View>
        {/* <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Calendar
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </View> */}
        <Button title="add time" onPress={() => handleAddTime()} />

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
  scrollView: {
    flex: 0,
    flexGrow: 0,
  },
  scrollView2: {
    flex: 1,
  },
  tabContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  tabViewStyle: {
    position: 'relative',
  },
  removeTimeBtn: {
    position: 'absolute',
    right: 3,
    top: -7,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 10,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#008817',
  },
  remove_time_btn: {
    width: 18,
    height: 18,
  },
  container: {
    flex: 1,
    backgroundColor: '#18181B',
    padding: 0,
  },
  // sideLabel: {
  //   fontSize: 16,
  //   color: '#fff',
  //   marginBottom: 8,
  //   marginTop: 16,
  // },
  tabLabel: {
    fontSize: 11,
    color: '#fff',
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
    backgroundColor: '#1F1F22',
    color: '#fff',
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#464646',
  },
  pickerView: {
    borderWidth: 1,
    borderColor: '#464646',
    width: '65%',
    minWidth: 160,
    marginBottom: 8,
    borderRadius: 8,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: '#1F1F22',
  },
  picker: {
    color: '#fff',
  },
});

export default AddCard;
