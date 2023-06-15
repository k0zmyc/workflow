import { useState, useCallback } from 'react';

/**
 * This is Add Button.
 * @param {*} children
 * @param {() => void} onClick
 * @returns 
 */
export const AddButton = ({children, onClick}) => {
    return(
        <button className='btn btn-sm btn-success'>Add</button>
    )
}