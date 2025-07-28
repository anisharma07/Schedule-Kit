import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {Alert} from 'react-native';
import CardMenu from '../../src/components/CardMenu';
import useStore from '../../src/store/store';

// Mock dependencies
jest.mock('../../src/store/store');
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  return {
    ...RN,
    Alert: {
      alert: jest.fn(),
    },
    Animated: {
      ...RN.Animated,
      Value: jest.fn(() => ({
        setValue: jest.fn(),
      })),
      spring: jest.fn(() => ({
        start: jest.fn(),
      })),
      timing: jest.fn(() => ({
        start: jest.fn(),
      })),
      parallel: jest.fn(() => ({
        start: jest.fn(),
      })),
    },
  };
});

const mockStore = {
  removeCard: jest.fn(),
  registers: {
    0: {
      cards: {
        1: {
          title: 'Mathematics',
        },
      },
    },
  },
  undoChanges: jest.fn(),
};

const mockNavigation = {
  navigate: jest.fn(),
};

const defaultProps = {
  isVisible: true,
  onClose: jest.fn(),
  RegisterId: 0,
  CardId: 1,
  navigation: mockNavigation,
  makeChange: jest.fn(),
};

describe('CardMenu Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useStore as jest.Mock).mockReturnValue(mockStore);
  });

  it('renders when visible', () => {
    const component = render(<CardMenu {...defaultProps} />);
    expect(component).toBeTruthy();
  });

  it('does not render when not visible', () => {
    const props = {
      ...defaultProps,
      isVisible: false,
    };
    
    const component = render(<CardMenu {...props} />);
    expect(component).toBeTruthy();
  });

  it('navigates to edit screen when edit is pressed', () => {
    const {getByText} = render(<CardMenu {...defaultProps} />);
    
    const editButton = getByText('Edit');
    fireEvent.press(editButton);
    
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Edit', {
      card_register: 0,
      card_id: 1,
    });
  });

  it('navigates to card details when view details is pressed', () => {
    const {getByText} = render(<CardMenu {...defaultProps} />);
    
    const viewDetailsButton = getByText('View Details');
    fireEvent.press(viewDetailsButton);
    
    expect(mockNavigation.navigate).toHaveBeenCalledWith('CardDetails', {
      card_register: 0,
      card_id: 1,
    });
  });

  it('shows delete confirmation when delete is pressed', () => {
    const {getByText} = render(<CardMenu {...defaultProps} />);
    
    const deleteButton = getByText('Delete');
    fireEvent.press(deleteButton);
    
    expect(Alert.alert).toHaveBeenCalledWith(
      'Delete Card',
      'Are you sure you want to delete Mathematics',
      expect.any(Array)
    );
  });

  it('calls undoChanges when undo is pressed', () => {
    const {getByText} = render(<CardMenu {...defaultProps} />);
    
    const undoButton = getByText('Undo Changes');
    fireEvent.press(undoButton);
    
    expect(mockStore.undoChanges).toHaveBeenCalledWith(0, 1);
    expect(defaultProps.makeChange).toHaveBeenCalled();
  });

  it('calls onClose when menu is closed', () => {
    const component = render(<CardMenu {...defaultProps} />);
    expect(component).toBeTruthy();
  });

  it('handles invalid register/card IDs', () => {
    const props = {
      ...defaultProps,
      RegisterId: -1,
      CardId: -1,
    };
    
    const component = render(<CardMenu {...props} />);
    expect(component).toBeTruthy();
  });
});