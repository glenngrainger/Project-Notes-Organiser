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
    console.log(editingNoteData);
    if (isCreatingNote && selectedFolderId) {
      addNoteMutation.mutate({
        folderId: selectedFolderId,
        note: editingNoteData,
      });
      setIsCreatingNote(false);
    } else if (selectedFolderId) {
      updateNoteMutation.mutate({
        folderId: selectedFolderId,
        note: editingNoteData,
      });
    }
  };

  return (
    <div className='h-screen w-screen'>
      {/* <nav className='h-18 px-6 py-4 flex justify-between items-center bg-gray-700'>
        <div className='flex gap-3 align-middle text-slate-50'>
          <a>Home</a>
          <a>About</a>
          <a>Contact</a>
        </div>
        <div className='flex gap-3 align-middle'>
          <button className='bg-slate-50 text-gray-700 font-semibold rounded-sm py-1 px-2'>
            Login
          </button>
        </div>
      </nav> */}
      {/* 
      react query, get data from cookie or server based on is logged in
       
      */}

      {/* <NoteNav /> */}
      <div className='bg-slate-50 flex h-screen'>
        <Directory />
        <Editor />
      </div>
      <div className='fixed bottom-4 right-4'>
        <button
          className='rounded bg-slate-300 text-slate-500 px-3 py-1 font-semibold'
          onClick={saveNoteHandler}
        >
          {isCreatingNote ? "Create" : "Save"}
        </button>
      </div>
    </div>
  );
};

export default Home;
