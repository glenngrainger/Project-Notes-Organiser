import { useCallback, useEffect } from "react";
import { Folder, Note } from "../../../helper/cookieHelper";
import useNote from "../../../hooks/useNote";
import useFolder from "../../../hooks/useFolder";
import { useGeneral } from "../../../store/generalStore";

const List = ({ data }: { data: Note[] | Folder[] }) => {
  const { folderSelected, currentDirectoryView, selectedFolderId } =
    useFolder();
  const { noteSelected, selectedNoteId } = useNote();
  const { isBulkMode, selectedItems, setSelectedItems } = useGeneral();

  const listItemClickedHandler = (id: string) => {
    if (currentDirectoryView === "folder") {
      folderSelected(id);
    } else {
      noteSelected(id);
    }
  };

  const selectedItemHandler = (id: string | undefined) => {
    id && setSelectedItems([...selectedItems, id]);
  };

  return (
    <ul className='overflow-y-auto'>
      {data.map((x) => (
        <li
          key={x.id}
          className='p-2 flex items-center bg-slate-50 border-y-2 border-gray-100 hover:bg-slate-200 cursor-pointer justify-between'
          onClick={() => listItemClickedHandler(x?.id || "")}
        >
          <div>
            <p className='font-semibold'>{x.name}</p>
            <span className='font-bold text-sm'>
              {x?.created !== undefined && x?.created.toString()}
            </span>
          </div>
          {isBulkMode && (
            <input type='checkbox' onClick={() => selectedItemHandler(x.id)} />
          )}
        </li>
      ))}
    </ul>
  );
};

export default List;
