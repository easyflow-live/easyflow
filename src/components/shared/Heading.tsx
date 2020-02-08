interface HeadingProps {
  text: string;
}

const Heading = ({ text }: HeadingProps) => (
  <h2 className='text-white text-xl'>{text}</h2>
);

export default Heading;
