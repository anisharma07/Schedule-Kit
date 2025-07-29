import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AiCard from '../../../src/components/Cards/AiCard';

describe('AiCard', () => {
  const mockDays = {
    mon: [{ start: '09:00', end: '10:30', roomName: 'Room A' }],
    tue: [{ start: '11:00', end: '12:30', roomName: 'Room B' }],
    wed: [],
    thu: [{ start: '14:00', end: '15:30', roomName: null }],
    fri: [{ start: '08:00', end: '09:30', roomName: 'Lab 1' }],
    sat: [],
    sun: [],
  };

  const mockProps = {
    id: 1,
    title: 'Computer Science',
    target_percentage: 80,
    tagColor: '#4CC9FE',
    delay: 200,
    days: mockDays,
  };

  it('renders correctly with provided props', () => {
    const { getByText } = render(<AiCard {...mockProps} />);
    
    expect(getByText('Computer Science')).toBeTruthy();
    expect(getByText('Target: 80%')).toBeTruthy();
  });

  it('displays schedule entries correctly', () => {
    const { getByText } = render(<AiCard {...mockProps} />);
    
    expect(getByText('Mon, Room A')).toBeTruthy();
    expect(getByText('09:00–10:30')).toBeTruthy();
    expect(getByText('Tue, Room B')).toBeTruthy();
    expect(getByText('11:00–12:30')).toBeTruthy();
  });

  it('handles schedule entries without room names', () => {
    const { getByText } = render(<AiCard {...mockProps} />);
    
    expect(getByText('Thu')).toBeTruthy();
    expect(getByText('14:00–15:30')).toBeTruthy();
  });

  it('handles empty days correctly', () => {
    const emptyDaysProps = {
      ...mockProps,
      days: {
        mon: [],
        tue: [],
        wed: [],
        thu: [],
        fri: [],
        sat: [],
        sun: [],
      },
    };

    const { toJSON } = render(<AiCard {...emptyDaysProps} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders add button', () => {
    const { getByText } = render(<AiCard {...mockProps} />);
    expect(getByText('Add')).toBeTruthy();
  });

  it('renders clear button', () => {
    const { getByText } = render(<AiCard {...mockProps} />);
    expect(getByText('Clear')).toBeTruthy();
  });

  it('handles button presses', () => {
    const { getByText } = render(<AiCard {...mockProps} />);
    
    const addButton = getByText('Add');
    const clearButton = getByText('Clear');
    
    fireEvent.press(addButton);
    fireEvent.press(clearButton);
    
    // Buttons should not crash when pressed
    expect(addButton).toBeTruthy();
    expect(clearButton).toBeTruthy();
  });

  it('displays correct tag color', () => {
    const { getByTestId } = render(<AiCard {...mockProps} />);
    
    // The colored bar should have the correct background color
    const coloredBar = getByTestId('colored-bar');
    expect(coloredBar.props.style).toMatchObject({
      backgroundColor: '#4CC9FE',
    });
  });

  it('handles multiple slots per day', () => {
    const multiSlotProps = {
      ...mockProps,
      days: {
        ...mockDays,
        mon: [
          { start: '09:00', end: '10:30', roomName: 'Room A' },
          { start: '11:00', end: '12:30', roomName: 'Room B' },
        ],
      },
    };

    const { getByText } = render(<AiCard {...multiSlotProps} />);
    
    expect(getByText('Mon, Room A')).toBeTruthy();
    expect(getByText('Mon, Room B')).toBeTruthy();
    expect(getByText('09:00–10:30')).toBeTruthy();
    expect(getByText('11:00–12:30')).toBeTruthy();
  });

  it('capitalizes day names correctly', () => {
    const { getByText } = render(<AiCard {...mockProps} />);
    
    expect(getByText('Mon, Room A')).toBeTruthy();
    expect(getByText('Tue, Room B')).toBeTruthy();
    expect(getByText('Thu')).toBeTruthy();
    expect(getByText('Fri, Lab 1')).toBeTruthy();
  });
});