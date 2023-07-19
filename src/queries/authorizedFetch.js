const globalFetchParams = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    redirect: 'follow', // manual, *follow, error
}

/**
 * Encapsulates the fetch function and creates a communication layer for server requests.
 * @param {string} path - The URL path to send the request.
 * @param {Object} params - The fetch parameters to be passed in the request.
 * @returns {Promise<Response>} - A Promise that resolves with the response to the request.
 */
export const authorizedFetch = (path, params) => {
    const newParams = {...globalFetchParams, ...params} // allow owerwrite default parameters (globalFetchParams)
    const overridenPath = '/api/gql'
    return (
        fetch(overridenPath, newParams) //params.header should be extended with Authorization TOKEN
    )
}
