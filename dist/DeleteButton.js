import { useState, useCallback } from 'react';

/**
 * Button component for deleting an item.
 * @param {Object} props - The props object.
 * @param {Function} props.onClick - The callback function for the button click event.
 * @returns {JSX.Element} - A JSX element representing the DeleteButton component.
 */
export const DeleteButton = ({
  children,
  onClick
}) => {
  //vnitrni stavova promenna definujici, zda je cervene tlacitko zobrazene nebo neni
  const [state, setState] = useState(0);

  //nastavi, ze se cervene tlacitko nezobrazuje
  const setState0 = useCallback(() => setState(0));

  //nastavi, ze se cervene tlacitko zobrazuje
  const setState1 = useCallback(() => setState(1));
  if (state === 0) {
    //cervene tlacitko nema byt zobrazeno
    return /*#__PURE__*/React.createElement("button", {
      className: "btn btn-sm btn-warning",
      onClick: setState1
    }, children);
  } else {
    //cervene tlacitko ma byt zobrazeno
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
      className: "btn btn-sm btn-warning",
      onClick: setState0
    }, children), /*#__PURE__*/React.createElement("button", {
      className: "btn btn-sm btn-danger",
      onClick: onClick
    }, children));
  }
};