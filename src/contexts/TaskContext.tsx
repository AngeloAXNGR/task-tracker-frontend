import {createContext, useReducer} from 'react';

import {TaskContextType, TaskContextProviderProps, TaskAction } from '../types/task';



export const TaskContext = createContext({} as TaskContextType)

export const taskReducer = (state:any, action: TaskAction) => {
	switch(action.type){
		case 'SET_TASKS':
			return{
				tasks: action.payload
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