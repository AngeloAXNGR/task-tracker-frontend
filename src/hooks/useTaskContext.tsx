import { useContext } from 'react';

// Contexts
import { TaskContext } from "../contexts/TaskContext";


export const useTaskContext = () => {
	const context = useContext(TaskContext);

	if(!context){
		throw Error('useTaskContext must be used inside a TaskContextProvider');
	}

	return context
}