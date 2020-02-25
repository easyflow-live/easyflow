import { observer } from 'mobx-react-lite';
import { KeyboardEvent } from 'react';

import { useBoardsStore } from '../../store';

interface CardOptionColorsProps {
  onClick: (props: any) => void;
  onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void;
}

const CardOptionColors = ({ onClick, onKeyDown }: CardOptionColorsProps) => {
  const { colors } = useBoardsStore();

  return colors.length > 0 ? (
    <div className='modal-color-picker' onKeyDown={onKeyDown}>
      {colors.map(color => (
        <span
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
