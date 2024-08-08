import { create } from 'zustand';

type LoginAlertType = {
  loginAlertModal: boolean;
  isOpen: () => void;
  onClose: () => void;
};

export const useLoginAlertStore = create<LoginAlertType>((set) => ({
  loginAlertModal: false,
  isOpen: () => set({ loginAlertModal: true }),
  onClose: () => set({ loginAlertModal: false })
}));
