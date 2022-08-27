import { ReactNode } from "react";
import { MdClose } from "react-icons/md";

const Modal = ({ Footer, Form }: { Footer?: ReactNode; Form: ReactNode }) => {
  return (
    <div className='fixed top-0 left-0 flex items-center justify-center w-screen h-screen'>
      <div className='bg-slate-50 min-w-[25%] rounded-lg'>
        <div className='bg-slate-100 p-3 rounded-t-lg text-slate-900'>
          <div className='flex items-center justify-between'>
            <h3 className='font-bold'>New Folder</h3>
            {/* <MdClose className='text-lg cursor-pointer' /> */}
          </div>
        </div>
        {Form}
        {Footer}
      </div>
    </div>
  );
};

export default Modal;
