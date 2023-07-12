import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from  '@reduxjs/toolkit/dist/query';

// API's
import { projectsApi } from './apis/projectsApi';
import { tasksApi } from './apis/tasksApi';

// Slice Reducer Functions
import { 
	projectFormReducer, 
	changeProjecTitle,
	changeActiveProject, 
	toggleAddProjectForm, 
	toggleEditProjectForm } from './slices/projectFormSlice';


import {
	taskFormReducer,
	changeFormData,
	resetForm,
	toggleAddTaskForm,
	getTaskData,
	toggleEditTaskForm,
	changeActiveTask,
	toggleViewTaskForm
} from './slices/taskFormSlice';

export const store = configureStore({
	reducer:{
		[projectsApi.reducerPath]: projectsApi.reducer,
		[tasksApi.reducerPath]:tasksApi.reducer,
		projectForm: projectFormReducer,
		taskForm: taskFormReducer,
	},
	middleware:(getDefaultMiddleware) => {
		return getDefaultMiddleware()
			.concat(projectsApi.middleware)
			.concat(tasksApi.middleware)
	}
})

setupListeners(store.dispatch)

export { useFetchProjectsQuery, useAddProjectMutation, useRemoveProjectMutation, useUpdateProjectMutation } from './apis/projectsApi';

export { useFetchTasksQuery, useAddTaskMutation, useRemoveTaskMutation, useUpdateTaskMutation } from './apis/tasksApi'


export { 
	changeProjecTitle, 
	changeActiveProject, 
	toggleAddProjectForm, 
	toggleEditProjectForm, 
	changeFormData, 
	resetForm,
	toggleAddTaskForm,
	getTaskData,
	toggleEditTaskForm,
	changeActiveTask,
	toggleViewTaskForm
} 