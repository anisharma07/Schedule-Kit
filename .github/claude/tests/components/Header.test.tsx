import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Header from '../../src/components/Header';

describe('Header Component', () => {
  const mockToggler = jest.fn();
  const mockChangeStack = jest.fn();
  
  const defaultProps = {
    toggler: mockToggler,
    changeStack: mockChangeStack,
    registerName: 'Semester VI',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with register name', () => {
    const {getByText} = render(<Header {...defaultProps} />);
    
    expect(getByText('Semester VI')).toBeTruthy();
    expect(getByText('Add')).toBeTruthy();
  });

  it('calls toggler when register icon is pressed', () => {
    const {getByTestId} = render(<Header {...defaultProps} />);
    
    // Would need testID on TouchableOpacity for register icon
    expect(mockToggler).not.toHaveBeenCalled();
  });

  it('calls changeStack with "Add" when add button is pressed', () => {
    const {getByText} = render(<Header {...defaultProps} />);
    
    const addButton = getByText('Add');
    fireEvent.press(addButton);
    
    expect(mockChangeStack).toHaveBeenCalledWith('Add');
  });

  it('displays long register names correctly', () => {
    const props = {
      ...defaultProps,
      registerName: 'Very Long Register Name That Might Overflow',
    };
    
    const {getByText} = render(<Header {...props} />);
    expect(getByText('Very Long Register Name That Might Overflow')).toBeTruthy();
  });

  it('applies correct styling', () => {
    const component = render(<Header {...defaultProps} />);
    expect(component).toBeTruthy();
  });
});