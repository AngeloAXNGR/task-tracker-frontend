import {Link} from 'react-router-dom';

// Hooks
import { useLogout } from '../hooks/useLogout';
import useAuthContext from '../hooks/useAuthContext';


const Header = () => {
	const {user} = useAuthContext();
	const {logout} = useLogout();

	const handleClick = () => {
		logout();
	}
	return (
		<div className="flex items-center justify-between px-[20px] py-[10px] bg-slate-950 ">
			<Link to="/" className="text-white text-3xl font-bold">Task Tracker</Link>
			<div>
				{user &&
					(<div className="flex items-center gap-[20px]">
						<span>{user.email}</span>
						<button onClick={handleClick} className="border-2 border-green-500 text-green-500 rounded-lg px-[10px] py-[5px]">Logout</button>
					</div>)
				}

				{!user && 
					(<div className="flex items-center gap-[20px]">
						<Link to="/login">Login</Link>
						<Link to="/signup">Signup</Link>
					</div>)
				}
			</div>
		</div>
	)
}

export default Header