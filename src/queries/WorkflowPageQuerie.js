import { authorizedFetch } from './authorizedFetch'

/**
 * Funkce, ktera id namapuje na json predstavujici "velky" (podrobny) dotaz na server
 * @returns 
 */
export const WorkflowPageQueryJSON = () => ({
    "query":
        `query {
          workflowPage {
            id
            name
            lastchange
            states {
              id
              name
              lastchange
              nextTransitions {
                id
                name
              }
            }
            transitions {
              id
              name
              lastchange
              source {
                id
                name
              }
              destination {
                id
                name
              }
            }   
          }
        }`,
})

/**
 * Realizace dotazu na server. Vyuziva autorizedFetch (zapouzdreni)
 * @returns 
 */
export const WorkflowPageQuery = () =>
    authorizedFetch('/gql', {
        body: JSON.stringify(WorkflowPageQueryJSON()),
    })