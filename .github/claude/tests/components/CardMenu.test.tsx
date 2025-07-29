import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import CardMenu from '../../src/components/CardMenu';
import useStore from '../../src/store/store';

jest.mock('../../src/store/store');
const mockUseStore = useStore as jest.MockedFunction<typeof useStore>;

// Mock Alert
jest.spyOn(Alert, 'alert');

describe('CardMenu', () => {
  const mockNavigation = {
    navigate: jest.fn(),
  };

  const mockProps = {
    isVisible: true,
    onClose: jest.fn(),
    RegisterId: 0,
    CardId: 1,
    navigation: mockNavigation,
    makeChange: jest.fn(),
  };

  const mockStore = {
    removeCard: jest.fn(),
    registers: {
      0: {
        cards: {
          1: { title: 'Mathematics' },
        },
      },
    },
    undoChanges: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseStore.mockReturnValue(mockStore as any);
  });

  it('renders correctly when visible', () => {
    const { getByText } = render(<CardMenu {...mockProps} />);
    
    expect(getByText('Edit')).toBeTruthy();
    expect(getByText('View Details')).toBeTruthy();
    expect(getByText('Undo Changes')).toBeTruthy();
    expect(getByText('Delete')).toBeTruthy();
  });

  it('does not render when not visible', () => {
    const hiddenProps = { ...mockProps, isVisible: false };
    const { queryByText } = render(<CardMenu {...hiddenProps} />);
    
    expect(queryByText('Edit')).toBeFalsy();
    expect(queryByText('View Details')).toBeFalsy();
  });

  it('calls navigation.navigate when Edit is pressed', () => {
    const { getByText } = render(<CardMenu {...mockProps} />);
    
    const editButton = getByText('Edit');
    fireEvent.press(editButton);
    
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Edit', {
      card_register: 0,
      card_id: 1,
    });
    expect(mockProps.onClose).toHaveBeenCalled();
  });

  it('calls navigation.navigate when View Details is pressed', () => {
    const { getByText } = render(<CardMenu {...mockProps} />);
    
    const viewDetailsButton = getByText('View Details');
    fireEvent.press(viewDetailsButton);
    
    expect(mockNavigation.navigate).toHaveBeenCalledWith('CardDetails', {
      card_register: 0,
      card_id: 1,
    });
    expect(mockProps.onClose).toHaveBeenCalled();
  });

  it('calls undoChanges when Undo Changes is pressed', () => {
    const { getByText } = render(<CardMenu {...mockProps} />);
    
    const undoButton = getByText('Undo Changes');
    fireEvent.press(undoButton);
    
    expect(mockStore.undoChanges).toHaveBeenCalledWith(0, 1);
    expect(mockProps.makeChange).toHaveBeenCalled();
  });

  it('shows alert when Delete is pressed', () => {
    const { getByText } = render(<CardMenu {...mockProps} />);
    
    const deleteButton = getByText('Delete');
    fireEvent.press(deleteButton);
    
    expect(Alert.alert).toHaveBeenCalledWith(
      'Delete Card',
      'Are you sure you want to delete Mathematics',
      expect.any(Array)
    );
  });

  it('calls removeCard when delete is confirmed', async () => {
    // Mock Alert.alert to simulate user confirming deletion
    (Alert.alert as jest.Mock).mockImplementation((title, message, buttons) => {
      // Simulate pressing the "Delete" button
      buttons[1].onPress();
    });

    const { getByText } = render(<CardMenu {...mockProps} />);
    
    const deleteButton = getByText('Delete');
    fireEvent.press(deleteButton);
    
    await waitFor(() => {
      expect(mockStore.removeCard).toHaveBeenCalledWith(0, 1);
      expect(mockProps.onClose).toHaveBeenCalled();
    });
  });

  it('closes menu when overlay is pressed', () => {
    const { getByTestId } = render(<CardMenu {...mockProps} />);
    
    const overlay = getByTestId('menu-overlay');
    fireEvent.press(overlay);
    
    expect(mockProps.onClose).toHaveBeenCalled();
  });

  it('handles invalid RegisterId and CardId gracefully', () => {
    const invalidProps = { ...mockProps, RegisterId: -1, CardId: -1 };
    const { toJSON } = render(<CardMenu {...invalidProps} />);
    
    expect(toJSON()).toMatchSnapshot();
  });

  it('displays correct card name in delete confirmation', () => {
    const storeWithDifferentCard = {
      ...mockStore,
      registers: {
        0: {
          cards: {
            1: { title: 'Physics Lab' },
          },
        },
      },
    };
    
    mockUseStore.mockReturnValue(storeWithDifferentCard as any);
    
    const { getByText } = render(<CardMenu {...mockProps} />);
    
    const deleteButton = getByText('Delete');
    fireEvent.press(deleteButton);
    
    expect(Alert.alert).toHaveBeenCalledWith(
      'Delete Card',
      'Are you sure you want to delete Physics Lab',
      expect.any(Array)
    );
  });

  it('handles missing card data gracefully', () => {
    const storeWithMissingCard = {
      ...mockStore,
      registers: {
        0: {
          cards: {},
        },
      },
    };
    
    mockUseStore.mockReturnValue(storeWithMissingCard as any);
    
    const { toJSON } = render(<CardMenu {...mockProps} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('animates menu appearance correctly', async () => {
    const { getByTestId } = render(<CardMenu {...mockProps} />);
    
    const menuContainer = getByTestId('menu-container');
    expect(menuContainer).toBeTruthy();
    
    // Animation testing would require more sophisticated mocking of Animated
    // For now, we just ensure the menu renders
  });
});