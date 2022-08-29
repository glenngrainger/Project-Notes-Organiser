import { useCallback, useEffect, useMemo } from "react";
import { BsArrowUpSquareFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { useQuery, useQueryClient } from "react-query";
import { CreateFolder, Folder, GetFolders } from "../../helper/cookieHelper";
import useModal from "../../hooks/useModal";
import useMutationHelper from "../../hooks/useMutationHelper";
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
  } = useGeneral();
  const { isVisible, show, hide, saveData, updateFormData } = useModal();
  const { addFolderMutation } = useMutationHelper();

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
    console.log("render");
    console.log(selectedFolderId);
    if (currentDirectoryView === "folder") {
      return folders || [];
    } else {
      // queryClient.invalidateQueries(["notes"]);
      return notes || [];
    }
  }, [folders, notes, currentDirectoryView, selectedFolderId]);

  return (
    <div className='flex-1 border-x-2 border-slate-900 flex flex-col'>
      {currentDirectoryView === "notes" && <NotesTabs />}
      <input
        className='bg-slate-50 w-full p-2 text-sm opacity-75 hover:opacity-100'
        placeholder={`Search ${currentDirectoryView}`}
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
        <BsArrowUpSquareFill className='text-3xl font-semibold text-slate-900 cursor-pointer' />
        <ul
          className='bg-slate-900 font-semibold rounded text-slate-50 text-sm'
          style={{ position: "absolute", bottom: "3.5rem", right: "0.5rem" }}
        >
          <li className='p-2 flex items-center justify-between gap-2 cursor-pointer'>
            Bulk Delete
            <MdDelete onClick={() => {}} />
          </li>
        </ul>
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
export default Directory;
