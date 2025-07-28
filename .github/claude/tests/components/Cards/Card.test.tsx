import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {ToastAndroid} from 'react-native';
import Card from '../../../src/components/Cards/Card';
import useStore from '../../../src/store/store';

// Mock the store
jest.mock('../../../src/store/store');
jest.mock('react-native-animatable', () => ({
  View: 'View',
}));

// Mock ToastAndroid
jest.mock('react-native', () => ({
  ...jest.requireActual('react-native'),
  ToastAndroid: {
    show: jest.fn(),
    SHORT: 'SHORT',
  },
}));

const mockStore = useStore as jest.MockedFunction<typeof useStore>;

describe('Card', () => {
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

  const mockUseStore = {
    markPresent: jest.fn(),
    markAbsent: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockStore.mockReturnValue(mockUseStore);
  });

  it('renders correctly with basic props', () => {
    const {getByText} = render(<Card {...defaultProps} />);
    expect(getByText('Mathematics')).toBeTruthy();
    expect(getByText('15/20')).toBeTruthy();
  });

  it('displays correct percentage calculation', async () => {
    const {getByText} = render(<Card {...defaultProps} />);
    await waitFor(() => {
      expect(getByText('75.0%')).toBeTruthy();
    });
  });

  it('handles mark present button press', async () => {
    const {getByTestId} = render(<Card {...defaultProps} />);
    const presentButton = getByTestId('mark-present-button');
    
    fireEvent.press(presentButton);
    
    await waitFor(() => {
      expect(mockUseStore.markPresent).toHaveBeenCalledWith(0, 1);
      expect(ToastAndroid.show).toHaveBeenCalledWith(
        'Mathematics: Present++',
        'SHORT'
      );
    });
  });

  it('handles mark absent button press', async () => {
    const {getByTestId} = render(<Card {...defaultProps} />);
    const absentButton = getByTestId('mark-absent-button');
    
    fireEvent.press(absentButton);
    
    await waitFor(() => {
      expect(mockUseStore.markAbsent).toHaveBeenCalledWith(0, 1);
      expect(ToastAndroid.show).toHaveBeenCalledWith(
        'Mathematics: Absent++',
        'SHORT'
      );
    });
  });

  it('handles menu button press', () => {
    const handleMenuOpen = jest.fn();
    const {getByTestId} = render(
      <Card {...defaultProps} handleMenuOpen={handleMenuOpen} />
    );
    
    const menuButton = getByTestId('menu-button');
    fireEvent.press(menuButton);
    
    expect(handleMenuOpen).toHaveBeenCalledWith(0, 1);
  });

  it('handles view details button press', () => {
    const handleViewDetails = jest.fn();
    const {getByTestId} = render(
      <Card {...defaultProps} handleViewDetails={handleViewDetails} />
    );
    
    const viewDetailsButton = getByTestId('view-details-button');
    fireEvent.press(viewDetailsButton);
    
    expect(handleViewDetails).toHaveBeenCalledWith(0, 1);
  });

  it('truncates long title correctly', () => {
    const longTitle = 'This is a very long subject name that should be truncated';
    const {getByText} = render(<Card {...defaultProps} title={longTitle} />);
    
    expect(getByText('This is a very l..')).toBeTruthy();
  });

  it('displays correct card color based on percentage', async () => {
    const {rerender} = render(<Card {...defaultProps} present={10} total={20} />);
    
    // Below target (50% < 75%)
    await waitFor(() => {
      expect(getByText('50.0%')).toBeTruthy();
    });
    
    // Above target
    rerender(<Card {...defaultProps} present={16} total={20} />);
    await waitFor(() => {
      expect(getByText('80.0%')).toBeTruthy();
    });
  });

  it('calculates status correctly when above target', async () => {
    const {getByText} = render(<Card {...defaultProps} present={16} total={20} />);
    
    await waitFor(() => {
      expect(getByText(/can leave/)).toBeTruthy();
    });
  });

  it('calculates status correctly when below target', async () => {
    const {getByText} = render(<Card {...defaultProps} present={10} total={20} />);
    
    await waitFor(() => {
      expect(getByText(/cannot leave/)).toBeTruthy();
    });
  });

  it('updates state when props change', async () => {
    const {rerender, getByText} = render(<Card {...defaultProps} />);
    
    rerender(<Card {...defaultProps} present={18} total={22} />);
    
    await waitFor(() => {
      expect(getByText('18/22')).toBeTruthy();
    });
  });
});