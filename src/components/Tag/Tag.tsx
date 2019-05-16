import './Tag.scss';

const Tag = ({ title, color, bgcolor, tagStyle, ...otherProps }) => {
  const style = {
    color: color || 'white',
    backgroundColor: bgcolor || '#3f51b5',
    ...tagStyle,
  };
  return (
    <span style={style} className='tag' {...otherProps}>
      {title}
    </span>
  );
};

export default Tag;
