import create from "zustand";
import { Note } from "../helper/cookieHelper";

interface General {
  folderSearchInput: string;
  setFolderSearchInput: (value: string) => void;
  notesSearchInput: string;
  setNotesSearchInput: (value: string) => void;
  isBulkMode: boolean;
  selectedItems: string[];
  bulkMode: "delete" | "set complete" | "";
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
  editingNoteData: Note | undefined;
  setEditingNoteData: (key: string, value: any) => void;
  resetEditingNoteData: () => void;
  replaceEditingNoteData: (note: Note | undefined) => void;
  setSelectedItems: (ids: string[]) => void;
  setIsBulkMode: (state: boolean) => void;
  setBulkMode: (value: "delete" | "set complete" | "") => void;
}

const useStore = create<General>((set) => ({
  bulkMode: "",
  notesSearchInput: "",
  setNotesSearchInput: (value) => set(() => ({ notesSearchInput: value })),
  folderSearchInput: "",
  setFolderSearchInput: (value) => set(() => ({ folderSearchInput: value })),
  isBulkMode: false,
  selectedItems: [],
  currentDirectoryView: "folder",
  isCompleteMode: false,
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
  editingNoteData: undefined,
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
  setSelectedItems: (items) =>
    set((prev) => {
      return { selectedItems: items };
    }),
  setIsBulkMode: (state) => set(() => ({ isBulkMode: state })),
  setBulkMode: (value) => set(() => ({ bulkMode: value })),
}));

export const useGeneral = () => useStore((state) => state);
