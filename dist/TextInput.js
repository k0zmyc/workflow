import { useState, useMemo, useCallback } from 'react';
import { CreateDelayer } from '../utils/CreateDelayer';

/**
 * Editable Text (input type="text")
 * @param {Object} props - The props object.
 * @param {string} props.id - Mandatory identification, often related to the id of the entity.
 * @param {string} props.value - The value of the input.
 * @param {string} props.placeholder - The value to display as help if the text is not displayed.
 * @param {Function} props.onChange - Delayed callback notifying about the change.
 * @returns {JSX.Element} - A JSX element representing the TextInput component.
 */
export const TextInput = ({
  id,
  value,
  onChange,
  placeholder
}) => {
  const [localValue, setLocalValue] = useState(value);
  const delayer = useMemo(() => CreateDelayer(), [id]);
  const localOnChange = useCallback(e => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    if (onChange) {
      delayer(() => onChange(newValue));
    }
  }, [id, onChange]);
  return /*#__PURE__*/React.createElement("input", {
    className: "form-control",
    placeholder: placeholder,
    value: localValue,
    onChange: localOnChange
  });
};