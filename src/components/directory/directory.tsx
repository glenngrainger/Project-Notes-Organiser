import React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  BsArrowUpSquareFill,
  BsCaretDownFill,
  BsCaretUpFill,
  BsFileFill,
  BsFolderFill,
} from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { useQuery, useQueryClient } from "react-query";
import useFolder from "../../hooks/useFolder";
import useModal from "../../hooks/useModal";
import useMutationHelper from "../../hooks/useMutationHelper";
import useVisibility from "../../hooks/useVisibility";
import { getFolders, getNotes } from "../../query/queries";
import { useGeneral } from "../../store/generalStore";
import { FolderForm, Modal, Footer } from "../modal";
import List from "./notesList/list";
import { RiArrowGoBackLine } from "react-icons/ri";

const Directory = () => {
  const {
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
  } = useGeneral();
  const { isVisible, show, hide, saveData, updateFormData } = useModal();
  const { addFolderMutation } = useMutationHelper();
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

  const getListData = useMemo(() => {
    if (currentDirectoryView === "folder") {
      return folders || [];
    } else {
      if (notes === undefined) return [];
      if (isCompletedSelected) {
        return notes.filter(
          (x) =>
            x.isComplete &&
            (notesSearchInput !== ""
              ? x.name.toLowerCase().includes(notesSearchInput.toLowerCase())
              : true)
        );
      }
      return notes.filter(
        (x) =>
          !x.isComplete &&
          (notesSearchInput !== ""
            ? x.name.toLowerCase().includes(notesSearchInput.toLowerCase())
            : true)
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

  if (isCreatingNote) {
    return (
      <div className="flex-1 bg-gray-700 flex items-center justify-center flex-col relative">
        <h5 className="text-lg font-semibold text-slate-50">
          Creating a note for {selectedFolder?.name}
        </h5>
        <span className="text-sm font-medium text-gray-500">
          Directory locked in create mode
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
          {currentDirectoryView === "notes" ? (
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
          )}
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
      ></input>
      <List data={getListData} />
      <div
        className="mt-auto bg-slate-200 flex gap-2 p-2 items-center w-full"
        style={{ position: "relative" }}
      >
        <button
          className="rounded bg-blue-700 w-full px-2 py-1 text-slate-50 font-medium"
          onClick={newResourceClickedHandler}
        >
          New {currentDirectoryView === "notes" ? "Note" : "Folder"}
        </button>
        <Menu />
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
  const { setBulkMode, isBulkMode } = useGeneral();

  const deleteHandler = () => {
    setBulkMode(true);
  };

  const setCompleteHandler = () => {
    setBulkMode(true);
  };

  const options: { text: string; action: () => void }[] = [
    { text: "Bulk Delete", action: deleteHandler },
    { text: "Bulk Set Complete", action: setCompleteHandler },
  ];

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
          {options.map((x) => (
            <li
              className="p-2 flex items-center justify-between gap-2 cursor-pointer"
              onClick={x.action}
            >
              {x.text}
              {/* <MdDelete onClick={() => {}} /> */}
            </li>
          ))}
        </ul>
      )}
    </React.Fragment>
  );
};
export default Directory;
