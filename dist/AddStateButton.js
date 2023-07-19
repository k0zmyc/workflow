import { useState, useCallback } from 'react';

/**
 * Button component for adding state.
 * @param {Object} props - The props object.
 * @param {Function} props.onClick - The callback function for the button click event.
 * @returns {JSX.Element} - A JSX element representing the AddStateButton component.
 */
export const AddStateButton = ({
  children,
  onClick
}) => {
  return /*#__PURE__*/React.createElement("button", {
    className: "btn btn-sm btn-success",
    onClick: onClick
  }, "Add state");
};