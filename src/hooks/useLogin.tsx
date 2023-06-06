import { useState } from "react";
import useAuthContext from "./useAuthContext";
import Cookies from 'universal-cookie';
const domainName = import.meta.env.VITE_DOMAIN_NAME;

export const useLogin = () => {
	const [isLoading, setIsLoading] = useState<any>(null);

	const cookies = new Cookies();

	const {dispatch} = useAuthContext();

	const login = async(email:string, password:string) => {
		setIsLoading(true)

		const response = await fetch(`${domainName}/api/user/login`,{
			method:'POST',
			headers: {'Content-type': 'application/json'},
			body:JSON.stringify({email,password})
		})

		const json = await response.json();

		if(!response.ok){
			setIsLoading(false)
		}

		if(response.ok){
			cookies.set('user', json)

			// update auth context state
			dispatch({type:'LOGIN', payload:json})
			setIsLoading(false)
		}
	}

	return {login, isLoading}
}