import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Days {
  mon: string[];
  tue: string[];
  wed: string[];
  thu: string[];
  fri: string[];
  sat: string[];
  sun: string[];
}

interface Card {
  id: string;
  title: string;
  present: number;
  total: number;
  target_percentage: number;
  tagColor: string;
  days: Days;
}

interface Registers {
  [key: string]: Card[];
}

interface StoreState {
  registers: Registers;
  activeRegister: string | null;
  setActiveRegister: (registerName: string) => void;
  addRegister: (registerName: string) => void;
  addCard: (registerName: string, cardData: Card) => void;
  removeCard: (registerName: string, cardIndex: number) => void;
}

const useStore = create<StoreState>()(
  persist(
    set => ({
      registers: {
        default: [],
      },
      activeRegister: 'default',

      setActiveRegister: (registerName: string) =>
        set(() => ({
          activeRegister: registerName,
        })),

      addRegister: (registerName: string) =>
        set(state => ({
          registers: {
            ...state.registers,
            [registerName]: [],
          },
        })),

      addCard: (registerName: string, cardData: Card) =>
        set(state => ({
          registers: {
            ...state.registers,
            [registerName]: [
              ...(state.registers[registerName] || []),
              cardData,
            ],
          },
        })),

      removeCard: (registerName: string, cardIndex: number) =>
        set(state => ({
          registers: {
            ...state.registers,
            [registerName]: state.registers[registerName].filter(
              (_, index) => index !== cardIndex,
            ),
          },
        })),
    }),
    {
      name: 'registers-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useStore;
