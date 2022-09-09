import { useMutation, useQueryClient } from "react-query";
import { Folder, Note, RemoveNote } from "../helper/cookieHelper";
import { addFolder, addNote, deleteNote, updateNote } from "../query/queries";
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
        queryClient.setQueryData(["notes", selectedFolderId], (prev: any) => [
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
      onSuccess: (updatedNote: Note | undefined) => {
        queryClient.setQueryData(["notes", selectedFolderId], (prev: any) => [
          updatedNote,
          ...prev.filter((x: Note) => x.id !== updatedNote?.id),
        ]);
      },
    }
  );

  const deleteNoteMutation = useMutation(
    (data: { noteId: string; folderId: string }) =>
      deleteNote(data.noteId, data.folderId),
    {
      onSuccess: (removedNote: Note | undefined) => {
        queryClient.setQueryData(
          ["notes", removedNote?.folderId],
          (prev: any) => [...prev.filter((x: Note) => x.id !== removedNote?.id)]
        );
      },
    }
  );

  return {
    addFolderMutation,
    addNoteMutation,
    updateNoteMutation,
    deleteNoteMutation,
  } as const;
};

export default useMutationHelper;
