import create from "zustand";

interface General {
  currentDirectoryView: "folder" | "notes";
  setDirectoryView: (view: "folder" | "notes") => void;
  isCompletedSelected: boolean;
  setIsCompletedSelected: (isCompleted: boolean) => void;
  selectedFolderId: string | undefined;
  selectedNoteId: string | undefined;
  setSelectedFolderId: (id: string) => void;
  setSelectedNoteId: (id: string) => void;
}

const useStore = create<General>((set) => ({
  currentDirectoryView: "folder",
  setDirectoryView: (view: "folder" | "notes") =>
    set(() => ({ currentDirectoryView: view })),
  isCompletedSelected: false,
  setIsCompletedSelected: (isCompleted) =>
    set(() => ({ isCompletedSelected: isCompleted })),
  selectedFolderId: undefined,
  selectedNoteId: undefined,
  setSelectedFolderId: (id) => set(() => ({ selectedFolderId: id })),
  setSelectedNoteId: (id) => set(() => ({ selectedNoteId: id })),
}));

export const useGeneral = () => useStore((state) => state);
