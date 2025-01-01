import {useEffect, useState} from 'react';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Header from '../components/Header';
import useStore from '../store/store';
import {CardInterface, SelectedDayCard, Days} from '../types/cards';
import Card from '../components/Cards/Card';
import Spacer from '../components/Spacer';

const daysOfWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const daysKeyMap: Record<DayOfWeek, keyof Days> = {
  Sunday: 'sun',
  Monday: 'mon',
  Tuesday: 'tue',
  Wednesday: 'wed',
  Thursday: 'thu',
  Friday: 'fri',
  Saturday: 'sat',
};

type DayOfWeek = (typeof daysOfWeek)[number];

const monthsOfYear = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
interface TabButtonProps {
  selectedDay: string;
  setSelectedDay: (day: string) => void;
  activeDay: string;
}

const TabButtons: React.FC<TabButtonProps> = ({
  selectedDay,
  setSelectedDay,
  activeDay,
}) => {
  return (
    <ScrollView
      horizontal
      contentContainerStyle={styles.tabContainer}
      showsHorizontalScrollIndicator={false}
      style={styles.scrollView}>
      {daysOfWeek.map(day => (
        <TouchableOpacity
          key={day}
          style={[
            styles.tabButton,
            selectedDay === day && styles.selectedTabButton,
            activeDay === day && styles.activeTabButton,
          ]}
          onPress={() => setSelectedDay(day)}>
          <Text
            style={[
              styles.tabButtonText,
              selectedDay === day && styles.selectedTabButtonText,
            ]}>
            {day}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const TimeTableScreen: React.FC = ({navigation, route, toggleSidebar}: any) => {
  const {registers, activeRegister} = useStore();
  const [displayCards, setDisplayCards] = useState<SelectedDayCard[]>([]);
  const formatDate = (date: Date) => {
    return daysOfWeek[date.getDay()];
  };
  const getNextDate = (day: string) => {
    const today = new Date();
    const dayIndex = daysOfWeek.indexOf(day);
    const diff = dayIndex - today.getDay();
    return new Date(today.setDate(today.getDate() + diff));
  };

  const [selectedDay, setSelectedDay] = useState(formatDate(new Date()));
  const [activeDay, setActiveDay] = useState(formatDate(new Date()));
  const handleEdit = (id: number) => {
    navigation.navigate('Edit', {card_register: activeRegister, card_id: id});
  };
  useEffect(() => {
    const selectedDayCards: SelectedDayCard[] = [];
    const key = daysKeyMap[selectedDay as DayOfWeek];
    const timeSlots: Record<string, CardInterface[]> = {};

    registers[activeRegister]?.cards?.forEach(card => {
      card?.days[key]?.forEach(dayTime => {
        const timeSlot = `${dayTime.start}-${dayTime.end}`;
        if (!timeSlots[timeSlot]) {
          timeSlots[timeSlot] = [];
        }
        timeSlots[timeSlot].push(card);
      });
    });

    Object.keys(timeSlots)
      .sort((a, b) => {
        const [aStart] = a.split('-');
        const [bStart] = b.split('-');
        return aStart.localeCompare(bStart);
      })
      .forEach(timeSlot => {
        selectedDayCards.push({
          time: timeSlot,
          card: timeSlots[timeSlot],
        });
      });
    setDisplayCards(selectedDayCards);
  }, [activeRegister, selectedDay]);

  return (
    <View style={styles.container}>
      {/* <Header
        toggler={toggleSidebar}
        changeStack={navigation.navigate}
        registerName={registers[activeRegister]?.name}
      /> */}
      <View style={styles.contentContainer2}>
        <Text style={styles.selectedDayText}>
          {selectedDay === activeDay ? 'Today' : selectedDay}
          {', ' +
            getNextDate(selectedDay).getDate() +
            ' ' +
            monthsOfYear[getNextDate(selectedDay).getMonth()].substring(0, 3)}
        </Text>
      </View>
      <TabButtons
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        activeDay={activeDay}
      />

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView2}
        contentContainerStyle={styles.contentContainer}>
        {displayCards.map((cardSlot, index) => {
          return (
            <>
              <Text key={index} style={styles.cardSlotTime}>
                {cardSlot.time}
              </Text>
              {cardSlot.card.map(card => (
                <Card
                  key={card.id}
                  id={card.id}
                  title={card.title}
                  present={card.present}
                  total={card.total}
                  target_percentage={card.target_percentage}
                  tagColor={card.tagColor}
                  activeRegister={activeRegister}
                  handleEdit={handleEdit}
                />
              ))}
            </>
          );
        })}
        {/* {registers[activeRegister]?.cards?.map((card, index) => (
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
        ))} */}
      </ScrollView>
      <Spacer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#18181B',
    height: '100%',
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
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 3,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#3D3D3D',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 20,
    paddingTop: 20,
  },
  selectedTabButton: {
    backgroundColor: '#3D3D3D',
  },
  activeTabButton: {
    borderColor: '#018CC8',
  },

  tabButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  selectedTabButtonText: {
    color: '#fff',
  },
  contentContainer2: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  selectedDayText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  cardSlotTime: {
    color: '#fff',
    textAlign: 'left',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

export default TimeTableScreen;
