import { createSlice } from "@reduxjs/toolkit";


const taskFormSlice = createSlice({
	name: 'taskForm',
	initialState: {
		formData:{
			title:'',
			dueDate:'',
			priority: 'P1',
			description:''
		},
		addTaskForm: false,
		editTaskForm: false,
		viewTaskForm: false,
		activeTask:"",
	},
	reducers:{
		changeFormData(state:any, action){
			const {name, value} = action.payload;
			state.formData[name] = value;
		},
		resetForm(state){
			state.formData = {title:'', dueDate:'', priority:'P1', description:''}
		},
		toggleAddTaskForm(state,action){
			state.addTaskForm = action.payload
		},
		getTaskData(state, action){
			state.formData = action.payload
		},
		toggleEditTaskForm(state, action){
			state.editTaskForm = action.payload
		},
		changeActiveTask(state, action){
			state.activeTask = action.payload
		},
		toggleViewTaskForm(state, action){
			state.viewTaskForm = action.payload
		}
	}
})


export const {
	changeFormData, 
	resetForm, 
	toggleAddTaskForm, 
	getTaskData, 
	toggleEditTaskForm, 
	changeActiveTask,
	toggleViewTaskForm
} = taskFormSlice.actions;

export const taskFormReducer = taskFormSlice.reducer;