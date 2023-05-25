import { useContext } from 'react';

// Contexts
import { ProjectContext } from "../contexts/ProjectContext";


export const useProjectContext = () => {
	const context = useContext(ProjectContext);

	if(!context){
		throw Error('useProjectContext must be used inside a ProjectContextProvider');
	}

	return context
}