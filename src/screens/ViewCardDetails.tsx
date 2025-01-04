import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Touchable,
  TouchableOpacity,
  Dimensions,
  Platform,
  ToastAndroid,
} from 'react-native';
import useStore from '../store/store';
import {CardInterface} from '../types/cards';
import Calendar from '../components/Calendar';
import {convertToUTM, formatToHHMM} from '../utils/functions';
import Toast from 'react-native-toast-message';

const ViewCardDetails: React.FC = ({navigation, route}: any) => {
  const {card_register, card_id} = route.params;
  const {editCard, registers, removeMarking} = useStore();
  const [selectedDate, setSelectedDate] = useState(new Date());
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
      <Text style={{color: '#fff', fontSize: 24, marginBottom: 20}}>
        {card.title}
      </Text>

      <Calendar
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        markedArr={card.markedAt}
      />
      {card.markedAt.filter(
        date =>
          new Date(date.date).toLocaleDateString() ===
          new Date(selectedDate).toLocaleDateString(),
      ).length === 0 && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No Activity on this day</Text>
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
                <Text style={styles.removeMarker}>remove</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: 20,

    padding: 20,
  },
  markContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 15,
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
    width: 88,
    paddingHorizontal: 15,
    borderRadius: 50,
    marginBottom: 8,
  },
  removeMarker: {
    color: '#fff',
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#750000',
  },
});

export default ViewCardDetails;
