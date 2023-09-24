import dynamic from "next/dynamic";
import React from "react";
import useMutationHelper from "../../hooks/useMutationHelper";
import { useGeneral } from "../../store/generalStore";

const MarkDownEditorNoSSR = dynamic(
  () => import("../markdownEditor/markdownEditor"),
  { ssr: false }
);

const Editor = () => {
  const {
    editingNoteData,
    setEditingNoteData,
    isCreatingNote,
    replaceEditingNoteData,
  } = useGeneral();
  const { updateNoteMutation, deleteNoteMutation } = useMutationHelper();
  const setNoteStatusHandler = () => {
    setEditingNoteData("isComplete", !editingNoteData?.isComplete);
    if (editingNoteData?.folderId) {
      updateNoteMutation.mutate({
        folderId: editingNoteData?.folderId,
        note: editingNoteData,
      });
    }
  };

  const StatusBadge = () => (
    <div
      className={`flex items-center justify-center rounded-lg px-2 text-xs text-slate-50 font-semibold ml-4 ${
        editingNoteData?.isComplete
          ? "bg-green-900"
          : "bg-slate-50 text-slate-900"
      }`}
    >
      {editingNoteData?.isComplete ? "Complete" : "In Progress"}
    </div>
  );

  const deleteHandler = () => {
    if (editingNoteData?.id && editingNoteData.folderId) {
      deleteNoteMutation.mutate({
        noteId: editingNoteData?.id,
        folderId: editingNoteData?.folderId,
      });
      replaceEditingNoteData(undefined);
    }
  };

  return (
    <div className="flex-[3] border-slate-900 bg-slate-200 border-x-2">
      <Header />
      {editingNoteData !== undefined && (
        <React.Fragment>
          <div className="min-h-[3rem] bg-slate-900 flex p-2">
            {/* Input/title */}
            <input
              className="w-fit rounded bg-transparent focus:bg-slate-50 hover:bg-slate-50 font-semibold px-2 py-1 text-slate-50 hover:text-slate-900 focus:text-slate-900"
              value={editingNoteData?.name}
              onChange={(e) => {
                setEditingNoteData("name", e.currentTarget.value);
              }}
            />
            {/* button group */}
            {!isCreatingNote && (
              <React.Fragment>
                <StatusBadge />
                <div className="ml-auto flex items-center gap-3">
                  <button
                    className="bg-red-900 text-sm py-1 px-2 rounded-sm text-slate-50 font-semibold"
                    onClick={deleteHandler}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-slate-50 rounded-sm text-slate-900 font-semibold px-2 py-1 text-sm"
                    onClick={setNoteStatusHandler}
                  >
                    Toggle Status
                  </button>
                </div>
              </React.Fragment>
            )}
          </div>
          <div
            className="overflow-y-auto"
            style={{ height: "calc(100vh - 7rem)" }}
          >
            <MarkDownEditorNoSSR />
          </div>
        </React.Fragment>
      )}
      {editingNoteData === undefined && (
        <div
          className="bg-slate-50 flex items-center justify-center"
          style={{ height: "calc(100vh - 4rem)" }}
        >
          <h3 className="font-semibold text-lg">No note selected</h3>
        </div>
      )}
    </div>
  );
};

const Header = () => {
  return <div className="min-h-[4rem] flex justify-evenly bg-gray-700"></div>;
};

export default Editor;
