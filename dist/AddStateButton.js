import { useState, useCallback } from 'react';

/**
 * This is Add Button.
 * @param {*} children
 * @param {() => void} onClick
 * @returns 
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