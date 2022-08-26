import { BsArrowUpSquareFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { CreateFolder, GetFolders } from "../../helper/cookieHelper";
import { useGeneral } from "../../store/generalStore";
import { useUser } from "../../store/userStore";
import { FolderForm, Modal, Footer } from "../modal";
import NotesList from "./notesList/notesList";

const Directory = () => {
  const { isLoggedIn, login, logout } = useUser();
  const { currentDirectoryView } = useGeneral();
  return (
    <div className='flex-1 border-x-2 border-slate-900 flex flex-col'>
      {currentDirectoryView === "notes" && <NotesTabs />}
      <input
        className='bg-slate-50 w-full p-2 text-sm opacity-75 hover:opacity-100'
        placeholder={`Search ${currentDirectoryView}`}
      ></input>
      <NotesList />
      <div
        className='mt-auto bg-slate-200 flex gap-2 p-2 items-center w-full'
        style={{ position: "relative" }}
      >
        <button
          className='rounded bg-blue-700 w-full px-2 py-1 text-slate-50 font-medium'
          onClick={() =>
            CreateFolder({
              id: "test",
              name: "test",
              notes: [],
            })
          }
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
            <MdDelete onClick={() => login()} />
          </li>
        </ul>
      </div>
      <Modal Footer={<Footer />} Form={<FolderForm />} />
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
