import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CardInterface} from '../types/cards';

interface Registers {
  [key: number]: {
    name: string;
    cards: CardInterface[];
    card_size: string;
  };
}

interface StoreState {
  registers: Registers;
  copyRegister: number;
  activeRegister: number;
  updatedAt: Date | null;
  defaultTargetPercentage: number;
  changeCopyRegister: (registerId: number) => void;
  setActiveRegister: (registerId: number) => void;
  addRegister: (registerId: number, registerName: string) => void;
  renameRegister: (registerId: number, registerName: string) => void;
  removeRegister: (registerId: number) => void;
  addCard: (registerId: number, cardData: CardInterface) => void;
  markPresent: (registerId: number, cardId: number) => void;
  markAbsent: (registerId: number, id: number) => void;
  undoChanges: (
    registerId: number,
    cardId: number,
    present: number,
    total: number,
  ) => void;
  editCard: (registerId: number, card: CardInterface, cardId: number) => void;
  setRegisterCardSize: (registerId: number, inputSize: string) => void;
  removeCard: (registerId: number, cardIndex: number) => void;
}

export const useStore = create<StoreState>()(
  persist(
    set => ({
      registers: {
        0: {
          name: 'Reg 1',
          cards: [],
          card_size: 'small',
        },
      },
      activeRegister: 0,
      copyRegister: 0,
      updatedAt: null,
      defaultTargetPercentage: 75,

      changeCopyRegister: (registerId: number) =>
        set(() => ({
          copyRegister: registerId,
        })),

      setActiveRegister: (registerId: number) =>
        set(() => ({
          activeRegister: registerId,
        })),
      // updateDate: (date: Date) =>
      //   set(() => ({
      //     updatedAt: date,
      //   })),
      addRegister: (registerId: number, registerName: string) =>
        set(state => ({
          registers: {
            ...state.registers,
            [registerId]: {
              name: registerName,
              cards: [],
              card_size: 'normal',
            },
          },
        })),

      renameRegister: (registerId: number, registerName: string) =>
        set(state => ({
          registers: {
            ...state.registers,
            [registerId]: {
              ...state.registers[registerId],
              name: registerName,
            },
          },
        })),

      clearCardsAttendance: (registerId: number) =>
        set(state => ({
          registers: {
            ...state.registers,
            [registerId]: {
              ...state.registers[registerId],
              cards: state.registers[registerId].cards.map(card => ({
                ...card,
                present: 0,
                total: 0,
              })),
            },
          },
        })),

      removeRegister: (registerId: number) =>
        set(state => {
          const registers = {...state.registers};
          const newActiveRegister =
            state.activeRegister === registerId ? 0 : state.activeRegister;
          delete registers[registerId];
          return {
            registers,
            activeRegister: newActiveRegister,
          };
        }),

      addCard: (registerId: number, cardData: CardInterface) =>
        set(state => ({
          registers: {
            ...state.registers,
            [registerId]: {
              ...state.registers[registerId],
              cards: [...(state.registers[registerId].cards || []), cardData],
            },
          },
          updatedAt: new Date(),
        })),
      markPresent: (registerId: number, cardId: number) =>
        set(state => ({
          registers: {
            ...state.registers,
            [registerId]: {
              ...state.registers[registerId],
              cards: state.registers[registerId].cards.map(card =>
                card.id === cardId
                  ? {...card, present: card.present + 1, total: card.total + 1}
                  : card,
              ),
            },
          },
        })),

      markAbsent: (registerId: number, cardId: number) =>
        set(state => ({
          registers: {
            ...state.registers,
            [registerId]: {
              ...state.registers[registerId],
              cards: state.registers[registerId].cards.map(card =>
                card.id === cardId ? {...card, total: card.total + 1} : card,
              ),
            },
          },
        })),

      undoChanges: (
        registerId: number,
        cardId: number,
        present: number,
        absent: number,
      ) =>
        set(state => ({
          registers: {
            ...state.registers,
            [registerId]: {
              ...state.registers[registerId],
              cards: state.registers[registerId].cards.map(card =>
                card.id === cardId
                  ? {
                      ...card,
                      present: card.present - present,
                      total: card.total - present - absent,
                    }
                  : card,
              ),
            },
          },
        })),
      editCard: (registerId: number, card: CardInterface, cardId: number) =>
        set(state => ({
          registers: {
            ...state.registers,
            [registerId]: {
              ...state.registers[registerId],
              cards: state.registers[registerId].cards.map(curr =>
                curr.id === cardId ? card : curr,
              ),
            },
          },
        })),

      setRegisterCardSize: (registerId: number, inputSize: string) =>
        set(state => ({
          registers: {
            ...state.registers,
            [registerId]: {
              ...state.registers[registerId],
              card_size: inputSize,
            },
          },
          updatedAt: new Date(),
        })),

      removeCard: (registerId: number, cardIndex: number) =>
        set(state => ({
          registers: {
            ...state.registers,
            [registerId]: {
              ...state.registers[registerId],
              cards: state.registers[registerId].cards.filter(
                (_, index) => index !== cardIndex,
              ),
            },
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
