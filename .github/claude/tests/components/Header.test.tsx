import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Header from '../../src/components/Header';

const mockToggler = jest.fn();
const mockChangeStack = jest.fn();

const defaultProps = {
  toggler: mockToggler,
  changeStack: mockChangeStack,
  registerName: 'Test Register',
};

describe('Header Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with register name', () => {
    const { getByText } = render(<Header {...defaultProps} />);
    expect(getByText('Test Register')).toBeTruthy();
    expect(getByText('Add')).toBeTruthy();
  });

  it('calls toggler when register icon is pressed', () => {
    const { getByTestId } = render(<Header {...defaultProps} />);
    const registerIcon = getByTestId('register-toggle-button');
    
    fireEvent.press(registerIcon);
    
    expect(mockToggler).toHaveBeenCalledTimes(1);
  });

  it('calls changeStack with "Add" when add button is pressed', () => {
    const { getByText } = render(<Header {...defaultProps} />);
    const addButton = getByText('Add');
    
    fireEvent.press(addButton);
    
    expect(mockChangeStack).toHaveBeenCalledWith('Add');
  });

  it('handles long register names', () => {
    const longNameProps = {
      ...defaultProps,
      registerName: 'Very Long Register Name That Should Display Properly',
    };
    
    const { getByText } = render(<Header {...longNameProps} />);
    expect(getByText('Very Long Register Name That Should Display Properly')).toBeTruthy();
  });

  it('applies correct styles', () => {
    const { root } = render(<Header {...defaultProps} />);
    const headerView = root.findByProps({ testID: 'header-container' });
    
    expect(headerView.props.style).toEqual(
      expect.objectContaining({
        width: '100%',
        backgroundColor: '#18181B',
      })
    );
  });

  it('displays register icon with correct source', () => {
    const { root } = render(<Header {...defaultProps} />);
    const registerIcon = root.findByProps({ testID: 'register-icon' });
    
    expect(registerIcon.props.source).toBeDefined();
    expect(registerIcon.props.style).toEqual(
      expect.objectContaining({
        width: 42,
        height: 42,
      })
    );
  });

  it('matches snapshot', () => {
    const { toJSON } = render(<Header {...defaultProps} />);
    expect(toJSON()).toMatchSnapshot();
  });
});