import { useQueryClient } from "react-query";
import { Note } from "../helper/cookieHelper";
import { useGeneral } from "../store/generalStore";

const useNote = () => {
  const {
    selectedNoteId,
    currentDirectoryView,
    setSelectedNoteId,
    selectedFolderId,
    replaceEditingNoteData,
  } = useGeneral();
  const queryClient = useQueryClient();

  const noteSelected = (id: string) => {
    setSelectedNoteId(id);
    var note = selectedNote(id);
    if (note) replaceEditingNoteData(note);
  };

  const selectedNote = (id: string) => {
    const data = queryClient.getQueryData([
      "notes",
      selectedFolderId,
    ]) as Note[];
    if (data) {
      var note = data.find((x) => x.id === id);
      if (note) {
        return { ...note };
      }
      return undefined;
    }
    return undefined;
  };

  return {
    noteSelected,
    currentDirectoryView,
    selectedNoteId,
  } as const;
};

export default useNote;
