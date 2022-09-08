import dynamic from "next/dynamic";
import React from "react";
import { AiFillGoogleCircle } from "react-icons/ai";
import useForm from "../../hooks/useForm";
import { useGeneral } from "../../store/generalStore";

const MarkDownEditorNoSSR = dynamic(
  () => import("../markdownEditor/markdownEditor"),
  { ssr: false }
);

const Editor = () => {
  const { editingNoteData, setEditingNoteData } = useGeneral();

  return (
    <div className='flex-[3] border-slate-900 bg-slate-200 border-x-2'>
      <Header />
      {editingNoteData !== undefined && (
        <React.Fragment>
          <div className='min-h-[3rem] bg-slate-900 flex p-2'>
            {/* Input/title */}
            <input
              className='w-fit rounded bg-transparent focus:bg-slate-50 hover:bg-slate-50 font-semibold px-2 py-1 text-slate-50 hover:text-slate-900 focus:text-slate-900'
              value={editingNoteData?.name}
              onChange={(e) => {
                setEditingNoteData("name", e.currentTarget.value);
                console.log(e.currentTarget.value);
              }}
            />
            {/* button group */}
            <div className='ml-auto flex items-center gap-3'>
              <button className='bg-red-900 text-sm py-1 px-2 rounded-sm text-slate-50 font-semibold'>
                Delete
              </button>
              {editingNoteData?.isComplete ? (
                <button
                  className='bg-green-900 text-sm py-1 px-2 rounded-sm text-slate-50 font-semibold'
                  onClick={() => setEditingNoteData("isComplete", false)}
                >
                  Set as In Progress
                </button>
              ) : (
                <button
                  className='bg-red-900 text-sm py-1 px-2 rounded-sm text-slate-50 font-semibold'
                  onClick={() => setEditingNoteData("isComplete", true)}
                >
                  Set as Complete
                </button>
              )}
            </div>
          </div>
          <MarkDownEditorNoSSR />
        </React.Fragment>
      )}
      {editingNoteData === undefined && (
        <div
          className='bg-slate-50 flex items-center justify-center'
          style={{ height: "calc(100vh - 4rem)" }}
        >
          <h3>No notes added!</h3>
        </div>
      )}
    </div>
  );
};

const Header = () => {
  return (
    <div className='min-h-[4rem] flex justify-evenly bg-gray-700'>
      <div className='flex-1 flex items-center justify-end'>
        <button
          className='rounded bg-slate-50 px-2 font-semibold py-1 mr-2 flex items-center disabled:bg-slate-300 cursor-not-allowed'
          disabled
          title='Google implementation coming soon'
        >
          Login with Google
          <AiFillGoogleCircle className='ml-1 text-blue-700' />
        </button>
      </div>
    </div>
  );
};

export default Editor;
