import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import AiCard from '../../../src/components/Cards/AiCard';

describe('AiCard', () => {
  const mockDays = {
    mon: [{start: '09:00', end: '10:00', roomName: 'Room A'}],
    tue: [{start: '10:00', end: '11:00', roomName: 'Room B'}],
    wed: [],
    thu: [{start: '14:00', end: '15:00', roomName: null}],
    fri: [],
    sat: [],
    sun: [],
  };

  const defaultProps = {
    id: 1,
    title: 'Computer Science',
    target_percentage: 80,
    tagColor: '#3b82f6',
    delay: 0,
    days: mockDays,
  };

  it('renders correctly with basic props', () => {
    const {getByText} = render(<AiCard {...defaultProps} />);
    expect(getByText('Computer Science')).toBeTruthy();
    expect(getByText('Target: 80%')).toBeTruthy();
  });

  it('displays schedule entries correctly', () => {
    const {getByText} = render(<AiCard {...defaultProps} />);
    
    expect(getByText('Mon, Room A')).toBeTruthy();
    expect(getByText('09:00–10:00')).toBeTruthy();
    expect(getByText('Tue, Room B')).toBeTruthy();
    expect(getByText('10:00–11:00')).toBeTruthy();
  });

  it('handles schedule entries without room names', () => {
    const {getByText} = render(<AiCard {...defaultProps} />);
    
    expect(getByText('Thu')).toBeTruthy();
    expect(getByText('14:00–15:00')).toBeTruthy();
  });

  it('renders add and clear buttons', () => {
    const {getByText} = render(<AiCard {...defaultProps} />);
    
    expect(getByText('Add')).toBeTruthy();
    expect(getByText('Clear')).toBeTruthy();
  });

  it('handles add button press', () => {
    const {getByText} = render(<AiCard {...defaultProps} />);
    const addButton = getByText('Add');
    
    fireEvent.press(addButton);
    // Add button functionality should be implemented
  });

  it('handles clear button press', () => {
    const {getByText} = render(<AiCard {...defaultProps} />);
    const clearButton = getByText('Clear');
    
    fireEvent.press(clearButton);
    // Clear button functionality should be implemented
  });

  it('displays correct tag color', () => {
    const {getByTestId} = render(<AiCard {...defaultProps} />);
    const colorBar = getByTestId('color-bar');
    
    expect(colorBar.props.style).toEqual(
      expect.objectContaining({backgroundColor: '#3b82f6'})
    );
  });

  it('handles empty schedule days', () => {
    const emptyDays = {
      mon: [],
      tue: [],
      wed: [],
      thu: [],
      fri: [],
      sat: [],
      sun: [],
    };
    
    const {queryByText} = render(<AiCard {...defaultProps} days={emptyDays} />);
    
    expect(queryByText('Mon')).toBeNull();
    expect(queryByText('Tue')).toBeNull();
  });

  it('scrolls horizontally through schedule entries', () => {
    const manyDays = {
      mon: [
        {start: '09:00', end: '10:00', roomName: 'Room A'},
        {start: '11:00', end: '12:00', roomName: 'Room B'},
      ],
      tue: [
        {start: '10:00', end: '11:00', roomName: 'Room C'},
        {start: '14:00', end: '15:00', roomName: 'Room D'},
      ],
      wed: [{start: '13:00', end: '14:00', roomName: 'Room E'}],
      thu: [{start: '15:00', end: '16:00', roomName: 'Room F'}],
      fri: [{start: '16:00', end: '17:00', roomName: 'Room G'}],
      sat: [],
      sun: [],
    };

    const {getByTestId} = render(<AiCard {...defaultProps} days={manyDays} />);
    const scrollView = getByTestId('schedule-scroll-view');
    
    expect(scrollView.props.horizontal).toBe(true);
    expect(scrollView.props.showsHorizontalScrollIndicator).toBe(false);
  });
});