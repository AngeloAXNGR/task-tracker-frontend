import { UserType } from "./auth"

export type TaskType = {
	_id:string,
	title:string,
	dueDate:string,
	priority:string,
	description:string,
	createdAt?:string,
	updatedAt?:string
}

export type TaskForm = {
	title:string,
	dueDate:string,
	priority:string,
	description:string,
}

export type TaskContextType = {
	tasks: TaskType[],
	dispatch:any,
	toggleTaskView: (e:React.MouseEvent<HTMLButtonElement | HTMLDivElement>, _id:string) => void,
	taskOpen:boolean,
	selectedTask: TaskType
 }
 
 export type TaskContextProviderProps = {
	 children:React.ReactNode
 }
 
 export type TaskAction = {
	 type:string,
	 payload:TaskType
 }

export type TaskEndpointsArgs = {
	user?:UserType,
	task?:TaskType,
	activeProject?: string,
	formData?: TaskForm,
	taskId?: string
}