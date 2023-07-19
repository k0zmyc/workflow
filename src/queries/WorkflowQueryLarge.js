import { authorizedFetch } from './authorizedFetch'

/**
 * Generates a GraphQL query in JSON format to fetch data for a specific workflow by its ID.
 *
 * @function
 * @param {string} id - The ID of the workflow to fetch.
 * @returns {Object} - The GraphQL query object in JSON format.
 */
export const WorkflowQueryLargeJSON = (id) => ({
    "query":
        `query ($id: ID!) {
            workflowById(id: $id) {
                id
                name 
                lastchange
                states{
                    id
                    name
                    lastchange
                    valid
                    nextTransitions{
                        id
                        name
                        valid
                        lastchange
                        source{
                            id
                            name
                            lastchange
                        }
                        destination{
                            id
                            name
                            lastchange
                        }
                    }
                    previousTransitions{
                        id
                        name
                        valid
                        lastchange
                        source{
                            id
                            name
                            lastchange
                        }
                        destination{
                            id
                            name
                            lastchange
                        }
                    }
                    users{
                        id
                        lastchange
                        user{
                            id
                            name
                            surname
                        }
                    }
                    roletypes{
                        id
                        lastchange
                        roleType{
                            id
                            lastchange
                            name
                        }
                    }
                }
                transitions{
                    id
                    name
                    lastchange
                    valid
                    source{
                        id
                        name
                    }
                    destination{
                        id
                        name
                    }
                }
            }
        }`,
    "variables": {"id": id}
})

export const WorkflowQueryLarge = (id) =>
    authorizedFetch('/gql', {
        body: JSON.stringify(WorkflowQueryLargeJSON(id)),
    })