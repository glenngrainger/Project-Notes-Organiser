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
  //   addToCart: () => set((state) => ({ cartCount: state.cartCount + 1 })),
}));

// export const useLogin = () => useStore((state) => state.login);
// export const useLogout = () => useStore((state) => state.logout);
export const useUser = () => useStore((state) => state);

// export const useAddToCart = () => useStore((state) => state.addToCart);
// export const useUser = () => useStore((state) => state.user);
// export const useCartCount = () => useStore((state) => state.cartCount);
