import { useMutation, useQueryClient } from "react-query";
import { Folder } from "../helper/cookieHelper";
import { addFolder } from "../query/queries";

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
  return { addFolderMutation } as const;
};

export default useMutationHelper;
