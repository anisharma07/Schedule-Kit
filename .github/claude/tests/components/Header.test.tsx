import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Header from '../../src/components/Header';

describe('Header', () => {
  const defaultProps = {
    toggler: jest.fn(),
    changeStack: jest.fn(),
    registerName: 'Semester VI',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    const {getByText} = render(<Header {...defaultProps} />);
    expect(getByText('Semester VI')).toBeTruthy();
    expect(getByText('Add')).toBeTruthy();
  });

  it('displays register name correctly', () => {
    const customRegisterName = 'Custom Register';
    const {getByText} = render(
      <Header {...defaultProps} registerName={customRegisterName} />
    );
    expect(getByText(customRegisterName)).toBeTruthy();
  });

  it('handles register icon press', () => {
    const toggler = jest.fn();
    const {getByTestId} = render(
      <Header {...defaultProps} toggler={toggler} />
    );
    
    const registerIcon = getByTestId('register-icon');
    fireEvent.press(registerIcon);
    
    expect(toggler).toHaveBeenCalledTimes(1);
  });

  it('handles add button press', () => {
    const changeStack = jest.fn();
    const {getByText} = render(
      <Header {...defaultProps} changeStack={changeStack} />
    );
    
    const addButton = getByText('Add');
    fireEvent.press(addButton);
    
    expect(changeStack).toHaveBeenCalledWith('Add');
  });

  it('has correct styling', () => {
    const {getByTestId} = render(<Header {...defaultProps} />);
    const header = getByTestId('header');
    
    expect(header.props.style).toEqual(
      expect.objectContaining({
        width: '100%',
        backgroundColor: '#18181B',
      })
    );
  });

  it('renders register icon with correct source', () => {
    const {getByTestId} = render(<Header {...defaultProps} />);
    const registerIcon = getByTestId('register-icon');
    
    expect(registerIcon.props.source).toBeDefined();
  });

  it('renders add button with correct styling', () => {
    const {getByTestId} = render(<Header {...defaultProps} />);
    const addButton = getByTestId('add-button');
    
    expect(addButton.props.style).toEqual(
      expect.objectContaining({
        backgroundColor: '#27272A',
        borderRadius: 10,
      })
    );
  });

  it('handles long register names', () => {
    const longRegisterName = 'This is a very long register name that might overflow';
    const {getByText} = render(
      <Header {...defaultProps} registerName={longRegisterName} />
    );
    
    expect(getByText(longRegisterName)).toBeTruthy();
  });
});