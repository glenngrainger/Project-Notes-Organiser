import { useCallback } from "react";
import { Folder, Note } from "../../../helper/cookieHelper";
import useNote from "../../../hooks/useNote";
import useFolder from "../../../hooks/useFolder";

const List = ({ data }: { data: Note[] | Folder[] }) => {
  const { folderSelected, currentDirectoryView, selectedFolderId } =
    useFolder();
  const { noteSelected, selectedNoteId } = useNote();

  const listItemClickedHandler = useCallback(
    (id: string) => {
      if (currentDirectoryView === "folder") {
        folderSelected(id);
      } else {
        noteSelected(id);
      }
    },
    [selectedNoteId, selectedFolderId, currentDirectoryView]
  );

  return (
    <ul className='overflow-y-auto'>
      {data.map((x) => (
        <li
          className='p-2 flex items-center bg-slate-50 border-y-2 border-gray-100 hover:bg-slate-200 cursor-pointer'
          onClick={() => listItemClickedHandler(x?.id || "")}
        >
          <div>
            <p className='font-semibold'>{x.name}</p>
            <span className='font-bold text-sm'>
              {x?.created !== undefined && x?.created.toString()}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default List;
