import React from "react";
import { useCallback, useMemo } from "react";
import { BsArrowUpSquareFill, BsFileFill, BsFolderFill } from "react-icons/bs";
import { MdRemoveCircle } from "react-icons/md";
import { useQuery } from "react-query";
import useFolder from "../../hooks/useFolder";
import useModal from "../../hooks/useModal";
import useMutationHelper from "../../hooks/useMutationHelper";
import useVisibility from "../../hooks/useVisibility";
import { getFolders, getNotes } from "../../query/queries";
import { useGeneral } from "../../store/generalStore";
import { FolderForm, Modal, Footer } from "../modal";
import List from "./notesList/list";
import { RiArrowGoBackLine } from "react-icons/ri";
import { AiFillCheckSquare } from "react-icons/ai";

const Directory = () => {
  const {
    editingNoteData,
    currentDirectoryView,
    selectedFolderId,
    setIsCreatingNote,
    resetEditingNoteData,
    replaceEditingNoteData,
    setDirectoryView,
    isCompletedSelected,
    isCreatingNote,
    selectedItems,
    setFolderSearchInput,
    folderSearchInput,
    notesSearchInput,
    setNotesSearchInput,
    isBulkMode,
    bulkMode,
    setIsBulkMode,
    setSelectedItems,
    setBulkMode,
    setEditingNoteData,
  } = useGeneral();
  const { isVisible, show, hide, saveData, updateFormData } = useModal();
  const {
    addFolderMutation,
    bulkDeleteNoteMutation,
    bulkDeleteFolderMutation,
    bulkSetNoteStatusMutation,
  } = useMutationHelper();
  const { selectedFolder } = useFolder();

  const { data: folders } = useQuery(
    ["folders"],
    async () => await getFolders(),
    {
      initialData: [],
    }
  );

  const { data: notes } = useQuery(
    ["notes", selectedFolderId],
    async () => await getNotes(selectedFolderId || ""),
    {
      enabled: selectedFolderId !== undefined,
      initialData: [],
    }
  );

  const addFolderHandler = () => saveData(addFolderMutation);

  const newResourceClickedHandler = useCallback(() => {
    if (currentDirectoryView === "folder") {
      show();
    } else {
      resetEditingNoteData();
      setIsCreatingNote(true);
    }
  }, [currentDirectoryView]);

  const filterResults = (data: any, filterTerm: string) => {
    if (data === undefined) return [];
    if (filterTerm === "") return data;
    return data.filter((x: any) =>
      x?.name.toLowerCase().includes(filterTerm.toLowerCase())
    );
  };

  const getListData = useMemo(() => {
    if (currentDirectoryView === "folder") {
      if (folders === undefined) return [];
      return filterResults(folders, folderSearchInput);
    } else {
      if (notes === undefined) return [];
      if (isCompletedSelected) {
        return filterResults(
          notes.filter((x) => x.isComplete),
          notesSearchInput
        );
      }
      return filterResults(
        notes.filter((x) => !x.isComplete),
        notesSearchInput
      );
    }
  }, [
    folders,
    notes,
    currentDirectoryView,
    selectedFolderId,
    isCompletedSelected,
    notesSearchInput,
    folderSearchInput,
    selectedItems,
  ]);

  const searchChangeHandler = (e: any) => {
    if (currentDirectoryView === "folder") {
      setFolderSearchInput(e.currentTarget.value);
    } else {
      setNotesSearchInput(e.currentTarget.value);
    }
  };

  const exitCreateModeHandler = () => {
    replaceEditingNoteData(undefined);
    setIsCreatingNote(false);
  };

  const directoryChangeHandler = (view: "folder" | "notes") => {
    setDirectoryView(view);
  };

  const exitBulkModeHandler = () => {
    setSelectedItems([]);
    setIsBulkMode(false);
    setBulkMode("");
  };

  const confirmBulkModeHandler = () => {
    setIsBulkMode(false);
    setBulkMode("");
    if (selectedItems.length === 0) return;
    if (bulkMode === "delete") {
      if (currentDirectoryView === "folder") {
        bulkDeleteFolderMutation.mutate({ folderIds: selectedItems });
        // Clear selected note only if the note is in a deleted folder
        editingNoteData?.folderId &&
          selectedItems.includes(editingNoteData?.folderId) &&
          replaceEditingNoteData(undefined);
      } else {
        selectedFolderId &&
          bulkDeleteNoteMutation.mutate({
            folderId: selectedFolderId,
            noteIds: selectedItems,
          });
        // Clear editing note if the note has been deleted
        editingNoteData?.id &&
          selectedItems.includes(editingNoteData.id) &&
          replaceEditingNoteData(undefined);
      }
    } else if (
      bulkMode === "set complete" &&
      currentDirectoryView === "notes"
    ) {
      // Also update editing note data if it was being edited
      selectedFolderId &&
        bulkSetNoteStatusMutation.mutate({
          folderId: selectedFolderId,
          noteIds: selectedItems,
          status: true,
        });
      // If note is currently being edited has been updated, update the editingnote status
      if (editingNoteData?.id && selectedItems.includes(editingNoteData?.id)) {
        setEditingNoteData("isComplete", true);
      }
    }
    setSelectedItems([]);
  };

  if (isCreatingNote) {
    return (
      <div className="flex-1 bg-gray-700 flex items-center justify-center flex-col relative">
        <h5 className="text-lg font-semibold text-slate-50">
          Creating a note for folder {selectedFolder?.name}
        </h5>
        <span className="text-sm font-medium text-gray-500">
          Directory is fully locked until note is created
        </span>
        <button
          className="absolute bottom-2 left-2 bg-slate-50 py-1 px-2 rounded-sm font-semibold text-slate-900"
          onClick={exitCreateModeHandler}
        >
          Exit create mode
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 border-x-2 border-slate-900 flex flex-col">
      <div className="justify-evenly bg-gray-700">
        <div className="flex items-center p-2 text-slate-50 min-h-[4rem]">
          {isBulkMode && (
            <React.Fragment>
              <p>
                Select {currentDirectoryView} to {bulkMode}
              </p>
            </React.Fragment>
          )}
          {!isBulkMode &&
            (currentDirectoryView === "notes" ? (
              <>
                <BsFileFill className="mr-4 text-lg" />
                <div>
                  <div className="font-semibold text-sm">
                    {selectedFolder?.name || "No Folder Selected"}
                  </div>
                </div>
                <RiArrowGoBackLine
                  className="ml-auto cursor-pointer"
                  onClick={() => directoryChangeHandler("folder")}
                />
              </>
            ) : (
              <>
                <BsFolderFill className="mr-4 text-lg" />
                <div>
                  <span className="font-semibold text-sm">
                    {folders?.length || 0} Folder
                  </span>
                </div>
              </>
            ))}
        </div>
      </div>
      {currentDirectoryView === "notes" && <NotesTabs />}
      <input
        className="bg-slate-50 w-full p-2 text-sm opacity-75 hover:opacity-100"
        placeholder={`Search ${currentDirectoryView}`}
        value={
          currentDirectoryView === "folder"
            ? folderSearchInput
            : notesSearchInput
        }
        onChange={searchChangeHandler}
      />
      <List data={getListData} />
      <div
        className="mt-auto bg-slate-200 flex gap-2 p-2 items-center w-full"
        style={{ position: "relative" }}
      >
        {isBulkMode ? (
          <React.Fragment>
            <button
              className="rounded bg-red-900 w-full px-2 py-1 text-slate-50 font-medium"
              onClick={exitBulkModeHandler}
            >
              Cancel
            </button>
            <button
              className="rounded bg-blue-700 w-full px-2 py-1 text-slate-50 font-medium"
              onClick={confirmBulkModeHandler}
            >
              Confirm
            </button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <button
              className="rounded bg-blue-700 w-full px-2 py-1 text-slate-50 font-medium"
              onClick={newResourceClickedHandler}
            >
              New {currentDirectoryView === "notes" ? "Note" : "Folder"}
            </button>
            <Menu />
          </React.Fragment>
        )}
      </div>
      {isVisible && (
        <Modal
          Footer={
            <Footer saveCallback={addFolderHandler} closeCallback={hide} />
          }
          Form={<FolderForm updater={updateFormData} />}
        />
      )}
    </div>
  );
};

const NotesTabs = () => {
  const { isCompletedSelected, setIsCompletedSelected } = useGeneral();

  const style = (isSelect: boolean) => {
    return `flex-1 bg-slate-50 p-2 font-semibold border-b-4 cursor-pointer text-center ${
      isSelect && "border-blue-700"
    }`;
  };

  return (
    <div className="flex min-h-[2rem] text-sm">
      <div
        className={style(!isCompletedSelected)}
        onClick={() => setIsCompletedSelected(false)}
      >
        In-Progress
      </div>
      <div
        className={style(isCompletedSelected)}
        onClick={() => setIsCompletedSelected(true)}
      >
        Completed
      </div>
    </div>
  );
};

const Menu = () => {
  const { isVisible, toggleVisibility } = useVisibility(false);
  const { setIsBulkMode, setBulkMode, isBulkMode, currentDirectoryView } =
    useGeneral();

  const deleteHandler = () => {
    setIsBulkMode(true);
    setBulkMode("delete");
    toggleVisibility();
  };

  const setCompleteHandler = () => {
    setIsBulkMode(true);
    setBulkMode("set complete");
    toggleVisibility();
  };

  const options: {
    text: string;
    action: () => void;
    isNoteOnlyOption?: boolean;
    icon: React.ReactNode;
  }[] = useMemo(
    () => [
      { text: "Delete", action: deleteHandler, icon: <MdRemoveCircle /> },
      {
        text: "Set Complete",
        action: setCompleteHandler,
        icon: <AiFillCheckSquare />,
        isNoteOnlyOption: true,
      },
    ],
    []
  );

  return (
    <React.Fragment>
      <BsArrowUpSquareFill
        className="text-3xl font-semibold text-slate-900 cursor-pointer"
        onClick={toggleVisibility}
      />
      {isVisible && (
        <ul
          className="bg-slate-900 font-semibold rounded text-slate-50 text-sm"
          style={{ position: "absolute", bottom: "3.5rem", right: "0.5rem" }}
        >
          {options.map(
            (x) =>
              (currentDirectoryView === "notes" ||
                (currentDirectoryView === "folder" && !x.isNoteOnlyOption)) && (
                <li
                  key={x.text}
                  className="p-2 flex items-center gap-2 cursor-pointer"
                  onClick={x.action}
                >
                  {x.icon}
                  {x.text}
                </li>
              )
          )}
        </ul>
      )}
    </React.Fragment>
  );
};
export default Directory;
