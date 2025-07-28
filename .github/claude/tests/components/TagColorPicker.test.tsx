import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import TagColorPicker from '../../src/components/TagColorPicker';

describe('TagColorPicker', () => {
  const defaultProps = {
    selectedColor: '#F93827',
    setSelectedColor: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    const {getByTestId} = render(<TagColorPicker {...defaultProps} />);
    const container = getByTestId('color-picker-container');
    expect(container).toBeTruthy();
  });

  it('renders all color options', () => {
    const {getAllByTestId} = render(<TagColorPicker {...defaultProps} />);
    const colorCircles = getAllByTestId('color-circle');
    
    expect(colorCircles).toHaveLength(11); // 11 color options
  });

  it('highlights selected color', () => {
    const {getByTestId} = render(<TagColorPicker {...defaultProps} />);
    const selectedCircle = getByTestId('color-circle-#F93827');
    
    expect(selectedCircle.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          borderColor: '#868686',
          borderWidth: 3,
        })
      ])
    );
  });

  it('handles color selection', () => {
    const setSelectedColor = jest.fn();
    const {getByTestId} = render(
      <TagColorPicker {...defaultProps} setSelectedColor={setSelectedColor} />
    );
    
    const colorCircle = getByTestId('color-circle-#FF5733');
    fireEvent.press(colorCircle);
    
    expect(setSelectedColor).toHaveBeenCalledWith('#FF5733');
  });

  it('displays correct colors in order', () => {
    const expectedColors = [
      '#F93827', '#FF5733', '#FF9D23', '#80C4E9', '#4CC9FE',
      '#08C2FF', '#3b82f6', '#16C47F', '#2ECC71', '#8FD14F', '#FFFFFF'
    ];
    
    const {getAllByTestId} = render(<TagColorPicker {...defaultProps} />);
    const colorCircles = getAllByTestId('color-circle');
    
    colorCircles.forEach((circle, index) => {
      expect(circle.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            backgroundColor: expectedColors[index]
          })
        ])
      );
    });
  });

  it('changes selection when different color is pressed', () => {
    const setSelectedColor = jest.fn();
    const {getByTestId} = render(
      <TagColorPicker selectedColor="#FF5733" setSelectedColor={setSelectedColor} />
    );
    
    const newColorCircle = getByTestId('color-circle-#2ECC71');
    fireEvent.press(newColorCircle);
    
    expect(setSelectedColor).toHaveBeenCalledWith('#2ECC71');
  });
});