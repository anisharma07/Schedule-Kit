import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import styles from '../styles/CardStyles';
import MiniConicGradient from './MiniConicGradient';

const MiniCard: React.FC = () => {
  const target = 75;
  const [presents, setPresent] = useState(1);
  const [total, setTotal] = useState(2);
  const [percentage, setPercentage] = useState(0);
  const [cardColor, setCardColor] = useState('#892B2B');
  const [tagColor, setTagColor] = useState('#ffffff');
  const [headerTitle, setHeaderTitle] = useState('22DCS002');
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
      <View style={styles.miniHeader}>
        <View
          style={[styles.miniIndicator, {backgroundColor: tagColor}]}></View>

        <Text style={styles.miniHeaderTitle}>
          {headerTitle.length > 8
            ? headerTitle.substring(0, 8) + '..'
            : headerTitle}
        </Text>
      </View>
      <View>
        <Text style={styles.miniAttendanceCount}>
          {presents}/{total}
        </Text>
      </View>
      <View style={styles.miniCircularContainer}>
        <View
          style={[styles.miniCircularProgress, {backgroundColor: cardColor}]}>
          <Text style={styles.miniPercentageText}>{percentage}%</Text>
        </View>
        <MiniConicGradient percentage={percentage} />
      </View>
      <TouchableOpacity style={styles.miniThreeDot}>
        <Image
          source={require('../assets/icons/three-dot.png')}
          style={styles.threeDot}
        />
      </TouchableOpacity>
      <View style={styles.miniActionButtons}>
        <TouchableOpacity onPress={MarkPresent}>
          <Image
            source={require('../assets/icons/mark-present.png')}
            style={styles.miniLogo}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={MarkAbsent}>
          <Image
            source={require('../assets/icons/mark-absent.png')}
            style={styles.miniLogo}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MiniCard;
