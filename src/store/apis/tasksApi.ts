import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const domainName = import.meta.env.VITE_DOMAIN_NAME;


// Types 
import { UserType } from './projectsApi';
import { TaskType } from '../../types/task';
import { TaskForm } from '../../contexts/FormContext';

type TaskEndpointsArgsType = {
	user?:UserType,
	task?:TaskType,
	activeProject?: string,
	formData?: TaskForm,
	taskId?: string
}

const tasksApi = createApi({
	reducerPath: 'Tasks',
	baseQuery: fetchBaseQuery({
		baseUrl: domainName
	}),
	tagTypes:['Task'],
	endpoints(builder){
		return{
			fetchTasks: builder.query({
				providesTags: ['Task'],
				query: ({user, activeProject}:TaskEndpointsArgsType) => {
					return{
						url:`/api/projects/${activeProject}/tasks`,
						method:'GET',
						headers:{
							'Authorization': `Bearer ${user!.token}`, 
						}
					}
				}
			}),

			addTask: builder.mutation({
				invalidatesTags: ['Task'],
				query: ({activeProject, formData}:TaskEndpointsArgsType) => {
					return{
						url:`/api/projects/${activeProject}/tasks`,
						method:'POST',
						body:{
							title:formData!.title,
							dueDate: formData!.dueDate,
							priority:formData!.priority,
							description:formData!.description
						}
					}
				}
			}),

			removeTask: builder.mutation({
				invalidatesTags: ['Task'],
				query: ({task}:TaskEndpointsArgsType) => {
					return{
						url: `/api/tasks/${task!._id}`,
						method:'DELETE'
					}
				}
			}),

			updateTask: builder.mutation({
				invalidatesTags: ['Task'],
				query: ({taskId, formData}:TaskEndpointsArgsType) => {
					return{
						url: `/api/tasks/${taskId}`,
						method: 'PATCH',
						body:{
							title:formData!.title,
							dueDate: formData!.dueDate,
							priority:formData!.priority,
							description:formData!.description
						}
					}
				}
			})
		}
	}
})


export const { useFetchTasksQuery, useAddTaskMutation, useRemoveTaskMutation, useUpdateTaskMutation } = tasksApi;

export {tasksApi}