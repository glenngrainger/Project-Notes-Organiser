import { Folder, Note } from "../../../helper/cookieHelper";

const List = ({ data }: { data: Note[] | Folder[] }) => {
  return (
    <ul className='overflow-y-auto'>
      {data.map((x) => (
        <li className='p-2 flex items-center bg-slate-50 border-y-2 border-gray-100'>
          <div>
            <p className='font-semibold'>{x.name}</p>
            <span className='font-bold text-sm'>
              {x?.created !== undefined && x?.created.toString()}
            </span>
          </div>
          <div className='ml-auto'>test</div>
        </li>
      ))}
    </ul>
  );
};

export default List;
