import { createSlice } from "@reduxjs/toolkit";

const projectFormSlice = createSlice({
	name:'projectForm',
	initialState: {
		title:"",
		activeProject: "",
		addProjectForm: false,
		editProjectForm: false,
	},
	reducers:{
		changeProjecTitle(state, action){
			state.title = action.payload
		},
		changeActiveProject(state, action){
			state.activeProject = action.payload
		},
		toggleAddProjectForm(state, action){
			state.addProjectForm = action.payload
		},
		toggleEditProjectForm(state, action){
			state.editProjectForm = action.payload
		},
	}
})

export const {changeProjecTitle, changeActiveProject, toggleAddProjectForm, toggleEditProjectForm} = projectFormSlice.actions;

export const projectFormReducer = projectFormSlice.reducer;