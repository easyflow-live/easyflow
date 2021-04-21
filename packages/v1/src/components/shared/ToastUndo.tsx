interface ToastUndoProps {
  title: string;
  id: string;
  undo: (id: string) => void;
  closeToast?: () => void;
}

const ToastUndo = ({ title, id, undo, closeToast }: ToastUndoProps) => {
  const handleClick = () => {
    undo(id);
    closeToast();
  };

  return (
    <div className='mx-2' id={`undo-toast-${id}`}>
      <h3 className='text-base flex justify-between items-center'>
        {title}{' '}
        <button
          className='text-base text-pink-500 hover:text-white hover:bg-pink-500 p-1 rounded'
          onClick={handleClick}
        >
          UNDO
        </button>
      </h3>
    </div>
  );
};

export default ToastUndo;
