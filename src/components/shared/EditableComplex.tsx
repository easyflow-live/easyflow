import {
  ReactElement,
  useState,
  createContext,
  useContext,
  ReactChild,
  ChangeEvent,
  KeyboardEvent,
  cloneElement,
  Children,
  useEffect,
} from 'react';

import { Input } from '../shared';
import { InputProps } from './Input';

interface EditableContextProps {
  isDisabled: boolean;
  isEditing: boolean;
  placeholder: string;
  value: string;
  onRequestEdit: () => void;
  onKeyDown: (event: KeyboardEvent) => void;
  onSubmit: (value: string) => void;
  onCancel: (value: string) => void;
  onBlur: () => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const EditableContext = createContext<EditableContextProps>(null);

const useEditable = () => {
  const context = useContext(EditableContext);

  if (context === undefined) {
    throw new Error('useEditable must be used within a EditableProvider');
  }
  return context;
};

const EditableProvider = EditableContext.Provider;

interface ChildrenProps {
  onRequestEdit?: () => void;
  onSubmit?: () => void;
  onCancel?: () => void;
  isEditing?: boolean;
}

interface EditableProps {
  children:
    | ReactChild
    | string
    | ((childrenProps: ChildrenProps) => ReactElement);
  onSubmit?: (value: string) => void;
  onCancel?: (value: string) => void;
  isDisabled?: boolean;
  submitOnBlur?: boolean;
  cancelOnBlur?: boolean;
  submitOnEnter?: boolean;
  emptyValue?: boolean;
  editMode?: boolean;
  placeholder?: string;
  value?: string;
}

export const Editable = ({
  children,
  onSubmit,
  onCancel,
  isDisabled,
  submitOnBlur,
  cancelOnBlur,
  submitOnEnter = true,
  emptyValue,
  editMode,
  placeholder,
  value: _value,
}: EditableProps) => {
  const [isEditing, setIsEditing] = useState(editMode);
  const [value, setValue] = useState(_value || '');

  // Forces a prop change to the internal state
  useEffect(() => {
    setIsEditing(editMode);
  }, [editMode]);

  const handleSubmit = () => {
    if (!emptyValue && !value.trim()) return;

    setIsEditing(false);
    onSubmit && onSubmit(value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setIsEditing(false);
      return;
    }

    if (event.key === 'Enter' && submitOnEnter) {
      handleSubmit();
    }
  };

  const onRequestEdit = () => {
    if (!isDisabled) {
      setIsEditing(true);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setValue(_value);
    onCancel && onCancel(_value);
  };

  const handleBlur = () => {
    cancelOnBlur && handleCancel();
    submitOnBlur && handleSubmit();
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const childContext = {
    isDisabled,
    isEditing,
    placeholder,
    value,
    onRequestEdit,
    onKeyDown: handleKeyDown,
    onSubmit: handleSubmit,
    onCancel: handleCancel,
    onBlur: handleBlur,
    onChange: handleChange,
  };

  const editableChildren =
    typeof children === 'function'
      ? children({
          isEditing,
          onSubmit: handleSubmit,
          onCancel: handleCancel,
          onRequestEdit,
        })
      : children;

  return (
    <EditableProvider value={childContext}>{editableChildren}</EditableProvider>
  );
};

interface EditableInputProps extends InputProps {
  children?:
    | ReactElement
    | ((props: {
        value: string;
        placeholder: string;
        onBlur: () => void;
        onKeyDown: (event: KeyboardEvent) => void;
        onChange: (event: ChangeEvent<HTMLInputElement>) => void;
      }) => ReactElement);
}

export const EditableInput = ({ children, ...props }: EditableInputProps) => {
  const {
    isEditing,
    placeholder,
    value,
    onKeyDown,
    onBlur,
    onChange,
  } = useEditable();

  if (!isEditing) return null;

  return typeof children === 'function' ? (
    children({ value, placeholder, onBlur, onKeyDown, onChange })
  ) : (
    <Input
      autoFocus
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      type='text'
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      required
      {...props}
    />
  );
};

interface EditableTriggerProps {
  children: ReactElement;
}

export const EditableTrigger = ({ children }: EditableTriggerProps) => {
  const { isEditing, onRequestEdit } = useEditable();

  if (isEditing) return null;

  const elem = Children.only(children);

  const defaultProps = { onClick: onRequestEdit };

  const cloned = children ? cloneElement(elem, defaultProps) : null;

  return cloned;
};

interface EditablePreviewProps {
  children: ReactElement | ((props: { value: string }) => ReactElement);
}

export const EditablePreview = ({ children }: EditablePreviewProps) => {
  const { isEditing, value } = useEditable();

  if (isEditing) return null;

  const element =
    typeof children === 'function'
      ? children({ value })
      : cloneElement(Children.only(children), {
          children: value,
          title: value,
        });

  return element;
};
