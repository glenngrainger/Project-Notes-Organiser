interface Props {
  closeCallback: () => void;
  saveCallback: () => void;
}

const Footer = ({ closeCallback, saveCallback }: Props) => {
  return (
    <div className='p-3 rounded-b-lg flex items-center justify-end gap-3'>
      <button
        className='bg-slate-100 px-2 py-1 text-slate-900 rounded'
        onClick={closeCallback}
      >
        Close
      </button>
      <button
        className='bg-red-900 px-2 py-1 text-slate-50 rounded'
        onClick={saveCallback}
      >
        Confirm
      </button>
    </div>
  );
};

export default Footer;
