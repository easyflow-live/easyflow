import './BoardLink.css';

export default ({ board, ...props }) => {
  return (
    <a
      className='board-link bg-gray-700 hover:bg-gray-600 shadow-lg rounded-lg p-4 m-2 w-full cursor-pointer break-words'
      {...props}
    >
      <span className='text-white'>{board.title}</span>
    </a>
  );
};
