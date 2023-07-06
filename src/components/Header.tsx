import {Link} from 'react-router-dom';

// Hooks
import { useLogout } from '../hooks/useLogout';
import useAuthContext from '../hooks/useAuthContext';
// import { useProjectContext } from '../hooks/useProjectContext';
import { useFormContext } from '../hooks/useFormContext';


const Header = () => {
	const {user} = useAuthContext();
	const {logout} = useLogout();

	const {setActiveProject} = useFormContext();

	const handleClick = () => {
		setActiveProject("")
		logout();
	}
	return (
		<div className="flex items-center justify-between px-[20px] py-[10px] bg-slate-950 ">
			<Link to="/" className="text-white text-3xl font-bold">Task Tracker</Link>
			<div>
				{user &&
					(<div className="flex items-center gap-[20px]">
						<span className="text-white">{user.email}</span>
						<button onClick={handleClick} className="font-bold border-2 border-green-500 text-green-500 rounded-lg px-[10px] py-[5px] hover:bg-green-500 hover:text-white transition-all duration-150">Logout</button>
					</div>)
				}
			</div>
		</div>
	)
}

export default Header