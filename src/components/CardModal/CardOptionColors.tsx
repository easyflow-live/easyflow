import { useBoardsData } from '../../store';
import { observer } from 'mobx-react-lite';

const CardOptionColors = ({ onClick, onKeyDown }) => {
  const colors = useBoardsData(s => s.colors);

  return colors.length > 0 ? (
    <div className='modal-color-picker' onKeyDown={onKeyDown}>
      {colors.map(color => (
        <button
          key={color.id}
          style={{ background: color.data.code }}
          className='color-picker-color'
          title={color.data.name}
          onClick={() => onClick({ ...color.data, ref: color.ref })}
        />
      ))}
    </div>
  ) : null;
};

export default observer(CardOptionColors);
