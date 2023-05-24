import { authorizedFetch } from './authorizedFetch'


const WorkflowPageMutationJSON = (id, name, lastchange) => ({
    "query":
        `mutation {
            
        }`,
})

/**
 * Realizace dotazu na server. Vyuziva autorizedFetch (zapouzdreni)
 * @returns 
 */
export const WorkflowPageUpdateMutation = (props) =>
    authorizedFetch('/gql', {
        body: JSON.stringify(WorkflowPageMutationJSON(props.project.id, props.project.name, props.project.lastchange)),
    })