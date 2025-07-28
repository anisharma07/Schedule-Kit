import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {Alert, ToastAndroid} from 'react-native';
import Card from '../../../src/components/Cards/Card';
import useStore from '../../../src/store/store';

// Mock dependencies
jest.mock('../../../src/store/store');
jest.mock('../../../src/components/Cards/ConicGradient', () => 'ConicGradient');
jest.mock('react-native-animatable', () => ({
  View: 'Animatable.View',
}));

// Mock React Native components
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  return {
    ...RN,
    ToastAndroid: {
      show: jest.fn(),
      SHORT: 'SHORT',
    },
    Alert: {
      alert: jest.fn(),
    },
  };
});

const mockStore = {
  markPresent: jest.fn(),
  markAbsent: jest.fn(),
};

const defaultProps = {
  id: 1,
  title: 'Mathematics',
  present: 15,
  total: 20,
  target_percentage: 75,
  tagColor: '#FF5733',
  cardRegister: 0,
  handleMenuOpen: jest.fn(),
  hasLimit: false,
  limitFreq: 0,
  limitType: 'daily',
  handleViewDetails: jest.fn(),
  delay: 0,
};

describe('Card Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useStore as jest.Mock).mockReturnValue(mockStore);
  });

  it('renders correctly with default props', () => {
    const {getByText, getByTestId} = render(<Card {...defaultProps} />);
    
    expect(getByText('Mathematics')).toBeTruthy();
    expect(getByText('15/20')).toBeTruthy();
  });

  it('calculates percentage correctly', async () => {
    const {getByText} = render(<Card {...defaultProps} />);
    
    await waitFor(() => {
      expect(getByText('75.0%')).toBeTruthy();
    });
  });

  it('displays correct status when on track', async () => {
    const {getByText} = render(<Card {...defaultProps} />);
    
    await waitFor(() => {
      expect(getByText(/on track/)).toBeTruthy();
    });
  });

  it('displays correct status when below target', async () => {
    const props = {
      ...defaultProps,
      present: 10,
      total: 20, // 50% attendance, below 75% target
    };
    
    const {getByText} = render(<Card {...props} />);
    
    await waitFor(() => {
      expect(getByText(/cannot leave/)).toBeTruthy();
    });
  });

  it('handles mark present action', () => {
    const {getByTestId} = render(<Card {...defaultProps} />);
    
    const presentButton = getByTestId('mark-present-button');
    fireEvent.press(presentButton);
    
    expect(mockStore.markPresent).toHaveBeenCalledWith(0, 1);
    expect(ToastAndroid.show).toHaveBeenCalledWith(
      'Mathematics: Present++',
      'SHORT'
    );
  });

  it('handles mark absent action', () => {
    const {getByTestId} = render(<Card {...defaultProps} />);
    
    const absentButton = getByTestId('mark-absent-button');
    fireEvent.press(absentButton);
    
    expect(mockStore.markAbsent).toHaveBeenCalledWith(0, 1);
    expect(ToastAndroid.show).toHaveBeenCalledWith(
      'Mathematics: Absent++',
      'SHORT'
    );
  });

  it('opens menu when three dot button is pressed', () => {
    const handleMenuOpen = jest.fn();
    const props = {
      ...defaultProps,
      handleMenuOpen,
    };
    
    const {getByTestId} = render(<Card {...props} />);
    
    const menuButton = getByTestId('three-dot-menu');
    fireEvent.press(menuButton);
    
    expect(handleMenuOpen).toHaveBeenCalledWith(0, 1);
  });

  it('truncates long titles', () => {
    const props = {
      ...defaultProps,
      title: 'Very Long Subject Name That Should Be Truncated',
    };
    
    const {getByText} = render(<Card {...props} />);
    
    expect(getByText(/Very Long Subje../)).toBeTruthy();
  });

  it('sets correct card color based on percentage', async () => {
    const {rerender} = render(<Card {...defaultProps} />);
    
    // Test above target (green)
    await waitFor(() => {
      const card = render(<Card {...defaultProps} present={18} total={20} />);
      // Would need to access style props to test color
    });
    
    // Test below target (red)
    await waitFor(() => {
      const card = render(<Card {...defaultProps} present={10} total={20} />);
      // Would need to access style props to test color
    });
  });

  it('handles view details action', () => {
    const handleViewDetails = jest.fn();
    const props = {
      ...defaultProps,
      handleViewDetails,
    };
    
    const {getByTestId} = render(<Card {...props} />);
    
    const viewDetailsButton = getByTestId('view-details-button');
    fireEvent.press(viewDetailsButton);
    
    expect(handleViewDetails).toHaveBeenCalledWith(0, 1);
  });

  it('updates attendance counts when props change', () => {
    const {rerender, getByText} = render(<Card {...defaultProps} />);
    
    expect(getByText('15/20')).toBeTruthy();
    
    rerender(<Card {...defaultProps} present={16} total={21} />);
    
    expect(getByText('16/21')).toBeTruthy();
  });
});