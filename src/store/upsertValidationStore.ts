import { create } from 'zustand';

type TuseUpsertValidationStore = {
  isValidCategory: boolean | null;
  isValidTitle: boolean | null;
  isValidContent: boolean | null;
  setIsValidCategory: (status: boolean) => void;
  setIsValidTitle: (status: boolean) => void;
  setIsValidContent: (status: boolean) => void;
};

export const useUpsertValidationStore = create<TuseUpsertValidationStore>((set) => ({
  isValidCategory: null,
  isValidTitle: null,
  isValidContent: null,
  setIsValidCategory: (status) => set({ isValidCategory: status }),
  setIsValidTitle: (status) => set({ isValidTitle: status }),
  setIsValidContent: (status) => set({ isValidContent: status })
}));
