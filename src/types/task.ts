export type TaskType = {
	_id:string,
	title:string,
	dueDate:string,
	priority:string,
	createdAt:string,
	updatedAt:string
}

export type TaskContextType = {
	tasks: TaskType[],
	dispatch:any,
 }
 
 export type TaskContextProviderProps = {
	 children:React.ReactNode
 }
 
 export type TaskAction = {
	 type:string,
	 payload:TaskType
 }