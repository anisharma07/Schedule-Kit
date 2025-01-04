import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    width: '92%',
    maxWidth: 500,
  },

  closeButton: {
    position: 'absolute',
    top: 7,
    right: 10,
  },
  closeButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  miniHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  indicator: {
    width: 4,
    height: 24,
    marginRight: 11,
  },
  miniIndicator: {
    position: 'absolute',
    top: 5,
    left: -9,
    width: 3,
    height: 18,
    marginRight: 6,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#fff',
  },
  miniHeaderTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#fff',
  },
  ratioBox: {
    marginTop: 14,

    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  attendanceText: {
    fontSize: 21,
    fontWeight: '600',
    color: '#fff',
  },
  attendanceCount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  miniAttendanceCount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    minWidth: 80,
    textAlign: 'center',
  },
  statusText: {
    fontSize: 14,
    color: '#fff',
  },
  rightBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 15,
  },
  circularContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 75,
  },
  miniCircularContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
  },
  circularProgress: {
    width: 58,
    height: 58,
    borderRadius: 50,
    position: 'absolute',
    zIndex: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  miniCircularProgress: {
    width: 40,
    height: 40,
    borderRadius: 50,
    position: 'absolute',
    zIndex: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  percentageText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  miniPercentageText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#fff',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 15,
  },
  miniActionButtons: {
    flexDirection: 'row',
    gap: 12,
    paddingTop: 10,
  },
  actionButtonText: {
    fontSize: 18,
    color: '#fff',
  },

  logo: {
    width: 24,
    height: 22,
    objectFit: 'contain',
    marginBottom: 10,
  },
  miniThreeDot: {
    position: 'absolute',
    top: 3,
    right: 18,
  },
  miniLogo: {
    width: 24,
    height: 24,
    objectFit: 'contain',
  },
  threeDot: {
    width: 15,
    objectFit: 'contain',
  },
});

export default styles;
