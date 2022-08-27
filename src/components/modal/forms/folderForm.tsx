const FolderForm = ({
  updater,
}: {
  updater: (key: string, value: any) => void;
}) => {
  return (
    <div className='p-3'>
      <input
        onChange={(e) => updater("name", e.currentTarget.value)}
        placeholder='Folder name'
        className='w-full p-2 rounded'
      />
    </div>
  );
};

export default FolderForm;
