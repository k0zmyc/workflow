import { authorizedFetch } from './authorizedFetch'


export const WorkflowQuerySmallJSON = (id) => ({
    "query":
        `query ($id: ID!) {
            workflowById(id: $id) {
                id, name, lastchange
                states{
                    id
                    name
                }
                transitions{
                    id
                    name
                }
            }
        }`,
    "variables": {"id": id}
})

export const WorkflowQuerySmall = (id) =>
    authorizedFetch('/gql', {
        body: JSON.stringify(WorkflowQuerySmallJSON(id)),
    })