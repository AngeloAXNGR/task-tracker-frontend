import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const domainName = import.meta.env.VITE_DOMAIN_NAME;

// Types
import { ProjectType, ProjectApiEndpointArgs } from '../../types/project';
import { UserType } from '../../types/auth';


const projectsApi = createApi({
	reducerPath: 'projects',
	baseQuery: fetchBaseQuery({
		baseUrl: domainName
	}),
	tagTypes: ['UserProjects', 'Project'],
	endpoints(builder){
		return{
			fetchProjects: builder.query({
				providesTags: (result, error, args) => {
					const tags = result.map((project:ProjectType) => {
						return {type: 'Project', id: project._id}
					})
					tags.push({type:'UserProjects'})
					return tags
				},
				query: (user:UserType) => {
					return{
						url:'/api/projects',
						method:'GET',
						headers:{
							'Authorization': `Bearer ${user.token}`, 
						}
					}
				}
			}),

			addProject: builder.mutation({
				invalidatesTags: [{type:'UserProjects'}],
				query:({user, formData}:ProjectApiEndpointArgs) => {
					return{
						url:'/api/projects',
						method:'POST',
						headers:{
							'Authorization': `Bearer ${user.token}`
						},
						body:{
							title: formData?.title
						}
					}
				}
			}),

			removeProject: builder.mutation({
				invalidatesTags:(result, error, {project}:ProjectApiEndpointArgs) => {
					return [{type:'Project', id:project?._id}]
				},
				query:({user,project}:ProjectApiEndpointArgs) => {
					return{
						url: `/api/projects/${project?._id}`,
						method:'DELETE',
						headers:{
							'Authorization': `Bearer ${user.token}`
						}
					}
				}
			}),

			updateProject: builder.mutation({
				invalidatesTags:(result, error, {project}:ProjectApiEndpointArgs) => {
					return [{type:'Project', id:project?._id}]
				},
				query:({user,projectId, formData}:ProjectApiEndpointArgs) => {
					return{
						url: `/api/projects/${projectId}`,
						method:'PATCH',
						headers:{
							'Authorization': `Bearer ${user.token}`
						},
						body:{
							title: formData?.title
						}
					}
				}
			})

		}
	}
})

export const {useFetchProjectsQuery, useAddProjectMutation, useRemoveProjectMutation, useUpdateProjectMutation} = projectsApi;

export { projectsApi }