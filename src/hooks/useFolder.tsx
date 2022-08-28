import { useMemo } from "react";
import { useQueryClient } from "react-query";
import { Folder } from "../helper/cookieHelper";
import { useGeneral } from "../store/generalStore";

const useFolder = () => {
  const {
    setSelectedFolderId,
    setDirectoryView,
    currentDirectoryView,
    selectedFolderId,
  } = useGeneral();
  const queryClient = useQueryClient();

  const folderSelected = (id: string) => {
    setSelectedFolderId(id);
    setDirectoryView("notes");
  };

  const selectedFolder = useMemo(() => {
    const data = queryClient.getQueryData("folders") as Folder[];
    if (data) {
      return data.find((x) => x.id === selectedFolderId);
    }
    return undefined;
  }, [selectedFolderId]);

  return {
    folderSelected,
    currentDirectoryView,
    selectedFolderId,
    selectedFolder,
  } as const;
};

export default useFolder;
