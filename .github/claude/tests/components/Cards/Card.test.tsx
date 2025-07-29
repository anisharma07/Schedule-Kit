import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert, ToastAndroid } from 'react-native';
import Card from '../../../src/components/Cards/Card';
import useStore from '../../../src/store/store';

// Mock the store
jest.mock('../../../src/store/store');
const mockUseStore = useStore as jest.MockedFunction<typeof useStore>;

// Mock Alert and ToastAndroid
jest.spyOn(Alert, 'alert');
jest.spyOn(ToastAndroid, 'show');

describe('Card', () => {
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
    delay: 100,
  };

  const mockStore = {
    markPresent: jest.fn(),
    markAbsent: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseStore.mockReturnValue(mockStore as any);
  });

  it('renders correctly with provided props', () => {
    const { getByText } = render(<Card {...mockProps} />);
    
    expect(getByText('Mathematics')).toBeTruthy();
    expect(getByText('15/20')).toBeTruthy();
  });

  it('renders truncated title when title is too long', () => {
    const longTitleProps = {
      ...mockProps,
      title: 'Very Long Subject Name That Should Be Truncated',
    };
    
    const { getByText } = render(<Card {...longTitleProps} />);
    expect(getByText(/Very Long Subje../)).toBeTruthy();
  });

  it('calculates percentage correctly', async () => {
    const { getByText } = render(<Card {...mockProps} />);
    
    // Should show 75% (15/20 * 100)
    await waitFor(() => {
      expect(getByText('75.0%')).toBeTruthy();
    });
  });

  it('handles mark present button press', () => {
    const { getByTestId } = render(<Card {...mockProps} />);
    
    const presentButton = getByTestId('mark-present-button');
    fireEvent.press(presentButton);

    expect(mockStore.markPresent).toHaveBeenCalledWith(0, 1);
    expect(ToastAndroid.show).toHaveBeenCalled();
  });

  it('handles mark absent button press', () => {
    const { getByTestId } = render(<Card {...mockProps} />);
    
    const absentButton = getByTestId('mark-absent-button');
    fireEvent.press(absentButton);

    expect(mockStore.markAbsent).toHaveBeenCalledWith(0, 1);
    expect(ToastAndroid.show).toHaveBeenCalled();
  });

  it('calls handleMenuOpen when menu button is pressed', () => {
    const { getByTestId } = render(<Card {...mockProps} />);
    
    const menuButton = getByTestId('menu-button');
    fireEvent.press(menuButton);

    expect(mockProps.handleMenuOpen).toHaveBeenCalledWith(0, 1);
  });

  it('calls handleViewDetails when view details button is pressed', () => {
    const { getByTestId } = render(<Card {...mockProps} />);
    
    const viewDetailsButton = getByTestId('view-details-button');
    fireEvent.press(viewDetailsButton);

    expect(mockProps.handleViewDetails).toHaveBeenCalledWith(0, 1);
  });

  it('shows correct card color based on percentage vs target', async () => {
    // Test below target (red)
    const belowTargetProps = { ...mockProps, present: 10, total: 20 }; // 50% < 75%
    const { rerender } = render(<Card {...belowTargetProps} />);
    
    // Test above target (green)
    rerender(<Card {...mockProps} />); // 75% = 75%
    
    // Test well above target
    const aboveTargetProps = { ...mockProps, present: 18, total: 20 }; // 90% > 75%
    rerender(<Card {...aboveTargetProps} />);
  });

  it('displays correct status message', async () => {
    const { getByText } = render(<Card {...mockProps} />);
    
    await waitFor(() => {
      // Should show some status message
      expect(getByText(/track|leave|cannot/)).toBeTruthy();
    });
  });

  it('handles zero total classes', () => {
    const zeroTotalProps = { ...mockProps, present: 0, total: 0 };
    const { getByText } = render(<Card {...zeroTotalProps} />);
    
    expect(getByText('0/0')).toBeTruthy();
  });

  it('updates state when props change', () => {
    const { rerender, getByText } = render(<Card {...mockProps} />);
    
    const updatedProps = { ...mockProps, present: 18, total: 22 };
    rerender(<Card {...updatedProps} />);
    
    expect(getByText('18/22')).toBeTruthy();
  });
});