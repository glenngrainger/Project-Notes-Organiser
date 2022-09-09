import type { NextPage } from "next";
import { Directory } from "../src/components/directory";
import { Editor } from "../src/components/editor";
import useNote from "../src/hooks/useNote";
import useMutationHelper from "../src/hooks/useMutationHelper";
import { useGeneral } from "../src/store/generalStore";
import { useCallback } from "react";

const Home: NextPage = () => {
  const {
    editingNoteData,
    isCreatingNote,
    selectedFolderId,
    setIsCreatingNote,
  } = useGeneral();
  const { addNoteMutation, updateNoteMutation } = useMutationHelper();
  const saveNoteHandler = () => {
    if (editingNoteData === undefined) return;
    if (isCreatingNote && selectedFolderId) {
      addNoteMutation.mutate({
        folderId: selectedFolderId,
        note: editingNoteData,
      });
      setIsCreatingNote(false);
    } else if (editingNoteData?.folderId) {
      updateNoteMutation.mutate({
        folderId: editingNoteData.folderId,
        note: editingNoteData,
      });
    }
  };

  return (
    <div className="h-screen w-screen">
      {/* <NoteNav /> */}
      <div className="bg-slate-50 flex h-screen">
        <Directory />
        <Editor />
      </div>
      {editingNoteData !== undefined && (
        <div className="fixed bottom-4 right-4">
          <button
            className="rounded bg-slate-300 text-slate-500 px-3 py-1 font-semibold"
            onClick={saveNoteHandler}
          >
            {isCreatingNote ? "Create" : "Save"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
