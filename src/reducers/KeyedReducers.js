import { v1 as uuid1 } from 'uuid';

/**
 * State function that adds an item to the dictionary.
 * @param {Object} state - The current state of the dictionary.
 * @param {Object} action - The Redux action object containing the payload.
 * @returns {Object} - The updated state after adding the item to the dictionary.
 */
export const CreateItem = (state, action) => {
    const item = action.payload;
    const id = item['id'] || uuid1()
    if (!item['id']) {
        item['id'] = id
    }
    
    state[id] = item
    return state
}

/**
 * State function that deletes an item from the dictionary.
 * @param {Object} state - The current state of the dictionary.
 * @param {Object} action - The Redux action object containing the payload.
 * @returns {Object} - The updated state after removing the item from the dictionary.
 */
export const DeleteItem = (state, action) => {
    const item = action.payload;
    delete state[item.id]

    return state
}

/**
 * State function that replaces an item in the dictionary.
 * @param {Object} state - The current state of the dictionary.
 * @param {Object} action - The Redux action object containing the payload.
 * @returns {Object} - The updated state after replacing the item in the dictionary.
 */
export const ReplaceItem = (state, action) => {
    const newItem = action.payload;
    state[newItem.id] = newItem

    return state
}

/**
 * State function that updates an item in the dictionary.
 * @param {Object} state - The current state of the dictionary.
 * @param {Object} action - The Redux action object containing the payload.
 * @returns {Object} - The updated state after updating the item in the dictionary.
 */
export const UpdateItem = (state, action) => {
    const newItem = action.payload;
    const oldItem = state[newItem.id]
    state[newItem.id] = {...oldItem, ...newItem}

    return state
}    

/**
 * State function that works with the 'selectedId' key in the dictionary.
 * @param {Object} state - The current state of the dictionary.
 * @param {Object} action - The Redux action object containing the payload.
 * @returns {Object} - The updated state after setting the 'selectedId' in the dictionary.
 */
export const SelectItem = (state, action) => {
    const item = action.payload
    state.selectedId = item.id

    return state
}