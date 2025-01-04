import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import styles from '../../styles/CardStyles';
import ConicGradient from './ConicGradient';
import useStore from '../../store/store';

interface CardProps {
  id: number;
  title: string;
  present: number;
  total: number;
  target_percentage: number;
  tagColor: string;
  cardRegister: number;
  isChange: boolean;
  handleMenuOpen: (r: number, c: number) => void;
}

const Card: React.FC<CardProps> = ({
  id,
  title,
  present,
  total,
  target_percentage,
  tagColor,
  cardRegister,
  isChange,
  handleMenuOpen,
}) => {
  const {registers} = useStore();
  const {markPresent, markAbsent} = useStore();
  const [percentage, setPercentage] = useState(0);
  const [cardColor, setCardColor] = useState('#892B2B');
  const [cardPresents, setCardPresents] = useState(present);
  const [cardTotals, setCardTotals] = useState(total);

  useEffect(() => {}, [isChange]);

  const MarkPresent = () => {
    setCardPresents(prev => prev + 1);
    setCardTotals(prev => prev + 1);
    markPresent(cardRegister, id);
  };
  const MarkAbsent = () => {
    setCardTotals(prev => prev + 1);
    markAbsent(cardRegister, id);
  };
  useEffect(() => {
    const updatePercentage = () => {
      const percentage =
        cardTotals == 0 ? '0' : ((cardPresents / cardTotals) * 100).toFixed(1);
      setPercentage(parseFloat(percentage));
    };
    updatePercentage();
  }, [cardPresents, cardTotals]);

  useEffect(() => {
    const setColor = () => {
      if (percentage > target_percentage) {
        setCardColor('#1A5F18');
      } else if (percentage < target_percentage) {
        setCardColor('#892B2B');
      } else {
        setCardColor('#006D90');
      }
    };
    setColor();
  }, [percentage]);

  return (
    <View style={[styles.cardContainer, {backgroundColor: cardColor}]}>
      <View>
        <View style={styles.header}>
          <View style={[styles.indicator, {backgroundColor: tagColor}]}></View>
          <Text style={styles.headerTitle}>
            {title.length > 15 ? title.substring(0, 15) + '..' : title}
          </Text>
        </View>
        <View>
          <View style={styles.ratioBox}>
            <Text style={styles.attendanceText}>Attended</Text>
            <Text style={styles.attendanceCount}>
              {cardPresents}/{cardTotals}
            </Text>
          </View>
          <Text style={styles.statusText}>classes left: 4</Text>
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
                source={require('../../assets/icons/mark-present.png')}
                style={styles.logo}
              />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={MarkAbsent}>
            <Text style={styles.actionButtonText}>
              <Image
                source={require('../../assets/icons/mark-absent.png')}
                style={styles.logo}
              />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleMenuOpen(cardRegister, id)}>
            <Text style={styles.actionButtonText}>
              <Image
                source={require('../../assets/icons/menu.png')}
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
