// import { createSlice } from "@reduxjs/toolkit";
// import data from "../data.json";

// // Extract the projects list from the imported data file
// const statesList = data.data.states

// // Set the initial state of the projects slice to the projectsList
// const initialStateValue = statesList

// // A Redux slice for managing the state of the projects
// export const projectsSlice = createSlice({
//     name: "projects",
//     initialState: initialStateValue,
//     reducers: {
//         // A reducer that adds a new project to the projects state array
//         addProject: (state, action) => {
//             const newProject = action.payload
    
//             state.push(newProject)
//             return state
//         },

//         updateProject: (state, action) => {
//             const updatedProject = action.payload

//             state = state.map(project => project.id === updatedProject.id ? {...project, ...updatedProject} : project)
//             return state
//         },

//         loadProjects: (state, action) => {
//             const projects = action.payload
//             state = [...state, ...projects]
//             return state
//         }
//     },
// })

// // Export the addProject action creator from the projectsSlice
// export const { addProject, updateProject, loadProjects } = projectsSlice.actions

// // Export the projectsSlice reducer
// export default projectsSlice.reducer