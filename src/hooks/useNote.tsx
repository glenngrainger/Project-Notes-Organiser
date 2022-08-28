import { useCallback, useMemo } from "react";
import { useQueryClient } from "react-query";
import { Note } from "../helper/cookieHelper";
import { useGeneral } from "../store/generalStore";

const useNote = () => {
  const {
    selectedNoteId,
    setDirectoryView,
    currentDirectoryView,
    setSelectedNoteId,
    selectedFolderId,
  } = useGeneral();
  const queryClient = useQueryClient();

  const noteSelected = (id: string) => {
    setSelectedNoteId(id);
  };

  const selectedNote = useMemo(() => {
    // const data = queryClient.getQueryData("notes") as Note[];
    // if (data) {
    //   return data.find((x) => x.id === selectedFolderId);
    // }
    return undefined;
  }, [selectedFolderId]);

  return {
    noteSelected,
    selectedNote,
    currentDirectoryView,
    selectedNoteId,
  } as const;
};

export default useNote;
