import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
} from 'react-native';
import {Markings} from '../types/cards';

interface CalendarProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  markedArr: Markings[];
}

const Calendar: React.FC<CalendarProps> = ({
  selectedDate,
  setSelectedDate,
  markedArr,
}) => {
  const [currentMonth, setCurrentMonth] = useState(selectedDate);

  const daysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const days = [];
    for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
      days.push(null); // Empty slots for days of the previous month
    }
    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
      days.push(new Date(year, month, day));
    }
    return days;
  };

  const handleMonthChange = (direction: 'prev' | 'next') => {
    const newMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + (direction === 'next' ? 1 : -1),
      1,
    );
    setCurrentMonth(newMonth);
  };

  const isToday = (date: Date | null) => {
    if (!date) return false;
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (date: Date | null) => {
    if (!date) return false;
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };
  const findColor = (item: Date | null) => {
    if (item == null) return '#121212';
    const day = item.getDate();
    const month = item.getMonth();
    const year = item.getFullYear();
    const marks = markedArr.filter(
      date =>
        new Date(date.date).toLocaleDateString() ===
        new Date(year, month, day).toLocaleDateString(),
    );
    if (marks.length === 0) return '#121212';
    const presents = marks.filter(date => date.isPresent).length;
    const absents = marks.length - presents;
    if (presents > absents) return 'green';
    if (absents > presents) return 'red';
    if (presents === absents) return '#BE5200';
  };

  const days = getDaysInMonth(currentMonth);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => handleMonthChange('prev')}>
          <Text style={styles.navButton}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>
          {currentMonth.toLocaleString('default', {month: 'long'})}{' '}
          {currentMonth.getFullYear()}
        </Text>
        <TouchableOpacity onPress={() => handleMonthChange('next')}>
          <Text style={styles.navButton}>{'>'}</Text>
        </TouchableOpacity>
      </View>

      {/* Week Days */}
      <View style={styles.weekRow}>
        {daysOfWeek.map(day =>
          day === 'sun' ? (
            <Text key={day} style={styles.sunDay}>
              {day}
            </Text>
          ) : (
            <Text key={day} style={styles.weekDay}>
              {day}
            </Text>
          ),
        )}
      </View>

      {/* Days Grid */}
      <FlatList
        data={days}
        numColumns={7}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View style={styles.dayCell}>
            <TouchableOpacity
              style={[
                styles.cellButton,
                isSelected(item) && styles.selectedCell,
                {backgroundColor: isToday(item) ? '#007BFF' : findColor(item)},
              ]}
              onPress={() => item && setSelectedDate(item)}>
              <Text style={styles.dayText}>{item ? item.getDate() : ''}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#121212',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#3A3A3A',
    width: Dimensions.get('window').width - 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 15,
    borderBottomColor: '#3A3A3A',
    borderWidth: 1,
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  navButton: {
    color: 'white',
    fontSize: 18,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
    marginBottom: 5,
  },
  sunDay: {
    color: 'red',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    width: Dimensions.get('window').width / 8,
    textAlign: 'center',
  },
  weekDay: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    width: Dimensions.get('window').width / 8,
    textAlign: 'center',
  },
  dayCell: {
    width: Dimensions.get('window').width / 8,
    height: Dimensions.get('window').width / 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellButton: {
    width: '75%',
    height: '75%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  dayText: {
    color: 'white',
    fontSize: 16,
  },
  selectedCell: {
    borderWidth: 2,
    borderColor: '#fff',
  },
});

export default Calendar;
