import { useMutation, useQueryClient } from "react-query";
import { Folder, Note } from "../helper/cookieHelper";
import { addFolder, addNote } from "../query/queries";

const useMutationHelper = () => {
  const queryClient = useQueryClient();

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
        queryClient.setQueryData(["notes"], (prev: any) => [newNote, ...prev]);
      },
    }
  );
  return { addFolderMutation, addNoteMutation } as const;
};

export default useMutationHelper;
