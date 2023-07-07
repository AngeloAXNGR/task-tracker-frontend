import {createContext, useReducer, useEffect} from 'react';
import Cookies from 'universal-cookie';

// Types
import { AuthContextType, AuthAction, AuthContextProviderProps } from '../types/auth';



export const AuthContext = createContext({} as AuthContextType)

// reducer function
export const authReducer = (state:any, action:AuthAction) => {
	switch(action.type){
		case 'LOGIN':
			return{
				user:action.payload
			}
		case 'LOGOUT':
			return{
				user:null
			}
		default: return state
	}
}

export const AuthContextProvider = (({children}:AuthContextProviderProps) => {
	const [state, dispatch] = useReducer(authReducer, {
		user:null
	})

	const cookies = new Cookies()
	useEffect(() => {
		// Alternative to localStorage
		const user = cookies.get('user')

		if(user){
			dispatch({type:'LOGIN', payload:user})
		}
	},[])

	return(
		<AuthContext.Provider value={{...state, dispatch}}>
			{children}
		</AuthContext.Provider>
	)
})

