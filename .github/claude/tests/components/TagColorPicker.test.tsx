import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TagColorPicker from '../../src/components/TagColorPicker';

describe('TagColorPicker', () => {
  const mockProps = {
    selectedColor: '#F93827',
    setSelectedColor: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with provided props', () => {
    const { toJSON } = render(<TagColorPicker {...mockProps} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders all color options', () => {
    const { getAllByTestId } = render(<TagColorPicker {...mockProps} />);
    const colorCircles = getAllByTestId('color-circle');
    
    // Should render 11 color options
    expect(colorCircles).toHaveLength(11);
  });

  it('highlights selected color correctly', () => {
    const { getAllByTestId } = render(<TagColorPicker {...mockProps} />);
    const colorCircles = getAllByTestId('color-circle');
    
    // Find the selected color circle
    const selectedCircle = colorCircles.find(circle => 
      circle.props.style.backgroundColor === '#F93827'
    );
    
    expect(selectedCircle).toBeTruthy();
    expect(selectedCircle?.props.style).toMatchObject({
      borderColor: '#868686',
      borderWidth: 3,
    });
  });

  it('calls setSelectedColor when a color is pressed', () => {
    const { getAllByTestId } = render(<TagColorPicker {...mockProps} />);
    const colorCircles = getAllByTestId('color-circle');
    
    fireEvent.press(colorCircles[1]); // Press second color
    expect(mockProps.setSelectedColor).toHaveBeenCalled();
  });

  it('handles color selection correctly', () => {
    const { getAllByTestId } = render(<TagColorPicker {...mockProps} />);
    const colorCircles = getAllByTestId('color-circle');
    
    // Press a different color
    const blueCircle = colorCircles.find(circle => 
      circle.props.style.backgroundColor === '#3b82f6'
    );
    
    if (blueCircle) {
      fireEvent.press(blueCircle);
      expect(mockProps.setSelectedColor).toHaveBeenCalledWith('#3b82f6');
    }
  });

  it('displays all expected colors', () => {
    const expectedColors = [
      '#F93827',
      '#FF5733',
      '#FF9D23',
      '#80C4E9',
      '#4CC9FE',
      '#08C2FF',
      '#3b82f6',
      '#16C47F',
      '#2ECC71',
      '#8FD14F',
      '#FFFFFF',
    ];

    const { getAllByTestId } = render(<TagColorPicker {...mockProps} />);
    const colorCircles = getAllByTestId('color-circle');
    
    expectedColors.forEach(color => {
      const colorCircle = colorCircles.find(circle => 
        circle.props.style.backgroundColor === color
      );
      expect(colorCircle).toBeTruthy();
    });
  });

  it('changes selected color when different color is picked', () => {
    const { rerender, getAllByTestId } = render(<TagColorPicker {...mockProps} />);
    
    // Change selected color
    const newProps = { ...mockProps, selectedColor: '#16C47F' };
    rerender(<TagColorPicker {...newProps} />);
    
    const colorCircles = getAllByTestId('color-circle');
    const newSelectedCircle = colorCircles.find(circle => 
      circle.props.style.backgroundColor === '#16C47F'
    );
    
    expect(newSelectedCircle?.props.style).toMatchObject({
      borderColor: '#868686',
      borderWidth: 3,
    });
  });

  it('applies correct styles to color circles', () => {
    const { getAllByTestId } = render(<TagColorPicker {...mockProps} />);
    const colorCircles = getAllByTestId('color-circle');
    
    colorCircles.forEach(circle => {
      expect(circle.props.style).toMatchObject({
        width: 40,
        height: 40,
        borderRadius: 20,
        margin: 10,
      });
    });
  });

  it('handles white color selection correctly', () => {
    const { getAllByTestId } = render(<TagColorPicker {...mockProps} />);
    const colorCircles = getAllByTestId('color-circle');
    
    const whiteCircle = colorCircles.find(circle => 
      circle.props.style.backgroundColor === '#FFFFFF'
    );
    
    expect(whiteCircle).toBeTruthy();
    
    if (whiteCircle) {
      fireEvent.press(whiteCircle);
      expect(mockProps.setSelectedColor).toHaveBeenCalledWith('#FFFFFF');
    }
  });
});