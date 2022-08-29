import create from "zustand";
import { Note } from "../helper/cookieHelper";

interface General {
  currentDirectoryView: "folder" | "notes";
  setDirectoryView: (view: "folder" | "notes") => void;
  isCompletedSelected: boolean;
  setIsCompletedSelected: (isCompleted: boolean) => void;
  selectedFolderId: string | undefined;
  selectedNoteId: string | undefined;
  setSelectedFolderId: (id: string) => void;
  setSelectedNoteId: (id: string) => void;
  isCreatingNote: boolean;
  setIsCreatingNote: (value: boolean) => void;
  editingNoteData: Note;
  setEditingNoteData: (key: string, value: any) => void;
  resetEditingNoteData: () => void;
  replaceEditingNoteData: (note: Note) => void;
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
  isCreatingNote: false,
  setIsCreatingNote: (value) => set(() => ({ isCreatingNote: value })),
  editingNoteData: { content: "test2", name: "test" },
  setEditingNoteData: (key: string, value: any) =>
    set((prev) => {
      const data = prev.editingNoteData as any;
      data[key] = value;
      return { editingNoteData: data };
    }),
  resetEditingNoteData: () =>
    set((prev) => {
      return {
        editingNoteData: { content: "", name: "New Note!", isComplete: false },
      };
    }),
  replaceEditingNoteData: (note) =>
    set((prev) => {
      return { editingNoteData: note };
    }),
}));

export const useGeneral = () => useStore((state) => state);
