import dynamic from "next/dynamic";
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
      <div className='min-h-[3rem] bg-slate-900 flex p-2'>
        {/* Input/title */}
        <input
          className='w-fit rounded bg-transparent focus:bg-slate-50 hover:bg-slate-50 font-semibold px-2 py-1 text-slate-50 hover:text-slate-900 focus:text-slate-900'
          value={editingNoteData.name}
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
          {editingNoteData.isComplete ? (
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
    </div>
  );
};
export default Editor;
