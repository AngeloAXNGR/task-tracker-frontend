import { useFormContext } from "../hooks/useFormContext";
import { useProjectContext } from "../hooks/useProjectContext";
import useAuthContext from "../hooks/useAuthContext";


const domainName = import.meta.env.VITE_DOMAIN_NAME;
const AddProjectForm = () => {
	const {toggleAddProjectForm, projectForm, handleProjectForm, setProjectForm} = useFormContext();
	const {dispatch} = useProjectContext();
	const {user} = useAuthContext();

	console.log(user.token);

	const createProject = async(e:React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		const title = projectForm.title
		const response = await fetch(`${domainName}/api/projects`, {
			method:'POST',
			headers:{
				'Content-type': 'application/json',
				'Authorization': `Bearer ${user.token}`
			},
			body: JSON.stringify({title})
		});

		const json = await response.json();

		if(response.ok){
			// Update Global State for Project
			dispatch({type:'CREATE_PROJECT', payload:json});
			toggleAddProjectForm(e);
			setProjectForm({title:''})
		}
	}
	
	return (
		<div className="fixed top-0 flex items-center justify-center w-full h-screen">
			<div className="w-[100%] fixed top-0 h-screen bg-black opacity-40" onClick={(e) => toggleAddProjectForm(e)}></div>
			<form action="" className="text-white bg-slate-800 absolute mx-auto left-0 right-0 max-w-[320px] flex flex-col p-[30px] rounded-lg gap-[20px] font-bold">
				<h1 className="text-4xl font-bold">Add Project</h1>
				<label htmlFor="title" className="text-xl font-bold hidden">Title:</label>
				<input 
					className="bg-slate-700 rounded-lg py-[5px] px-[10px] placeholder:text-gray-300 placeholder:font-bold"
					type="text" 
					id="title"
					name="title"
					value={projectForm.title}
					onChange={(e) => handleProjectForm(e)}
					placeholder="Title"
				/>
				<div className="flex items-center gap-[20px]">
					<button className="px-[10px] py-[5px] rounded-md font-bold text-white bg-slate-600 w-[100%] hover:bg-slate-500" onClick={(e) => createProject(e)}>Add Project</button>
					<button className="px-[10px] py-[5px] rounded-md font-bold text-white bg-slate-600 w-[100%] hover:bg-slate-500" onClick={(e) => toggleAddProjectForm(e)}>Cancel</button>
				</div>
			</form>
		</div>
	)
}

export default AddProjectForm