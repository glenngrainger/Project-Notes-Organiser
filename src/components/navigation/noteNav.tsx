import { AiFillGoogleCircle } from "react-icons/ai";
import {
  BsFolderFill,
  BsCaretDownFill,
  BsCaretUpFill,
  BsFileFill,
} from "react-icons/bs";
import { useGeneral } from "../../store/generalStore";

const NoteNav = () => {
  const { setDirectoryView, currentDirectoryView } = useGeneral();
  return (
    <div className='min-h-[4rem] flex justify-evenly bg-gray-700'>
      <div className='border-x-2 border-slate-900 flex-1'>
        <div className='flex items-center p-2 text-slate-50'>
          {currentDirectoryView === "notes" ? (
            <>
              <BsFileFill className='mr-4 text-lg' />
              <div>
                <p>Selected folder</p>
                <span className='font-semibold text-sm'>
                  Get from react query cache
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
                <p>Folders</p>
                <span className='font-semibold text-sm'>
                  Select a folder to view notes
                </span>
              </div>
              <BsCaretUpFill
                className='ml-auto cursor-pointer'
                onClick={() => setDirectoryView("notes")}
              />
            </>
          )}
        </div>
      </div>
      <div className='border-x-2 border-slate-900 flex-1'></div>
      <div className='border-x-2 border-slate-900 flex-1'></div>
      <div className='border-x-2 border-slate-900 flex-1 flex items-center justify-end'>
        <button className='rounded bg-slate-50 px-2 font-semibold py-1 mr-2 flex items-center'>
          Login with Google
          <AiFillGoogleCircle className='ml-1 text-blue-700' />
        </button>
      </div>
    </div>
  );
};

export default NoteNav;
