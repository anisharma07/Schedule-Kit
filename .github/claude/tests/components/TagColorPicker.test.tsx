import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TagColorPicker from '../../src/components/TagColorPicker';

const mockSetSelectedColor = jest.fn();

const defaultProps = {
  selectedColor: '#F93827',
  setSelectedColor: mockSetSelectedColor,
};

describe('TagColorPicker Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all color options', () => {
    const { root } = render(<TagColorPicker {...defaultProps} />);
    const touchableOpacities = root.findAllByType('TouchableOpacity');
    
    // Should render 11 color options
    expect(touchableOpacities).toHaveLength(11);
  });

  it('highlights the selected color', () => {
    const { root } = render(<TagColorPicker {...defaultProps} />);
    const touchableOpacities = root.findAllByType('TouchableOpacity');
    
    const selectedColorButton = touchableOpacities.find(button => 
      button.props.style[0].backgroundColor === '#F93827'
    );
    
    expect(selectedColorButton.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          borderColor: '#868686',
          borderWidth: 3,
        })
      ])
    );
  });

  it('calls setSelectedColor when a color is pressed', () => {
    const { root } = render(<TagColorPicker {...defaultProps} />);
    const touchableOpacities = root.findAllByType('TouchableOpacity');
    
    // Press the second color option
    fireEvent.press(touchableOpacities[1]);
    
    expect(mockSetSelectedColor).toHaveBeenCalledWith('#FF5733');
  });

  it('renders correct color values', () => {
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

    const { root } = render(<TagColorPicker {...defaultProps} />);
    const touchableOpacities = root.findAllByType('TouchableOpacity');
    
    touchableOpacities.forEach((button, index) => {
      expect(button.props.style[0].backgroundColor).toBe(expectedColors[index]);
    });
  });

  it('updates selection when different color is chosen', () => {
    const { root, rerender } = render(<TagColorPicker {...defaultProps} />);
    
    // Select a different color
    const newProps = { ...defaultProps, selectedColor: '#2ECC71' };
    rerender(<TagColorPicker {...newProps} />);
    
    const touchableOpacities = root.findAllByType('TouchableOpacity');
    const newSelectedButton = touchableOpacities.find(button => 
      button.props.style[0].backgroundColor === '#2ECC71'
    );
    
    expect(newSelectedButton.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          borderColor: '#868686',
          borderWidth: 3,
        })
      ])
    );
  });

  it('applies correct base styles to color circles', () => {
    const { root } = render(<TagColorPicker {...defaultProps} />);
    const touchableOpacities = root.findAllByType('TouchableOpacity');
    
    touchableOpacities.forEach(button => {
      expect(button.props.style[0]).toEqual(
        expect.objectContaining({
          width: 40,
          height: 40,
          borderRadius: 20,
          margin: 10,
        })
      );
    });
  });

  it('matches snapshot', () => {
    const { toJSON } = render(<TagColorPicker {...defaultProps} />);
    expect(toJSON()).toMatchSnapshot();
  });
});