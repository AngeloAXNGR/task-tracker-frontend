import { useReducer, createContext } from 'react';

// Types
import { ProjectType,ProjectAction, ProjectContextType, ProjectContextProviderProps } from '../types/project';

export const ProjectContext = createContext ({} as ProjectContextType)

export const projectsReducer = (state:any, action:ProjectAction) => {
	switch(action.type){
		case 'SET_PROJECTS':
			return{
				projects:action.payload
			}

		case 'CREATE_PROJECT':
			return{
				projects: [action.payload, ...state.projects]
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

	return(
	<ProjectContext.Provider value={{...state, dispatch}}>		
		{children}
	</ProjectContext.Provider>
	)
})