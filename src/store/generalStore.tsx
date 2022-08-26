import create from "zustand";

interface General {
  currentDirectoryView: "folder" | "notes";
  setDirectoryView: (view: "folder" | "notes") => void;
  isCompletedSelected: boolean;
  setIsCompletedSelected: (isCompleted: boolean) => void;
}

const useStore = create<General>((set) => ({
  currentDirectoryView: "folder",
  setDirectoryView: (view: "folder" | "notes") =>
    set(() => ({ currentDirectoryView: view })),
  isCompletedSelected: false,
  setIsCompletedSelected: (isCompleted) =>
    set(() => ({ isCompletedSelected: isCompleted })),
}));

export const useGeneral = () => useStore((state) => state);
