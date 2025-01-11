import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
  ToastAndroid,
  Image,
} from 'react-native';
import useStore from '../store/store';
import {CardInterface} from '../types/cards';
import Calendar from '../components/Calendar';
import {convertToUTM, formatToHHMM} from '../utils/functions';
import Calendar2 from '../components/Calendar2';

const ViewCardDetails: React.FC = ({navigation, route}: any) => {
  const {card_register, card_id} = route.params;
  const {editCard, registers, removeMarking} = useStore();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [currentMonth, setCurrentMonth] = useState(selectedDate);
  const handleRemoveMark = (
    markId: number,
    cardId: number,
    registerId: number,
  ) => {
    removeMarking(registerId, cardId, markId);
    if (Platform.OS === 'android') {
      ToastAndroid.show('Mark Removed', ToastAndroid.SHORT);
    }
  };
  const handleTodayClick = () => {
    setCurrentMonth(new Date());
  };
  const handleNavigateBack = () => {
    navigation.goBack();
  };

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
  }, [registers, card_register, card_id]);

  return (
    <View style={styles.container}>
      {/* // header  */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Image
            source={require('../assets/images/back-btn.png')}
            style={{width: 40, height: 40}}
          />
        </TouchableOpacity>
        <Text style={{color: '#fff', fontSize: 24}}>
          {card.title.length > 15
            ? card.title.substring(0, 15) + '..'
            : card.title}
        </Text>
        <TouchableOpacity
          onPress={handleTodayClick}
          style={styles.todayContainer}>
          <Image
            source={require('../assets/images/today.png')}
            style={styles.todayIcon}
          />
        </TouchableOpacity>
      </View>

      <Calendar
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        markedArr={card.markedAt}
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
      />
      {card.markedAt.filter(
        date =>
          new Date(date.date).toLocaleDateString() ===
          new Date(selectedDate).toLocaleDateString(),
      ).length === 0 && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            {new Date(selectedDate).toLocaleDateString() ===
            new Date().toLocaleDateString()
              ? 'No Activity Today'
              : 'No Activity on selected day'}
          </Text>
        </View>
      )}
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}>
        {card.markedAt
          .filter(
            date =>
              new Date(date.date).toLocaleDateString() ===
              new Date(selectedDate).toLocaleDateString(),
          )
          .map((date, index) => (
            <View key={index} style={styles.markContainer}>
              {date.isPresent ? (
                <Text
                  key={index}
                  style={[styles.markings, {backgroundColor: '#00670E'}]}>
                  Present
                </Text>
              ) : (
                <Text
                  key={index}
                  style={[styles.markings, {backgroundColor: '#750000'}]}>
                  Absent
                </Text>
              )}

              <Text style={{color: '#fff'}}>
                {new Date(date.date).toDateString()}{' '}
                {convertToUTM(formatToHHMM(date.date))}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  handleRemoveMark(date.id, card_id, card_register)
                }>
                <Text style={styles.removeMarker}>
                  {Dimensions.get('window').width < 340 ? 'x' : 'remove'}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#18181B',
  },
  header: {
    borderRadius: 15,
    width: '90%',
    margin: 'auto',
    paddingTop: 20,
    paddingBottom: 35,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  todayContainer: {
    marginLeft: 'auto',
  },
  todayIcon: {
    width: 35,
    height: 35,
  },

  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 20,
    padding: 20,
  },
  markContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  emptyContainer: {
    color: '#fff',
    marginTop: 100,
    gap: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#5A5A5A',
    fontSize: 18,
  },
  markings: {
    color: '#fff',
    padding: 5,
    textAlign: 'center',
    width: 70,
    borderRadius: 8,
    marginBottom: 8,
  },
  removeMarker: {
    color: '#fff',
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 50,
    marginBottom: 8,
    backgroundColor: '#750000',
  },
});

export default ViewCardDetails;
