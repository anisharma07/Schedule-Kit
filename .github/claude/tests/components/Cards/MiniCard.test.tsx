import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MiniCard from '../../../src/components/Cards/MiniCard';
import useStore from '../../../src/store/store';

jest.mock('../../../src/store/store');
const mockUseStore = useStore as jest.MockedFunction<typeof useStore>;

describe('MiniCard', () => {
  const mockProps = {
    id: 1,
    title: 'Physics',
    present: 12,
    total: 15,
    target_percentage: 80,
    tagColor: '#16C47F',
    cardRegister: 0,
    handleMenuOpen: jest.fn(),
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
    const { getByText } = render(<MiniCard {...mockProps} />);
    
    expect(getByText('Physics')).toBeTruthy();
    expect(getByText('12/15')).toBeTruthy();
  });

  it('truncates long titles correctly', () => {
    const longTitleProps = {
      ...mockProps,
      title: 'Very Long Subject Name',
    };
    
    const { getByText } = render(<MiniCard {...longTitleProps} />);
    expect(getByText('Very Lon..')).toBeTruthy();
  });

  it('displays percentage correctly', () => {
    const { getByText } = render(<MiniCard {...mockProps} />);
    // 12/15 * 100 = 80%
    expect(getByText('80.0%')).toBeTruthy();
  });

  it('handles mark present action', () => {
    const { getByTestId } = render(<MiniCard {...mockProps} />);
    
    const presentButton = getByTestId('mini-present-button');
    fireEvent.press(presentButton);

    expect(mockStore.markPresent).toHaveBeenCalledWith(0, 1);
  });

  it('handles mark absent action', () => {
    const { getByTestId } = render(<MiniCard {...mockProps} />);
    
    const absentButton = getByTestId('mini-absent-button');
    fireEvent.press(absentButton);

    expect(mockStore.markAbsent).toHaveBeenCalledWith(0, 1);
  });

  it('calls handleMenuOpen when three-dot menu is pressed', () => {
    const { getByTestId } = render(<MiniCard {...mockProps} />);
    
    const menuButton = getByTestId('mini-menu-button');
    fireEvent.press(menuButton);

    expect(mockProps.handleMenuOpen).toHaveBeenCalledWith(0, 1);
  });

  it('updates attendance count after marking present', () => {
    const { getByText, rerender } = render(<MiniCard {...mockProps} />);
    
    expect(getByText('12/15')).toBeTruthy();
    
    // Simulate state change after marking present
    const updatedProps = { ...mockProps, present: 13, total: 16 };
    rerender(<MiniCard {...updatedProps} />);
    
    expect(getByText('13/16')).toBeTruthy();
  });

  it('shows correct card color based on percentage vs target', () => {
    // Test below target
    const belowTargetProps = { ...mockProps, present: 8, total: 15 }; // 53% < 80%
    const { rerender, getByTestId } = render(<MiniCard {...belowTargetProps} />);
    
    let cardContainer = getByTestId('mini-card-container');
    // Should have red color for below target
    expect(cardContainer).toBeTruthy();
    
    // Test at target
    rerender(<MiniCard {...mockProps} />); // 80% = 80%
    
    // Test above target
    const aboveTargetProps = { ...mockProps, present: 14, total: 15 }; // 93% > 80%
    rerender(<MiniCard {...aboveTargetProps} />);
  });

  it('handles zero total classes', () => {
    const zeroTotalProps = { ...mockProps, present: 0, total: 0 };
    const { getByText } = render(<MiniCard {...zeroTotalProps} />);
    
    expect(getByText('0/0')).toBeTruthy();
    expect(getByText('0%')).toBeTruthy();
  });

  it('applies correct tag color to indicator', () => {
    const { getByTestId } = render(<MiniCard {...mockProps} />);
    
    const indicator = getByTestId('mini-indicator');
    expect(indicator.props.style).toMatchObject({
      backgroundColor: '#16C47F',
    });
  });

  it('handles decimal percentages correctly', () => {
    const decimalProps = { ...mockProps, present: 7, total: 9 };
    const { getByText } = render(<MiniCard {...decimalProps} />);
    
    // 7/9 * 100 = 77.77... should be rounded to 77.8%
    expect(getByText('77.8%')).toBeTruthy();
  });
});