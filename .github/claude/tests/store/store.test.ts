import AsyncStorage from '@react-native-async-storage/async-storage';
import { useStore } from '../../src/store/store';
import { act, renderHook } from '@testing-library/react-hooks';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

const mockCard = {
  id: 1,
  title: 'Mathematics',
  present: 15,
  total: 20,
  target_percentage: 75,
  tagColor: '#FF5733',
  markings: [],
  initial_present: 15,
  initial_total: 20,
  created_at: new Date().toISOString(),
};

describe('Store', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('initializes with default state', () => {
    const { result } = renderHook(() => useStore());
    
    expect(result.current.registers).toEqual({
      0: {
        name: 'Semester VI',
        cards: [],
        card_size: 'normal',
      },
    });
    expect(result.current.activeRegister).toBe(0);
    expect(result.current.defaultTargetPercentage).toBe(75);
  });

  it('adds a new register', () => {
    const { result } = renderHook(() => useStore());
    
    act(() => {
      result.current.addRegister(1, 'New Semester');
    });
    
    expect(result.current.registers[1]).toEqual({
      name: 'New Semester',
      cards: [],
      card_size: 'normal',
    });
  });

  it('renames a register', () => {
    const { result } = renderHook(() => useStore());
    
    act(() => {
      result.current.renameRegister(0, 'Updated Name');
    });
    
    expect(result.current.registers[0].name).toBe('Updated Name');
  });

  it('removes a register', () => {
    const { result } = renderHook(() => useStore());
    
    // Add a second register first
    act(() => {
      result.current.addRegister(1, 'Test Register');
    });
    
    // Remove the first register
    act(() => {
      result.current.removeRegister(0);
    });
    
    expect(result.current.registers[0]).toBeUndefined();
    expect(result.current.registers[1]).toBeDefined();
  });

  it('sets active register', () => {
    const { result } = renderHook(() => useStore());
    
    act(() => {
      result.current.addRegister(1, 'Test Register');
      result.current.setActiveRegister(1);
    });
    
    expect(result.current.activeRegister).toBe(1);
  });

  it('adds a card to a register', () => {
    const { result } = renderHook(() => useStore());
    
    act(() => {
      result.current.addCard(0, mockCard);
    });
    
    expect(result.current.registers[0].cards).toHaveLength(1);
    expect(result.current.registers[0].cards[0]).toEqual(mockCard);
  });

  it('removes a card from a register', () => {
    const { result } = renderHook(() => useStore());
    
    act(() => {
      result.current.addCard(0, mockCard);
      result.current.removeCard(0, 0);
    });
    
    expect(result.current.registers[0].cards).toHaveLength(0);
  });

  it('marks present for a card', () => {
    const { result } = renderHook(() => useStore());
    
    act(() => {
      result.current.addCard(0, mockCard);
      result.current.markPresent(0, 1);
    });
    
    const updatedCard = result.current.registers[0].cards[0];
    expect(updatedCard.present).toBe(16);
    expect(updatedCard.total).toBe(21);
    expect(updatedCard.markings).toHaveLength(1);
    expect(updatedCard.markings[0].status).toBe('present');
  });

  it('marks absent for a card', () => {
    const { result } = renderHook(() => useStore());
    
    act(() => {
      result.current.addCard(0, mockCard);
      result.current.markAbsent(0, 1);
    });
    
    const updatedCard = result.current.registers[0].cards[0];
    expect(updatedCard.present).toBe(15); // Should remain same
    expect(updatedCard.total).toBe(21); // Should increment
    expect(updatedCard.markings).toHaveLength(1);
    expect(updatedCard.markings[0].status).toBe('absent');
  });

  it('marks present with specific date', () => {
    const { result } = renderHook(() => useStore());
    const testDate = new Date('2024-01-15');
    
    act(() => {
      result.current.addCard(0, mockCard);
      result.current.markPresentWithDate(testDate, 1, 0);
    });
    
    const updatedCard = result.current.registers[0].cards[0];
    expect(updatedCard.markings[0].date).toBe(testDate.toISOString());
    expect(updatedCard.markings[0].status).toBe('present');
  });

  it('undoes changes for a card', () => {
    const { result } = renderHook(() => useStore());
    
    act(() => {
      result.current.addCard(0, mockCard);
      result.current.markPresent(0, 1);
      result.current.markAbsent(0, 1);
      result.current.undoChanges(0, 0);
    });
    
    const restoredCard = result.current.registers[0].cards[0];
    expect(restoredCard.present).toBe(mockCard.initial_present);
    expect(restoredCard.total).toBe(mockCard.initial_total);
    expect(restoredCard.markings).toHaveLength(0);
  });

  it('edits a card', () => {
    const { result } = renderHook(() => useStore());
    const updatedCard = { ...mockCard, title: 'Updated Mathematics' };
    
    act(() => {
      result.current.addCard(0, mockCard);
      result.current.editCard(0, updatedCard, 0);
    });
    
    expect(result.current.registers[0].cards[0].title).toBe('Updated Mathematics');
  });

  it('sets register card size', () => {
    const { result } = renderHook(() => useStore());
    
    act(() => {
      result.current.setRegisterCardSize(0, 'mini');
    });
    
    expect(result.current.registers[0].card_size).toBe('mini');
  });

  it('clears cards attendance', () => {
    const { result } = renderHook(() => useStore());
    
    act(() => {
      result.current.addCard(0, { ...mockCard, markings: [{ id: 1, date: new Date().toISOString(), status: 'present' }] });
      result.current.clearCardsAttendance(0);
    });
    
    const clearedCard = result.current.registers[0].cards[0];
    expect(clearedCard.present).toBe(mockCard.initial_present);
    expect(clearedCard.total).toBe(mockCard.initial_total);
    expect(clearedCard.markings).toHaveLength(0);
  });

  it('removes specific marking from a card', () => {
    const { result } = renderHook(() => useStore());
    
    act(() => {
      result.current.addCard(0, mockCard);
      result.current.markPresent(0, 1);
      result.current.markAbsent(0, 1);
    });
    
    let updatedCard = result.current.registers[0].cards[0];
    const markingToRemove = updatedCard.markings[0].id;
    
    act(() => {
      result.current.removeMarking(0, 0, markingToRemove);
    });
    
    updatedCard = result.current.registers[0].cards[0];
    expect(updatedCard.markings).toHaveLength(1);
  });

  it('updates the updatedAt timestamp', () => {
    const { result } = renderHook(() => useStore());
    const testDate = new Date('2024-01-15T10:30:00Z');
    
    act(() => {
      result.current.updateDate(testDate);
    });
    
    expect(result.current.updatedAt).toEqual(testDate);
  });

  it('changes copy register', () => {
    const { result } = renderHook(() => useStore());
    
    act(() => {
      result.current.changeCopyRegister(5);
    });
    
    expect(result.current.copyRegister).toBe(5);
  });
});