import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const domainName = import.meta.env.VITE_DOMAIN_NAME;


// Types 
import { TaskEndpointsArgs } from '../../types/task';

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
				query: ({user, activeProject}:TaskEndpointsArgs) => {
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
				query: ({activeProject, formData}:TaskEndpointsArgs) => {
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
				query: ({task}:TaskEndpointsArgs) => {
					return{
						url: `/api/tasks/${task!._id}`,
						method:'DELETE'
					}
				}
			}),

			updateTask: builder.mutation({
				invalidatesTags: ['Task'],
				query: ({taskId, formData}:TaskEndpointsArgs) => {
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