import { authorizedFetch } from './authorizedFetch'

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