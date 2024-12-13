import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import styles from '../styles/CardStyles';
import ConicGradient from './ConicGradient';

const Card = () => {
  const target = 75;
  const [presents, setPresent] = useState(1);
  const [total, setTotal] = useState(2);
  const [percentage, setPercentage] = useState(0);
  const [cardColor, setCardColor] = useState('#892B2B');
  const MarkPresent = () => {
    setPresent(prev => prev + 1);
    setTotal(prev => prev + 1);
  };
  const MarkAbsent = () => {
    setTotal(prev => prev + 1);
  };
  useEffect(() => {
    const updatePercentage = () => {
      const percentage = ((presents / total) * 100).toFixed(1);
      setPercentage(parseFloat(percentage));
    };
    updatePercentage();
  }, [presents, total]);

  useEffect(() => {
    const setColor = () => {
      if (percentage > target) {
        setCardColor('#1A5F18');
      } else if (percentage < target) {
        setCardColor('#892B2B');
      } else {
        setCardColor('#006D90');
      }
    };
    setColor();
  }, [percentage]);

  return (
    <View style={[styles.cardContainer, {backgroundColor: cardColor}]}>
      <TouchableOpacity style={styles.closeButton}>
        <Text style={styles.closeButtonText}>x</Text>
      </TouchableOpacity>
      <View>
        <View style={styles.header}>
          <View style={[styles.indicator, {backgroundColor: '#A7D477'}]}></View>
          <Text style={styles.headerTitle}>DSA</Text>
        </View>
        <View style={styles.attendanceInfo}>
          <Text style={styles.attendanceText}>
            Attendance{' '}
            <Text style={styles.attendanceCount}>
              {presents}/{total}
            </Text>
          </Text>
          <Text style={styles.statusText}>Status: good</Text>
        </View>
      </View>
      <View style={styles.rightBox}>
        <View style={styles.circularContainer}>
          <View style={[styles.circularProgress, {backgroundColor: cardColor}]}>
            <Text style={styles.percentageText}>{percentage}%</Text>
          </View>
          <ConicGradient percentage={percentage} />
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity onPress={MarkPresent}>
            <Text style={styles.actionButtonText}>
              <Image
                source={require('../assets/icons/mark-present.png')}
                style={styles.logo}
              />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={MarkAbsent}>
            <Text style={styles.actionButtonText}>
              <Image
                source={require('../assets/icons/mark-absent.png')}
                style={styles.logo}
              />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.actionButtonText}>
              <Image
                source={require('../assets/icons/edit.png')}
                style={styles.logo}
              />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Card;
