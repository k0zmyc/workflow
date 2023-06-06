import { authorizedFetch } from './authorizedFetch'


export const WorkflowQueryLargeJSON = (id) => ({
    "query":
        `query ($id: ID!) {
            workflowById(id: $id) {
                id, name, lastchange
                states{
                    id
                    name
                    lastchange
                    nextTransitions{
                        id
                        name
                    }
                }
                transitions{
                    id
                    name
                    lastchange
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