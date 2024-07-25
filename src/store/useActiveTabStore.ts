import { create } from 'zustand';

type ActiveTabState = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const useActiveTabStore = create<ActiveTabState>((set) => ({
  activeTab: 'posts',
  setActiveTab: (tab) => set({ activeTab: tab })
}));

export default useActiveTabStore;
