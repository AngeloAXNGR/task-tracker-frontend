import { useContext } from 'react';

// Contexts
import { ProjectFormContext } from "../contexts/ProjectFormContext";


export const useProjectFormContext = () => {
	const context = useContext(ProjectFormContext);

	if(!context){
		throw Error('useProjectFormContext must be used inside a ProjectFormContextProvider');
	}

	return context
}