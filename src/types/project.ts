import { UserType } from "./auth"

export type ProjectType = {
	_id:string,
	title:string,
	createdAt?:string,
	updatedAt?:string
}

export type ProjectForm = {
	title:string
}


export type ProjectApiEndpointArgs = {
	user:UserType
	formData?:ProjectForm
	project?:ProjectType
	projectId?: string
}