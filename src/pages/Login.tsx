import {useState} from 'react';


const Login = () => {
	const [formData, setFormData] = useState({email: '', password:''})

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
	}

	return (
		<div className="mt-[60px] w-[100%] h-[calc(100vh-116px)]">
			<form className="flex flex-col p-[30px] max-w-[500px] mx-auto rounded-lg bg-white" onSubmit={handleSubmit}>
				<h1 className="text-4xl font-bold mb-[20px]">Login</h1>
				<div className="flex flex-col gap-[10px]">
					<label htmlFor="email" className="text-xl">Email:</label>
					<input
						className="border-gray-400 border-2 py-[5px] px-[10px] rounded-lg"
						type="email"
						name="email"
						id="email"
						value={formData.email}
						onChange={(e) => handleInput(e)}
					/>
				</div>

				<div className="flex flex-col gap-[10px] mt-[20px]">
					<label htmlFor="password" className="text-xl">Password:</label>
					<input
						className="border-gray-400 border-2 py-[5px] px-[10px] rounded-lg"
						type="password"
						name="password"
						id="password"
						value={formData.password}
						onChange={(e) => handleInput(e)}
					/>
				</div>

				<button className="bg-green-600 text-white self-start mt-[20px] px-[30px] py-[10px] rounded-lg font-bold">Login</button>
			</form>
		</div>
	)
}

export default Login