import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {Alert} from 'react-native';
import CardMenu from '../../src/components/CardMenu';
import useStore from '../../src/store/store';

jest.mock('../../src/store/store');
jest.mock('react-native', () => ({
  ...jest.requireActual('react-native'),
  Alert: {
    alert: jest.fn(),
  },
}));

const mockStore = useStore as jest.MockedFunction<typeof useStore>;

describe('CardMenu', () => {
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

  const mockUseStore = {
    removeCard: jest.fn(),
    undoChanges: jest.fn(),
    registers: {
      0: {
        cards: {
          1: {
            title: 'Mathematics',
          },
        },
      },
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockStore.mockReturnValue(mockUseStore);
  });

  it('renders correctly when visible', () => {
    const {getByText} = render(<CardMenu {...defaultProps} />);
    expect(getByText('Edit')).toBeTruthy();
    expect(getByText('View Details')).toBeTruthy();
    expect(getByText('Undo Changes')).toBeTruthy();
    expect(getByText('Remove')).toBeTruthy();
  });

  it('does not render when not visible', () => {
    const {queryByText} = render(
      <CardMenu {...defaultProps} isVisible={false} />
    );
    expect(queryByText('Edit')).toBeNull();
  });

  it('handles edit button press', () => {
    const {getByText} = render(<CardMenu {...defaultProps} />);
    const editButton = getByText('Edit');
    
    fireEvent.press(editButton);
    
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Edit', {
      card_register: 0,
      card_id: 1,
    });
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('handles view details button press', () => {
    const {getByText} = render(<CardMenu {...defaultProps} />);
    const viewDetailsButton = getByText('View Details');
    
    fireEvent.press(viewDetailsButton);
    
    expect(mockNavigation.navigate).toHaveBeenCalledWith('CardDetails', {
      card_register: 0,
      card_id: 1,
    });
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('handles undo changes button press', () => {
    const {getByText} = render(<CardMenu {...defaultProps} />);
    const undoButton = getByText('Undo Changes');
    
    fireEvent.press(undoButton);
    
    expect(mockUseStore.undoChanges).toHaveBeenCalledWith(0, 1);
    expect(defaultProps.makeChange).toHaveBeenCalled();
  });

  it('handles remove button press with confirmation', async () => {
    const {getByText} = render(<CardMenu {...defaultProps} />);
    const removeButton = getByText('Remove');
    
    fireEvent.press(removeButton);
    
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        'Delete Card',
        'Are you sure you want to delete Mathematics',
        expect.any(Array)
      );
    });
  });

  it('handles remove confirmation', async () => {
    const {getByText} = render(<CardMenu {...defaultProps} />);
    const removeButton = getByText('Remove');
    
    fireEvent.press(removeButton);
    
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalled();
    });

    // Simulate pressing "Delete" in alert
    const alertCall = (Alert.alert as jest.Mock).mock.calls[0];
    const deleteCallback = alertCall[2][1].onPress;
    deleteCallback();
    
    expect(mockUseStore.removeCard).toHaveBeenCalledWith(0, 1);
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('handles overlay press to close', () => {
    const {getByTestId} = render(<CardMenu {...defaultProps} />);
    const overlay = getByTestId('menu-overlay');
    
    fireEvent.press(overlay);
    
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('sets card name from store', async () => {
    const {getByText} = render(<CardMenu {...defaultProps} />);
    
    await waitFor(() => {
      expect(getByText('Mathematics')).toBeTruthy();
    });
  });

  it('handles invalid register or card id', () => {
    const {queryByText} = render(
      <CardMenu {...defaultProps} RegisterId={-1} CardId={-1} />
    );
    
    // Should still render menu options
    expect(queryByText('Edit')).toBeTruthy();
    expect(queryByText('Remove')).toBeTruthy();
  });
});