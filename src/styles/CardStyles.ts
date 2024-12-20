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
  logo: {
    width: 24,
    height: 22,
    objectFit: 'contain',
    marginBottom: 10,
  },
  rightBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 15,
    marginRight: 15,
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
    marginBottom: 8,
  },
  indicator: {
    width: 5,
    height: 24,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#fff',
  },
  attendanceInfo: {
    marginTop: 8,
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
  statusText: {
    fontSize: 14,
    color: '#fff',
  },
  circularContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 75,
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
  percentageText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 15,
  },
  actionButtonText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default styles;
