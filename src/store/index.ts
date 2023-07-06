import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from  '@reduxjs/toolkit/dist/query';

// API's
import { projectsApi } from './apis/projectsApi';
import { tasksApi } from './apis/tasksApi';

export const store = configureStore({
	reducer:{
		[projectsApi.reducerPath]: projectsApi.reducer,
		[tasksApi.reducerPath]:tasksApi.reducer
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
