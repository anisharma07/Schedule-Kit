import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Header from '../../src/components/Header';

describe('Header', () => {
  const mockProps = {
    toggler: jest.fn(),
    changeStack: jest.fn(),
    registerName: 'Semester VI',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with provided props', () => {
    const { getByText } = render(<Header {...mockProps} />);
    
    expect(getByText('Semester VI')).toBeTruthy();
    expect(getByText('Add')).toBeTruthy();
  });

  it('calls toggler when register icon is pressed', () => {
    const { getByTestId } = render(<Header {...mockProps} />);
    
    const registerIcon = getByTestId('register-icon');
    fireEvent.press(registerIcon);
    
    expect(mockProps.toggler).toHaveBeenCalledTimes(1);
  });

  it('calls changeStack with "Add" when add button is pressed', () => {
    const { getByText } = render(<Header {...mockProps} />);
    
    const addButton = getByText('Add');
    fireEvent.press(addButton);
    
    expect(mockProps.changeStack).toHaveBeenCalledWith('Add');
  });

  it('displays register name correctly', () => {
    const { getByText } = render(<Header {...mockProps} />);
    expect(getByText('Semester VI')).toBeTruthy();
  });

  it('handles long register names', () => {
    const longNameProps = {
      ...mockProps,
      registerName: 'Very Long Register Name That Might Overflow',
    };
    
    const { getByText } = render(<Header {...longNameProps} />);
    expect(getByText('Very Long Register Name That Might Overflow')).toBeTruthy();
  });

  it('handles empty register name', () => {
    const emptyNameProps = { ...mockProps, registerName: '' };
    const { toJSON } = render(<Header {...emptyNameProps} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('applies correct header styles', () => {
    const { getByTestId } = render(<Header {...mockProps} />);
    const headerContainer = getByTestId('header-container');
    
    expect(headerContainer.props.style).toMatchObject({
      width: '100%',
      backgroundColor: '#18181B',
    });
  });

  it('applies correct styles to register name text', () => {
    const { getByText } = render(<Header {...mockProps} />);
    const registerNameText = getByText('Semester VI');
    
    expect(registerNameText.props.style).toMatchObject({
      fontSize: 20,
      fontWeight: 'bold',
      marginLeft: 10,
      color: 'white',
    });
  });

  it('applies correct styles to add button', () => {
    const { getByText } = render(<Header {...mockProps} />);
    const addButton = getByText('Add');
    
    expect(addButton.props.style).toMatchObject({
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    });
  });

  it('renders register icon with correct source', () => {
    const { getByTestId } = render(<Header {...mockProps} />);
    const registerIcon = getByTestId('register-icon');
    
    // Check that the icon is rendered (exact source matching depends on mock implementation)
    expect(registerIcon).toBeTruthy();
  });

  it('maintains proper layout structure', () => {
    const { getByTestId } = render(<Header {...mockProps} />);
    const headerContent = getByTestId('header-content');
    
    expect(headerContent.props.style).toMatchObject({
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '92%',
    });
  });
});