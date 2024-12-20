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
  const [tagColor, setTagColor] = useState('#A7D477');
  const [headerTitle, setHeaderTitle] = useState('ALGORITHMS');
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
        <Image
          source={require('../assets/icons/three-dot.png')}
          style={styles.logo}
        />
      </TouchableOpacity>
      <View>
        <View style={styles.header}>
          <View style={[styles.indicator, {backgroundColor: tagColor}]}></View>
          <Text style={styles.headerTitle}>
            {headerTitle.length > 10
              ? headerTitle.substring(0, 10) + '..'
              : headerTitle}
          </Text>
        </View>
        <View>
          <View style={styles.ratioBox}>
            <Text style={styles.attendanceText}>Attended:</Text>
            <Text style={styles.attendanceCount}>
              {presents}/{total}
            </Text>
          </View>
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
                source={require('../assets/icons/eye.png')}
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
