import { create } from 'zustand';

type UserState = {
  email: string;
  nickname: string;
  setEmail: (email: string) => void;
  setNickname: (nickname: string) => void;
  resetUser: () => void;
};

const useUserStore = create<UserState>((set) => ({
  email: '',
  nickname: '',
  setEmail: (email: string) => set({ email }),
  setNickname: (nickname: string) => set({ nickname }),
  resetUser: () => set({ email: '', nickname: '' })
}));

export default useUserStore;
