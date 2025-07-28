import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Calendar from '../../src/components/Calendar';

describe('Calendar', () => {
  const mockSetSelectedDate = jest.fn();
  const mockSetCurrentMonth = jest.fn();
  
  const defaultProps = {
    selectedDate: new Date(2024, 0, 15), // January 15, 2024
    setSelectedDate: mockSetSelectedDate,
    markedArr: [
      {
        date: '2024-01-10',
        type: 'present',
        card_id: 1,
      },
      {
        date: '2024-01-20',
        type: 'absent',
        card_id: 1,
      },
    ],
    currentMonth: new Date(2024, 0, 1), // January 2024
    setCurrentMonth: mockSetCurrentMonth,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    const {getByText} = render(<Calendar {...defaultProps} />);
    expect(getByText('January 2024')).toBeTruthy();
  });

  it('displays days of the week', () => {
    const {getByText} = render(<Calendar {...defaultProps} />);
    expect(getByText('Sun')).toBeTruthy();
    expect(getByText('Mon')).toBeTruthy();
    expect(getByText('Tue')).toBeTruthy();
    expect(getByText('Wed')).toBeTruthy();
    expect(getByText('Thu')).toBeTruthy();
    expect(getByText('Fri')).toBeTruthy();
    expect(getByText('Sat')).toBeTruthy();
  });

  it('handles date selection', () => {
    const {getByText} = render(<Calendar {...defaultProps} />);
    const dateButton = getByText('20');
    
    fireEvent.press(dateButton);
    
    expect(mockSetSelectedDate).toHaveBeenCalledWith(new Date(2024, 0, 20));
  });

  it('handles previous month navigation', () => {
    const {getByTestId} = render(<Calendar {...defaultProps} />);
    const prevButton = getByTestId('prev-month-button');
    
    fireEvent.press(prevButton);
    
    expect(mockSetCurrentMonth).toHaveBeenCalledWith(new Date(2023, 11, 1));
  });

  it('handles next month navigation', () => {
    const {getByTestId} = render(<Calendar {...defaultProps} />);
    const nextButton = getByTestId('next-month-button');
    
    fireEvent.press(nextButton);
    
    expect(mockSetCurrentMonth).toHaveBeenCalledWith(new Date(2024, 1, 1));
  });

  it('highlights today correctly', () => {
    const today = new Date();
    const todayProps = {
      ...defaultProps,
      currentMonth: today,
      selectedDate: today,
    };
    
    const {getByTestId} = render(<Calendar {...todayProps} />);
    const todayButton = getByTestId(`date-${today.getDate()}`);
    
    expect(todayButton.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          backgroundColor: expect.any(String),
        })
      ])
    );
  });

  it('highlights selected date', () => {
    const {getByTestId} = render(<Calendar {...defaultProps} />);
    const selectedButton = getByTestId('date-15');
    
    expect(selectedButton.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          backgroundColor: expect.any(String),
        })
      ])
    );
  });

  it('displays marked dates correctly', () => {
    const {getByTestId} = render(<Calendar {...defaultProps} />);
    const markedDate = getByTestId('date-10');
    
    expect(markedDate.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          backgroundColor: expect.any(String),
        })
      ])
    );
  });

  it('handles swipe gestures', () => {
    const {getByTestId} = render(<Calendar {...defaultProps} />);
    const gestureRecognizer = getByTestId('gesture-recognizer');
    
    // Simulate swipe left (next month)
    fireEvent(gestureRecognizer, 'onSwipeLeft');
    expect(mockSetCurrentMonth).toHaveBeenCalledWith(new Date(2024, 1, 1));
    
    // Simulate swipe right (previous month)
    fireEvent(gestureRecognizer, 'onSwipeRight');
    expect(mockSetCurrentMonth).toHaveBeenCalledWith(new Date(2023, 11, 1));
  });

  it('handles different month years', () => {
    const differentYear = {
      ...defaultProps,
      currentMonth: new Date(2025, 5, 1), // June 2025
    };
    
    const {getByText} = render(<Calendar {...differentYear} />);
    expect(getByText('June 2025')).toBeTruthy();
  });

  it('handles empty marked array', () => {
    const emptyMarked = {
      ...defaultProps,
      markedArr: [],
    };
    
    const {getByText} = render(<Calendar {...emptyMarked} />);
    expect(getByText('January 2024')).toBeTruthy();
  });

  it('identifies Sundays correctly', () => {
    const {getByTestId} = render(<Calendar {...defaultProps} />);
    
    // January 7, 2024 is a Sunday
    const sundayDate = getByTestId('date-7');
    expect(sundayDate.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          color: expect.any(String), // Sunday styling
        })
      ])
    );
  });
});