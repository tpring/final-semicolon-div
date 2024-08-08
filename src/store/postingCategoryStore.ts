import { CATEGORY_ALERT_TEXT } from '@/constants/upsert';
import { TBOARD_ITEM } from '@/types/upsert';
import { create } from 'zustand';

type TusePostingCategoryStore = {
  categoryGroup: TBOARD_ITEM;
  subCategory: string;
  categoryOpen: boolean;
  subCategoryOpen: boolean;
  setCategoryGroup: (categoryGroup: TBOARD_ITEM) => void;
  setSubCategory: (subCategory: string) => void;
  setCategoryOpen: () => void;
  setSubCategoryOpen: () => void;
  clearCategory: () => void;
};

export const usePostingCategoryStore = create<TusePostingCategoryStore>((set) => ({
  categoryGroup: { category: '', content: '' },
  subCategory: CATEGORY_ALERT_TEXT,
  categoryOpen: false,
  subCategoryOpen: false,
  setCategoryGroup: ({ category, content }) =>
    set(() => ({
      categoryGroup: { category, content }
    })),
  setSubCategory: (subCategory) =>
    set(() => ({
      subCategory: subCategory
    })),
  setCategoryOpen: () => set((state) => ({ categoryOpen: !state.categoryOpen })),
  setSubCategoryOpen: () => set((state) => ({ subCategoryOpen: !state.subCategoryOpen })),
  clearCategory: () =>
    set({
      categoryGroup: { category: '', content: '' },
      subCategory: CATEGORY_ALERT_TEXT,
      categoryOpen: false,
      subCategoryOpen: false
    })
}));
