import { create } from 'zustand';

type TuseQnaDetailStore = {
  postId: string;
  seletedComment: string;
  setPostId: (postId: string) => void;
  setSeletedComment: (seletedComment: string) => void;
  clearQnaDetail: () => void;
};

export const useQnaDetailStore = create<TuseQnaDetailStore>((set) => ({
  postId: '',
  seletedComment: '',
  setPostId: (postId) => set({ postId: postId }),
  setSeletedComment: (seletedComment) => set({ seletedComment: seletedComment }),
  clearQnaDetail: () => set({ postId: '', seletedComment: '' })
}));
