import {useState} from 'react';
import { Link } from 'react-router-dom';

// Hooks
import {useLogin} from '../hooks/useLogin';

const Login = () => {
	const [formData, setFormData] = useState({email: '', password:''})

	const {login, isLoading} = useLogin()

	const handleInput = (e:React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData(prevData => {
			return{
				...prevData,
				[name]:value
			}
		})
	}

	const handleSubmit = async(e:React.MouseEvent<HTMLFormElement>) =>{
		e.preventDefault()

		await login(formData.email, formData.password)
	}

	return (
		<div className="mt-[60px] w-[100%] h-[calc(100vh-116px)]">
			<form className="flex flex-col p-[30px] gap-[20px] max-w-[400px] mx-auto rounded-lg bg-slate-700 text-white font-bold" onSubmit={handleSubmit}>
				<h1 className="text-4xl font-bold text-center">LOGIN</h1>
				<div className="flex flex-col gap-[10px]">
					<label htmlFor="email" className="text-xl">Email:</label>
					<input
						className="py-[5px] px-[10px] rounded-lg bg-slate-600"
						type="email"
						name="email"
						id="email"
						value={formData.email}
						onChange={(e) => handleInput(e)}
					/>
				</div>

				<div className="flex flex-col gap-[10px]">
					<label htmlFor="password" className="text-xl">Password:</label>
					<input
						className="py-[5px] px-[10px] rounded-lg bg-slate-600"
						type="password"
						name="password"
						id="password"
						value={formData.password}
						onChange={(e) => handleInput(e)}
					/>
				</div>

				<button className="bg-slate-600 hover:bg-slate-500 transition-bg duration-150 text-white px-[30px] py-[5px] rounded-lg font-bold self-center w-[100%]" disabled={isLoading}>Login</button>
				<Link to="/signup" className="self-center">Need an Account? Sign Up</Link>
			</form>
		</div>
	)
}

export default Login