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

const Directory = () => {
  const {
    currentDirectoryView,
    selectedFolderId,
    setIsCreatingNote,
    resetEditingNoteData,
    setDirectoryView,
    isCompletedSelected,
  } = useGeneral();
  const { isVisible, show, hide, saveData, updateFormData } = useModal();
  const { addFolderMutation } = useMutationHelper();
  const { selectedFolder } = useFolder();
  const [searchInput, setSearchInput] = useState("");

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
            (searchInput !== ""
              ? x.name.toLowerCase().includes(searchInput.toLowerCase())
              : true)
        );
      }
      return notes.filter(
        (x) =>
          !x.isComplete &&
          (searchInput !== ""
            ? x.name.toLowerCase().includes(searchInput.toLowerCase())
            : true)
      );
    }
  }, [
    folders,
    notes,
    currentDirectoryView,
    selectedFolderId,
    isCompletedSelected,
    searchInput,
  ]);

  const searchChangeHandler = (e: any) => {
    setSearchInput(e.currentTarget.value);
  };

  return (
    <div className='flex-1 border-x-2 border-slate-900 flex flex-col'>
      <div className='flex justify-evenly bg-gray-700'>
        <div className='flex-1'>
          <div className='flex items-center p-2 text-slate-50'>
            {currentDirectoryView === "notes" ? (
              <>
                <BsFileFill className='mr-4 text-lg' />
                <div>
                  <p>Selected Folder</p>
                  <span className='font-semibold text-sm'>
                    {selectedFolder?.name || "No Folder Selected"}
                  </span>
                </div>
                <BsCaretDownFill
                  className='ml-auto cursor-pointer'
                  onClick={() => setDirectoryView("folder")}
                />
              </>
            ) : (
              <>
                <BsFolderFill className='mr-4 text-lg' />
                <div>
                  <p>Selected Folder</p>
                  <span className='font-semibold text-sm'>
                    {folders?.length || 0} Folder
                  </span>
                </div>
                <BsCaretUpFill
                  className='ml-auto cursor-pointer'
                  onClick={(e) => setDirectoryView("notes")}
                />
              </>
            )}
          </div>
        </div>
      </div>
      {currentDirectoryView === "notes" && <NotesTabs />}
      <input
        className='bg-slate-50 w-full p-2 text-sm opacity-75 hover:opacity-100'
        placeholder={`Search ${currentDirectoryView}`}
        onChange={searchChangeHandler}
      ></input>
      <List data={getListData} />
      <div
        className='mt-auto bg-slate-200 flex gap-2 p-2 items-center w-full'
        style={{ position: "relative" }}
      >
        <button
          className='rounded bg-blue-700 w-full px-2 py-1 text-slate-50 font-medium'
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
    <div className='flex min-h-[2rem] text-sm'>
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
        className='text-3xl font-semibold text-slate-900 cursor-pointer'
        onClick={toggleVisibility}
      />
      {isVisible && (
        <ul
          className='bg-slate-900 font-semibold rounded text-slate-50 text-sm'
          style={{ position: "absolute", bottom: "3.5rem", right: "0.5rem" }}
        >
          {options.map((x) => (
            <li
              className='p-2 flex items-center justify-between gap-2 cursor-pointer'
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
