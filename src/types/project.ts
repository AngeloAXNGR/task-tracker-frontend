export type ProjectType = {
	_id:string,
	title:string,
	createdAt:string,
	updatedAt:string
}


export type ProjectContextType = {
 projects:ProjectType[],
 dispatch:any,
 activeProject: string,
 setActiveProject: React.Dispatch<React.SetStateAction<string>>
}


export type ProjectContextProviderProps = {
	children:React.ReactNode;
}

export type ProjectAction = {
	type:string,
	payload:ProjectType
}
