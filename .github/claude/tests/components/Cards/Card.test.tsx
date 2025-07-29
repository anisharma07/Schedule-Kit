import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert, ToastAndroid } from 'react-native';
import Card from '../../../src/components/Cards/Card';

// Mock dependencies
jest.mock('../../../src/store/store', () => ({
  __esModule: true,
  default: () => ({
    markPresent: jest.fn(),
    markAbsent: jest.fn(),
  }),
}));

jest.mock('react-native-animatable', () => ({
  View: 'View',
}));

jest.mock('../../../src/components/Cards/ConicGradient', () => 'ConicGradient');

// Mock Alert and ToastAndroid
jest.spyOn(Alert, 'alert');
jest.spyOn(ToastAndroid, 'show');

const mockProps = {
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
  limitType: 'weekly',
  handleViewDetails: jest.fn(),
  delay: 0,
};

describe('Card Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with basic props', () => {
    const { getByText } = render(<Card {...mockProps} />);
    expect(getByText('Mathematics')).toBeTruthy();
    expect(getByText('15/20')).toBeTruthy();
  });

  it('calculates and displays correct percentage', async () => {
    const { getByText } = render(<Card {...mockProps} />);
    await waitFor(() => {
      expect(getByText('75.0%')).toBeTruthy();
    });
  });

  it('truncates long titles correctly', () => {
    const longTitleProps = { ...mockProps, title: 'Very Long Subject Name That Should Be Truncated' };
    const { getByText } = render(<Card {...longTitleProps} />);
    expect(getByText('Very Long Subj..')).toBeTruthy();
  });

  it('handles mark present action', async () => {
    const { getByTestId } = render(<Card {...mockProps} />);
    const presentButton = getByTestId('mark-present-button');
    
    fireEvent.press(presentButton);
    
    await waitFor(() => {
      expect(ToastAndroid.show).toHaveBeenCalledWith(
        'Mathematics: Present++',
        ToastAndroid.SHORT
      );
    });
  });

  it('handles mark absent action', async () => {
    const { getByTestId } = render(<Card {...mockProps} />);
    const absentButton = getByTestId('mark-absent-button');
    
    fireEvent.press(absentButton);
    
    await waitFor(() => {
      expect(ToastAndroid.show).toHaveBeenCalledWith(
        'Mathematics: Absent++',
        ToastAndroid.SHORT
      );
    });
  });

  it('calls handleMenuOpen when menu button is pressed', () => {
    const { getByTestId } = render(<Card {...mockProps} />);
    const menuButton = getByTestId('card-menu-button');
    
    fireEvent.press(menuButton);
    
    expect(mockProps.handleMenuOpen).toHaveBeenCalledWith(0, 1);
  });

  it('calls handleViewDetails when view details button is pressed', () => {
    const { getByTestId } = render(<Card {...mockProps} />);
    const viewDetailsButton = getByTestId('view-details-button');
    
    fireEvent.press(viewDetailsButton);
    
    expect(mockProps.handleViewDetails).toHaveBeenCalledWith(0, 1);
  });

  it('displays correct status when on track', async () => {
    const onTrackProps = { ...mockProps, present: 16, total: 20 }; // 80% > 75%
    const { getByText } = render(<Card {...onTrackProps} />);
    
    await waitFor(() => {
      expect(getByText(/can leave/)).toBeTruthy();
    });
  });

  it('displays correct status when below target', async () => {
    const belowTargetProps = { ...mockProps, present: 10, total: 20 }; // 50% < 75%
    const { getByText } = render(<Card {...belowTargetProps} />);
    
    await waitFor(() => {
      expect(getByText(/cannot leave/)).toBeTruthy();
    });
  });

  it('applies correct card color based on percentage', async () => {
    const { rerender, root } = render(<Card {...mockProps} />);
    
    await waitFor(() => {
      const cardContainer = root.findByProps({ testID: 'card-container' });
      expect(cardContainer.props.style[0].backgroundColor).toBe('#006D90'); // On target
    });

    // Test above target
    rerender(<Card {...mockProps} present={18} total={20} />);
    await waitFor(() => {
      const cardContainer = root.findByProps({ testID: 'card-container' });
      expect(cardContainer.props.style[0].backgroundColor).toBe('#1A5F18'); // Above target
    });

    // Test below target
    rerender(<Card {...mockProps} present={10} total={20} />);
    await waitFor(() => {
      const cardContainer = root.findByProps({ testID: 'card-container' });
      expect(cardContainer.props.style[0].backgroundColor).toBe('#892B2B'); // Below target
    });
  });
});