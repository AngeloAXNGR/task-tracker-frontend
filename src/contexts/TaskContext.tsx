import {createContext, useReducer} from 'react';

import {TaskContextType, TaskContextProviderProps, TaskAction, TaskType } from '../types/task';



export const TaskContext = createContext({} as TaskContextType)

export const taskReducer = (state:any, action: TaskAction) => {
	switch(action.type){
		case 'SET_TASKS':
			return{
				tasks: action.payload
			}
		
		case 'DELETE_TASK':
			return{
				tasks: state.tasks.filter((task:TaskType) => task._id !== action.payload._id)
			}
		default:
			return state
	}
}

export const TaskContextProvider = (({children}: TaskContextProviderProps) => {
	const [state, dispatch] = useReducer(taskReducer, {
		tasks:null
	})
	return(
		<TaskContext.Provider value={{...state, dispatch}}>
			{children}
		</TaskContext.Provider>
	)
})