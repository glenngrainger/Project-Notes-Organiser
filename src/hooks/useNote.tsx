import { useCallback, useMemo } from "react";
import { flushSync } from "react-dom";
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
    replaceEditingNoteData,
  } = useGeneral();
  const queryClient = useQueryClient();

  const noteSelected = (id: string) => {
    // flushSync(() => {
    setSelectedNoteId(id);
    var note = selectedNote(id);
    console.log(note);
    if (note) replaceEditingNoteData(note);

    // Set editing note

    // });
    // if (selectedNote) {
    //   replaceEditingNoteData(selectedNote);
    // }
  };

  const selectedNote = (id: string) => {
    const data = queryClient.getQueryData([
      "notes",
      selectedFolderId,
    ]) as Note[];
    console.log(data);
    if (data) {
      var note = data.find((x) => x.id === id);
      if (note) {
        // replaceEditingNoteData({ ...note });
        return { ...note };
      }
      return undefined;
    }
    return undefined;
  };

  return {
    noteSelected,
    // selectedNote,
    currentDirectoryView,
    selectedNoteId,
  } as const;
};

export default useNote;
