import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AiCard from '../../../src/components/Cards/AiCard';

const mockDays = {
  mon: [{ start: '09:00', end: '10:30', roomName: 'Room A' }],
  tue: [{ start: '11:00', end: '12:30', roomName: 'Room B' }],
  wed: [],
  thu: [{ start: '14:00', end: '15:30', roomName: null }],
  fri: [],
  sat: [],
  sun: [],
};

const mockProps = {
  id: 1,
  title: 'Computer Science',
  target_percentage: 80,
  tagColor: '#4CC9FE',
  delay: 0,
  days: mockDays,
};

describe('AiCard Component', () => {
  it('renders correctly with basic props', () => {
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
    expect(getByText('Thu')).toBeTruthy(); // Should show day without room
    expect(getByText('14:00–15:30')).toBeTruthy();
  });

  it('does not render entries for empty days', () => {
    const { queryByText } = render(<AiCard {...mockProps} />);
    expect(queryByText('Wed')).toBeFalsy();
    expect(queryByText('Fri')).toBeFalsy();
    expect(queryByText('Sat')).toBeFalsy();
    expect(queryByText('Sun')).toBeFalsy();
  });

  it('renders Add and Clear buttons', () => {
    const { getByText } = render(<AiCard {...mockProps} />);
    expect(getByText('Add')).toBeTruthy();
    expect(getByText('Clear')).toBeTruthy();
  });

  it('applies correct tag color to the side bar', () => {
    const { root } = render(<AiCard {...mockProps} />);
    const bar = root.findByProps({ testID: 'color-bar' });
    expect(bar.props.style).toEqual(
      expect.objectContaining({ backgroundColor: '#4CC9FE' })
    );
  });

  it('handles long titles without breaking layout', () => {
    const longTitleProps = { ...mockProps, title: 'Very Long Subject Name That Should Display Properly' };
    const { getByText } = render(<AiCard {...longTitleProps} />);
    expect(getByText('Very Long Subject Name That Should Display Properly')).toBeTruthy();
  });

  it('handles empty schedule correctly', () => {
    const emptyScheduleProps = {
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
    
    const { toJSON } = render(<AiCard {...emptyScheduleProps} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders horizontal scroll view for schedule entries', () => {
    const { root } = render(<AiCard {...mockProps} />);
    const scrollView = root.findByType('ScrollView');
    expect(scrollView.props.horizontal).toBe(true);
    expect(scrollView.props.showsHorizontalScrollIndicator).toBe(false);
  });
});