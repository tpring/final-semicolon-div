import { create } from 'zustand';

type LoginAlertType = {
  modal: boolean;
  isOpen: () => void;
  onClose: () => void;
};

export const useLoginAlertStore = create<LoginAlertType>((set) => ({
  modal: false,
  isOpen: () => set({ modal: true }),
  onClose: () => set({ modal: false })
}));
