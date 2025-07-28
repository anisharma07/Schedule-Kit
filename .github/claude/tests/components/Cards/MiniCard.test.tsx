import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import MiniCard from '../../../src/components/Cards/MiniCard';
import useStore from '../../../src/store/store';

jest.mock('../../../src/store/store');

const mockStore = useStore as jest.MockedFunction<typeof useStore>;

describe('MiniCard', () => {
  const defaultProps = {
    id: 1,
    title: 'Mathematics',
    present: 15,
    total: 20,
    target_percentage: 75,
    tagColor: '#FF5733',
    cardRegister: 0,
    handleMenuOpen: jest.fn(),
  };

  const mockUseStore = {
    markPresent: jest.fn(),
    markAbsent: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockStore.mockReturnValue(mockUseStore);
  });

  it('renders correctly with basic props', () => {
    const {getByText} = render(<MiniCard {...defaultProps} />);
    expect(getByText('Mathema..')).toBeTruthy(); // Truncated title
    expect(getByText('15/20')).toBeTruthy();
  });

  it('truncates long titles correctly', () => {
    const longTitle = 'VeryLongSubjectName';
    const {getByText} = render(<MiniCard {...defaultProps} title={longTitle} />);
    expect(getByText('VeryLong..')).toBeTruthy();
  });

  it('displays short titles without truncation', () => {
    const shortTitle = 'Math';
    const {getByText} = render(<MiniCard {...defaultProps} title={shortTitle} />);
    expect(getByText('Math')).toBeTruthy();
  });

  it('displays correct percentage', async () => {
    const {getByText} = render(<MiniCard {...defaultProps} />);
    await waitFor(() => {
      expect(getByText('75.0%')).toBeTruthy();
    });
  });

  it('handles mark present button press', () => {
    const {getByTestId} = render(<MiniCard {...defaultProps} />);
    const presentButton = getByTestId('mini-present-button');
    
    fireEvent.press(presentButton);
    
    expect(mockUseStore.markPresent).toHaveBeenCalledWith(0, 1);
  });

  it('handles mark absent button press', () => {
    const {getByTestId} = render(<MiniCard {...defaultProps} />);
    const absentButton = getByTestId('mini-absent-button');
    
    fireEvent.press(absentButton);
    
    expect(mockUseStore.markAbsent).toHaveBeenCalledWith(0, 1);
  });

  it('handles menu button press', () => {
    const handleMenuOpen = jest.fn();
    const {getByTestId} = render(
      <MiniCard {...defaultProps} handleMenuOpen={handleMenuOpen} />
    );
    
    const menuButton = getByTestId('mini-menu-button');
    fireEvent.press(menuButton);
    
    expect(handleMenuOpen).toHaveBeenCalledWith(0, 1);
  });

  it('updates percentage when present/total changes', async () => {
    const {rerender, getByText} = render(<MiniCard {...defaultProps} />);
    
    rerender(<MiniCard {...defaultProps} present={18} total={22} />);
    
    await waitFor(() => {
      expect(getByText('18/22')).toBeTruthy();
    });
  });

  it('sets correct card color based on percentage', async () => {
    const {getByTestId} = render(<MiniCard {...defaultProps} present={10} total={20} />);
    
    await waitFor(() => {
      const cardContainer = getByTestId('mini-card-container');
      expect(cardContainer.props.style).toEqual(
        expect.objectContaining({backgroundColor: '#892B2B'}) // Below target
      );
    });
  });
});