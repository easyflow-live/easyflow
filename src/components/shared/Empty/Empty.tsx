import { ReactChild } from 'react';

interface EmptyProps {
  image: ReactChild;
  message: string;
  button?: ReactChild;
  messageClass?: string;
}

export const Empty = ({ image, message, button, messageClass }: EmptyProps) => (
  <div className='flex flex-col justify-center items-center h-full'>
    {image}
    <h3 className={`text-white text-2xl mb-5 ${messageClass}`}>{message}</h3>
    {button}
  </div>
);
