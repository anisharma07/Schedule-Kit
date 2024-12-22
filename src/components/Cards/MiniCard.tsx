import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import styles from '../../styles/CardStyles';
import MiniConicGradient from './MiniConicGradient';
import useStore from '../../store/store';
interface CardProps {
  id: number;
  title: string;
  present: number;
  total: number;
  target_percentage: number;
  tagColor: string;
  activeRegister: number;
  handleEdit: (i: number) => void;
}
const MiniCard: React.FC<CardProps> = ({
  id,
  title,
  present,
  total,
  target_percentage,
  tagColor,
  activeRegister,
  handleEdit,
}) => {
  const {markPresent, markAbsent, undoChanges} = useStore();
  const [presents, setPresent] = useState(0);
  const [absents, setAbsents] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [cardColor, setCardColor] = useState('#892B2B');
  const [cardPresents, setCardPresents] = useState(present);
  const [cardTotals, setCardTotals] = useState(total);

  const MarkPresent = () => {
    setCardPresents(prev => prev + 1);
    setCardTotals(prev => prev + 1);
    setPresent(prev => prev + 1);
    markPresent(activeRegister, id);
  };
  const MarkAbsent = () => {
    setCardTotals(prev => prev + 1);
    setAbsents(prev => prev + 1);
    markAbsent(activeRegister, id);
  };
  const undoCurrentChanges = () => {
    undoChanges(activeRegister, id, presents, absents);
    setCardPresents(prev => prev - presents);
    setCardTotals(prev => prev - presents - absents);
    setPresent(0);
    setAbsents(0);
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
      <View style={styles.miniHeader}>
        <View
          style={[styles.miniIndicator, {backgroundColor: tagColor}]}></View>

        <Text style={styles.miniHeaderTitle}>
          {title.length > 8 ? title.substring(0, 8) + '..' : title}
        </Text>
      </View>
      <View>
        <Text style={styles.miniAttendanceCount}>
          {cardPresents}/{cardTotals}
        </Text>
      </View>
      <View style={styles.miniCircularContainer}>
        <View
          style={[styles.miniCircularProgress, {backgroundColor: cardColor}]}>
          <Text style={styles.miniPercentageText}>{percentage}%</Text>
        </View>
        <MiniConicGradient percentage={percentage} />
      </View>
      <TouchableOpacity
        style={styles.miniThreeDot}
        onPress={() => handleEdit(id)}>
        <Image
          source={require('../../assets/icons/three-dot.png')}
          style={styles.threeDot}
        />
      </TouchableOpacity>
      <View style={styles.miniActionButtons}>
        <TouchableOpacity onPress={MarkPresent}>
          <Image
            source={require('../../assets/icons/mark-present.png')}
            style={styles.miniLogo}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={MarkAbsent}>
          <Image
            source={require('../../assets/icons/mark-absent.png')}
            style={styles.miniLogo}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MiniCard;
