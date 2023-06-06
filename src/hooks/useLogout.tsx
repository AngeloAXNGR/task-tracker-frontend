import useAuthContext from "./useAuthContext";
import Cookies from 'universal-cookie';

export const useLogout = () => {
	const {dispatch} = useAuthContext();

	const cookies = new Cookies();


	const logout = () => {
		// remove token from localstorage upon logout
		// localStorage.removeItem('user');

		cookies.remove('user')

		// dispatch logout action
		dispatch({type: 'LOGOUT'})
	}

	return {logout}
}