export type UserType = {
	email:string,
	token:string
}

export type AuthContextType = {
	user:any,
	dispatch: any
}

export type AuthAction = {
	type:string,
	payload: any
}

export type AuthContextProviderProps = {
	children: React.ReactNode
}