import create from "zustand";

interface User {
  isLoggedIn: boolean;
  hasCompletedSetup: boolean;
  login: () => void;
  logout: () => void;
}

const useStore = create<User>((set) => ({
  isLoggedIn: false,
  hasCompletedSetup: true,
  login: () => set(() => ({ isLoggedIn: true })),
  logout: () => set(() => ({ isLoggedIn: false })),
}));

export const useUser = () => useStore((state) => state);
