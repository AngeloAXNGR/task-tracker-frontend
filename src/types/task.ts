export type TaskType = {
	_id:string,
	title:string,
	dueDate:string,
	priority:string,
	description:string,
	createdAt:string,
	updatedAt:string
}

export type TaskContextType = {
	tasks: TaskType[],
	dispatch:any,
	activeTask: string,
	setActiveTask: React.Dispatch<React.SetStateAction<string>>
 }
 
 export type TaskContextProviderProps = {
	 children:React.ReactNode
 }
 
 export type TaskAction = {
	 type:string,
	 payload:TaskType
 }