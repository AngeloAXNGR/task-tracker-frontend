import { useReducer, createContext, useState } from 'react';

// Types
import { ProjectType, ProjectContextType, ProjectContextProviderProps, ProjectAction} from '../types/project';

export const ProjectContext = createContext ({} as ProjectContextType)

const sortProjects = (projects:ProjectType[]) => {
	return projects.sort((a:ProjectType,b:ProjectType) =>(a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))
}

export const projectsReducer = (state:any, action:ProjectAction) => {
	switch(action.type){
		case 'SET_PROJECTS':
			return{
				projects:action.payload
			}

		case 'CREATE_PROJECT':
			return{
				projects: sortProjects([action.payload, ...state.projects])
			}

		case 'UPDATE_PROJECT':
			return{
				projects:sortProjects([action.payload, ...state.projects.filter((project:ProjectType) => project._id !== action.payload._id)])
			}

		case 'DELETE_PROJECT':
			return{
				projects: state.projects.filter((project:ProjectType) => project._id !== action.payload._id)
			}
		
		default:
			return state
	}
}

export const ProjectContextProvider = (({children}: ProjectContextProviderProps) => {
	const [state, dispatch] = useReducer(projectsReducer, {
		projects: null
	})

	const [activeProject, setActiveProject] = useState('')

	return(
	<ProjectContext.Provider value={{...state, dispatch, activeProject, setActiveProject}}>		
		{children}
	</ProjectContext.Provider>
	)
})