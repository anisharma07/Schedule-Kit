import {renderHook, act} from '@testing-library/react-hooks';
import useStore from '../../src/store/store';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

// Mock zustand persist
jest.mock('zustand/middleware', () => ({
  persist: (fn: any) => fn,
  createJSONStorage: () => ({
    getItem: AsyncStorage.getItem,
    setItem: AsyncStorage.setItem,
    removeItem: AsyncStorage.removeItem,
  }),
}));

describe('Store', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('initializes with default state', () => {
    const {result} = renderHook(() => useStore());

    expect(result.current.activeRegister).toBe(0);
    expect(result.current.copyRegister).toBe(0);
    expect(result.current.defaultTargetPercentage).toBe(75);
    expect(result.current.registers[0].name).toBe('Semester VI');
    expect(result.current.registers[0].cards).toEqual([]);
  });

  it('sets active register', () => {
    const {result} = renderHook(() => useStore());

    act(() => {
      result.current.setActiveRegister(1);
    });

    expect(result.current.activeRegister).toBe(1);
  });

  it('adds new register', () => {
    const {result} = renderHook(() => useStore());

    act(() => {
      result.current.addRegister(1, 'New Register');
    });

    expect(result.current.registers[1]).toEqual({
      name: 'New Register',
      cards: [],
      card_size: 'normal',
    });
  });

  it('renames register', () => {
    const {result} = renderHook(() => useStore());

    act(() => {
      result.current.renameRegister(0, 'Renamed Register');
    });

    expect(result.current.registers[0].name).toBe('Renamed Register');
  });

  it('removes register', () => {
    const {result} = renderHook(() => useStore());

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

  it('adds card to register', () => {
    const {result} = renderHook(() => useStore());

    const testCard = {
      id: 1,
      title: 'Mathematics',
      present: 0,
      total: 0,
      target_percentage: 75,
      tagColor: '#FF5733',
      hasLimit: false,
      limitFreq: 0,
      limitType: 'daily',
      markings: [],
      backup_present: 0,
      backup_total: 0,
      backup_markings: [],
    };

    act(() => {
      result.current.addCard(0, testCard);
    });

    expect(result.current.registers[0].cards).toHaveLength(1);
    expect(result.current.registers[0].cards[0]).toEqual(testCard);
  });

  it('marks student present', () => {
    const {result} = renderHook(() => useStore());

    const testCard = {
      id: 0,
      title: 'Mathematics',
      present: 5,
      total: 10,
      target_percentage: 75,
      tagColor: '#FF5733',
      hasLimit: false,
      limitFreq: 0,
      limitType: 'daily',
      markings: [],
      backup_present: 5,
      backup_total: 10,
      backup_markings: [],
    };

    // Add card first
    act(() => {
      result.current.addCard(0, testCard);
    });

    // Mark present
    act(() => {
      result.current.markPresent(0, 0);
    });

    const updatedCard = result.current.registers[0].cards[0];
    expect(updatedCard.present).toBe(6);
    expect(updatedCard.total).toBe(11);
    expect(updatedCard.markings).toHaveLength(1);
    expect(updatedCard.markings[0].type).toBe('present');
  });

  it('marks student absent', () => {
    const {result} = renderHook(() => useStore());

    const testCard = {
      id: 0,
      title: 'Mathematics',
      present: 5,
      total: 10,
      target_percentage: 75,
      tagColor: '#FF5733',
      hasLimit: false,
      limitFreq: 0,
      limitType: 'daily',
      markings: [],
      backup_present: 5,
      backup_total: 10,
      backup_markings: [],
    };

    // Add card first
    act(() => {
      result.current.addCard(0, testCard);
    });

    // Mark absent
    act(() => {
      result.current.markAbsent(0, 0);
    });

    const updatedCard = result.current.registers[0].cards[0];
    expect(updatedCard.present).toBe(5); // Should not change
    expect(updatedCard.total).toBe(11); // Should increase
    expect(updatedCard.markings).toHaveLength(1);
    expect(updatedCard.markings[0].type).toBe('absent');
  });

  it('undoes changes', () => {
    const {result} = renderHook(() => useStore());

    const testCard = {
      id: 0,
      title: 'Mathematics',
      present: 5,
      total: 10,
      target_percentage: 75,
      tagColor: '#FF5733',
      hasLimit: false,
      limitFreq: 0,
      limitType: 'daily',
      markings: [],
      backup_present: 3,
      backup_total: 8,
      backup_markings: [],
    };

    // Add card and make changes
    act(() => {
      result.current.addCard(0, testCard);
      result.current.markPresent(0, 0);
    });

    // Undo changes
    act(() => {
      result.current.undoChanges(0, 0);
    });

    const updatedCard = result.current.registers[0].cards[0];
    expect(updatedCard.present).toBe(3);
    expect(updatedCard.total).toBe(8);
    expect(updatedCard.markings).toEqual([]);
  });

  it('removes card from register', () => {
    const {result} = renderHook(() => useStore());

    const testCard = {
      id: 0,
      title: 'Mathematics',
      present: 5,
      total: 10,
      target_percentage: 75,
      tagColor: '#FF5733',
      hasLimit: false,
      limitFreq: 0,
      limitType: 'daily',
      markings: [],
      backup_present: 5,
      backup_total: 10,
      backup_markings: [],
    };

    // Add card first
    act(() => {
      result.current.addCard(0, testCard);
    });

    expect(result.current.registers[0].cards).toHaveLength(1);

    // Remove card
    act(() => {
      result.current.removeCard(0, 0);
    });

    expect(result.current.registers[0].cards).toHaveLength(0);
  });

  it('clears cards attendance', () => {
    const {result} = renderHook(() => useStore());

    const testCard = {
      id: 0,
      title: 'Mathematics',
      present: 5,
      total: 10,
      target_percentage: 75,
      tagColor: '#FF5733',
      hasLimit: false,
      limitFreq: 0,
      limitType: 'daily',
      markings: [{id: 1, date: new Date().toISOString(), type: 'present' as const}],
      backup_present: 5,
      backup_total: 10,
      backup_markings: [],
    };

    // Add card first
    act(() => {
      result.current.addCard(0, testCard);
    });

    // Clear attendance
    act(() => {
      result.current.clearCardsAttendance(0);
    });

    const updatedCard = result.current.registers[0].cards[0];
    expect(updatedCard.present).toBe(0);
    expect(updatedCard.total).toBe(0);
    expect(updatedCard.markings).toEqual([]);
  });

  it('sets register card size', () => {
    const {result} = renderHook(() => useStore());

    act(() => {
      result.current.setRegisterCardSize(0, 'mini');
    });

    expect(result.current.registers[0].card_size).toBe('mini');
  });

  it('updates date', () => {
    const {result} = renderHook(() => useStore());
    const testDate = new Date('2023-12-25');

    act(() => {
      result.current.updateDate(testDate);
    });

    expect(result.current.updatedAt).toEqual(testDate);
  });
});