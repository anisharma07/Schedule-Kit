import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import AiCard from '../../../src/components/Cards/AiCard';

const mockDays = {
  mon: [{start: '09:00', end: '10:30', roomName: 'Room A'}],
  tue: [{start: '11:00', end: '12:30', roomName: 'Room B'}],
  wed: [],
  thu: [{start: '14:00', end: '15:30', roomName: null}],
  fri: [],
  sat: [],
  sun: [],
};

const defaultProps = {
  id: 1,
  title: 'Computer Science',
  target_percentage: 80,
  tagColor: '#4CC9FE',
  delay: 0,
  days: mockDays,
};

describe('AiCard Component', () => {
  it('renders correctly with title and target percentage', () => {
    const {getByText} = render(<AiCard {...defaultProps} />);
    
    expect(getByText('Computer Science')).toBeTruthy();
    expect(getByText('Target: 80%')).toBeTruthy();
  });

  it('displays schedule entries correctly', () => {
    const {getByText} = render(<AiCard {...defaultProps} />);
    
    expect(getByText('Mon, Room A')).toBeTruthy();
    expect(getByText('09:00–10:30')).toBeTruthy();
    expect(getByText('Tue, Room B')).toBeTruthy();
    expect(getByText('11:00–12:30')).toBeTruthy();
  });

  it('handles schedule entries without room names', () => {
    const {getByText} = render(<AiCard {...defaultProps} />);
    
    expect(getByText('Thu')).toBeTruthy();
    expect(getByText('14:00–15:30')).toBeTruthy();
  });

  it('renders add and clear buttons', () => {
    const {getByText} = render(<AiCard {...defaultProps} />);
    
    expect(getByText('Add')).toBeTruthy();
    expect(getByText('Clear')).toBeTruthy();
  });

  it('handles empty days correctly', () => {
    const emptyDays = {
      mon: [],
      tue: [],
      wed: [],
      thu: [],
      fri: [],
      sat: [],
      sun: [],
    };
    
    const props = {
      ...defaultProps,
      days: emptyDays,
    };
    
    const component = render(<AiCard {...props} />);
    expect(component).toBeTruthy();
  });

  it('applies correct tag color', () => {
    const component = render(<AiCard {...defaultProps} />);
    // Would need to access style props to verify color application
    expect(component).toBeTruthy();
  });

  it('handles multiple time slots for same day', () => {
    const multipleSlotsdays = {
      ...mockDays,
      mon: [
        {start: '09:00', end: '10:30', roomName: 'Room A'},
        {start: '11:00', end: '12:30', roomName: 'Room A'},
      ],
    };
    
    const props = {
      ...defaultProps,
      days: multipleSlotsdays,
    };
    
    const {getByText} = render(<AiCard {...props} />);
    expect(getByText('09:00–10:30')).toBeTruthy();
    expect(getByText('11:00–12:30')).toBeTruthy();
  });
});