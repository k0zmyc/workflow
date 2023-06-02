import { AuthorizedFetch } from './AuthorizedFetch'

/**
 * Funkce, ktera id namapuje na json predstavujici "velky" (podrobny) dotaz na server
 * @returns 
 */
export const WorkflowQueryJSON = () => ({
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
export const WorkflowQuery = () =>
AuthorizedFetch('/gql', {
        body: JSON.stringify(WorkflowQueryJSON()),
    })