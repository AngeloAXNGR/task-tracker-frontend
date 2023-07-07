import {createContext, useReducer, useState} from 'react';

// Types
import { TaskType, TaskContextType, TaskContextProviderProps, TaskAction  } from '../types/task';

export const TaskContext = createContext({} as TaskContextType)

const sortTasks = (tasks:TaskType[]) => {
	return tasks.sort((a:TaskType,b:TaskType) =>(a.priority > b.priority) ? 1 : ((b.priority > a.priority) ? -1 : 0))
}

export const taskReducer = (state:any, action: TaskAction) => {
	switch(action.type){
		case 'SET_TASKS':
			return{
				tasks: action.payload
			}
		
		case 'CREATE_TASK':
			return{
				tasks: sortTasks([action.payload, ...state.tasks])
			}	
		case 'UPDATE_TASK':
			return{
				tasks:sortTasks([action.payload, ...state.tasks.filter((task:TaskType) => task._id !== action.payload._id)])
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


	const [taskOpen, setTaskOpen] = useState(false);

	const [selectedTask, setSelectedTask] =  useState<TaskType>();

	const toggleTaskView = (e:React.MouseEvent<HTMLButtonElement | HTMLDivElement>, _id:string) => {
		e.stopPropagation();
		setTaskOpen(prevTaskOpen => {return !prevTaskOpen})
		const test = state.tasks.filter((task:TaskType) => task._id === _id)[0]
		setSelectedTask(test)

	}

	return(
		<TaskContext.Provider value={{...state, dispatch, toggleTaskView, taskOpen, selectedTask}}>
			{children}
		</TaskContext.Provider>
	)
})