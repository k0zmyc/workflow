import { useState, useCallback } from 'react';

/**
 * This is Save Button.
 * @param {*} children
 * @param {() => void} onClick
 * @returns 
 */
export const SaveButton = ({children, onClick}) => {

    
    return(
        <button className='btn btn-sm btn-success' onClick={onClick}>{children}</button>
    )
}