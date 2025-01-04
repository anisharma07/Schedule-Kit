import {useEffect, useRef, useState} from 'react';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import useStore from '../store/store';
import {CardInterface, SelectedDayCard, Days} from '../types/cards';
import Card from '../components/Cards/Card';
import Spacer from '../components/Spacer';
interface TimeProps {
  handleMenuOpen: (r: number, c: number) => void;
  isChange: boolean;
}
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
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    const activeDayIndex = daysOfWeek.indexOf(activeDay);
    if (scrollViewRef.current && activeDayIndex !== -1) {
      const scrollToX = activeDayIndex * 100; // Assuming each button has a width of 100
      scrollViewRef.current.scrollTo({x: scrollToX, animated: true});
    }
  }, [activeDay]);
  return (
    <ScrollView
      ref={scrollViewRef}
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

const TimeTableScreen: React.FC<TimeProps> = ({
  navigation,
  route,
  isChange,
  handleMenuOpen,
}: any) => {
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
      {displayCards.length == 0 && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No Events to Display</Text>
        </View>
      )}
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
                  cardRegister={activeRegister}
                  isChange={isChange}
                  handleMenuOpen={handleMenuOpen}
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
  emptyContainer: {
    color: '#fff',
    height: Dimensions.get('window').height - 400,
    gap: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#5A5A5A',
    fontSize: 20,
  },

  tabContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
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
    backgroundColor: '#ffffff',
    borderWidth: 0,
  },
  activeTabButton: {
    borderColor: '#018CC8',
    borderWidth: 2,
  },

  tabButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  selectedTabButtonText: {
    color: '#18181B',
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
