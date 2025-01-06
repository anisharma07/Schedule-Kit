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
import {convertToUTM} from '../utils/functions';
interface TimeProps {
  handleMenuOpen: (r: number, c: number) => void;
}
let ind = 0;
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
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const [newDays, setNewDays] = useState(daysOfWeek);

  useEffect(() => {
    setActiveDayIndex(daysOfWeek.indexOf(activeDay));
  }, [activeDay]);
  useEffect(() => {
    const newDays = [];
    for (let i = activeDayIndex; i < daysOfWeek.length; i++) {
      newDays.push(daysOfWeek[i]);
    }
    for (let i = 0; i < activeDayIndex; i++) {
      newDays.push(daysOfWeek[i]);
    }
    setNewDays(newDays);
  }, [activeDayIndex]);

  return (
    <ScrollView
      horizontal
      contentContainerStyle={styles.tabContainer}
      showsHorizontalScrollIndicator={false}
      style={styles.scrollView}>
      {newDays.map((day, index) => (
        <TouchableOpacity
          key={day}
          style={[
            styles.tabButton,
            selectedDay === day && styles.selectedTabButton,
            activeDay === day && selectedDay !== day && styles.activeTabButton,
            day == 'Sunday' && {borderColor: '#FF0000', borderWidth: 1},
          ]}
          onPress={() => setSelectedDay(day)}>
          <Text
            style={[
              styles.tabButtonText,
              selectedDay === day && styles.selectedTabButtonText,
            ]}>
            {index === 0 ? 'Today' : day}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const TimeTableScreen: React.FC<TimeProps> = ({
  navigation,
  route,
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
  const formatTime = (date: string) => {
    // HH:MM-HH:MM ... break by '-'
    const [start, end] = date.split('-');
    const startUTM = convertToUTM(start);
    const endUTM = convertToUTM(end);
    return `${startUTM} - ${endUTM}`;
  };

  const [selectedDay, setSelectedDay] = useState(formatDate(new Date()));
  const [activeDay, setActiveDay] = useState(formatDate(new Date()));

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
  const handleViewDetails = (r: number, c: number) => {
    navigation.navigate('CardDetails', {
      card_register: r,
      card_id: c,
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer2}>
        <Text style={styles.selectedDayText}>
          {selectedDay}
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
        <Text style={styles.eventTypeTxt}>Ongoing Events</Text>
        {displayCards.map((cardSlot, index) => {
          return (
            <View key={index} style={{width: '100%'}}>
              <Text style={styles.cardSlotTime}>
                {formatTime(cardSlot.time)}
              </Text>
              {cardSlot.card.map(card => (
                <View key={++ind} style={styles.cardMarginCover}>
                  <Card
                    id={card.id}
                    title={card.title}
                    present={card.present}
                    total={card.total}
                    target_percentage={card.target_percentage}
                    tagColor={card.tagColor}
                    cardRegister={activeRegister}
                    handleMenuOpen={handleMenuOpen}
                    hasLimit={card.hasLimit}
                    limitFreq={card.limit}
                    limitType={card.limitType}
                    handleViewDetails={handleViewDetails}
                  />
                </View>
              ))}
            </View>
          );
        })}
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
    borderWidth: 1,
    borderColor: '#3D3D3D',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexWrap: 'wrap',
    paddingTop: 20,
  },
  eventTypeTxt: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cardMarginCover: {
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  selectedTabButton: {
    backgroundColor: '#ffffff',
    borderWidth: 0,
  },
  activeTabButton: {
    borderColor: '#018CC8',
    borderWidth: 1,
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
    width: '90%',
    margin: 'auto',
    marginBottom: 10,
    fontSize: 16,
    textAlign: 'left',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

export default TimeTableScreen;
