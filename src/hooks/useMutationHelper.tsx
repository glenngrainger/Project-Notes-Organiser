import { useMutation, useQueryClient } from "react-query";
import { Folder, Note } from "../helper/cookieHelper";
import {
  addFolder,
  addNote,
  bulkDeleteNotes,
  deleteNote,
  updateNote,
  bulkRemoveFolders,
  bulkSetNoteStatus,
} from "../query/queries";
import { useGeneral } from "../store/generalStore";

const useMutationHelper = () => {
  const queryClient = useQueryClient();
  const { replaceEditingNoteData, selectedFolderId } = useGeneral();

  const addFolderMutation = useMutation(addFolder, {
    onSuccess: (newFolder) => {
      queryClient.setQueryData(["folders"], (prev: any) => [
        newFolder,
        ...prev,
      ]);
    },
  });

  const addNoteMutation = useMutation(
    (data: { folderId: string; note: Note }) =>
      addNote(data.folderId, data.note),
    {
      onSuccess: (newNote) => {
        queryClient.setQueryData(["notes", newNote?.folderId], (prev: any) => [
          newNote,
          ...prev,
        ]);
        replaceEditingNoteData(newNote);
      },
    }
  );

  const updateNoteMutation = useMutation(
    (data: { folderId: string; note: Note }) =>
      updateNote(data.folderId, data.note),
    {
      onSuccess: (updatedNote) => {
        queryClient.setQueryData(
          ["notes", updatedNote?.folderId],
          (prev: any) => [
            updatedNote,
            ...prev.filter((x: Note) => x.id !== updatedNote?.id),
          ]
        );
      },
    }
  );

  const deleteNoteMutation = useMutation(
    (data: { noteId: string; folderId: string }) =>
      deleteNote(data.noteId, data.folderId),
    {
      onSuccess: (removedNote) => {
        queryClient.setQueryData(
          ["notes", removedNote?.folderId],
          (prev: any) => [...prev.filter((x: Note) => x.id !== removedNote?.id)]
        );
      },
    }
  );

  const bulkDeleteNoteMutation = useMutation(
    (data: { folderId: string; noteIds: string[] }) =>
      bulkDeleteNotes(data.folderId, data.noteIds),
    {
      onSuccess: (removedNoteIds) => {
        queryClient.setQueryData(["notes", selectedFolderId], (prev: any) => [
          ...prev.filter((x: Note) => !removedNoteIds?.includes(x.id || "")),
        ]);
      },
    }
  );

  const bulkDeleteFolderMutation = useMutation(
    (data: { folderIds: string[] }) => bulkRemoveFolders(data.folderIds),
    {
      onSuccess: (removedFolderIds) => {
        queryClient.setQueryData(["folders"], (prev: any) => [
          ...prev.filter(
            (x: Folder) => !removedFolderIds?.includes(x.id || "")
          ),
        ]);
      },
    }
  );

  const bulkSetNoteStatusMutation = useMutation(
    (data: { folderId: string; noteIds: string[]; status: boolean }) =>
      bulkSetNoteStatus(data.folderId, data.noteIds, data.status),
    {
      onSuccess: (updatedNoteIds) => {
        queryClient.setQueryData(
          ["notes", selectedFolderId],
          (prev: Note[] | undefined) => {
            if (prev === undefined) return [];
            let newNotesArry: Note[] = [];
            for (let note of prev) {
              if (updatedNoteIds?.includes(note.id || "")) {
                newNotesArry.push({ ...note, isComplete: true });
              } else {
                newNotesArry.push({ ...note });
              }
            }
            return newNotesArry;
          }
        );
      },
    }
  );

  return {
    addFolderMutation,
    addNoteMutation,
    updateNoteMutation,
    deleteNoteMutation,
    bulkDeleteNoteMutation,
    bulkDeleteFolderMutation,
    bulkSetNoteStatusMutation,
  } as const;
};

export default useMutationHelper;
