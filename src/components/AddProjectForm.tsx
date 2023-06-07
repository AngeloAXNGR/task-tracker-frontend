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
		<div>
			<div className="bg-black opacity-70 w-full h-screen fixed top-0 left-0 z-0" onClick={(e) => toggleAddProjectForm(e)}></div>
			<form action="" className="bg-white absolute mx-auto left-0 right-0 max-w-[320px] flex flex-col p-[30px] rounded-lg gap-[20px]">
				<h1 className="text-center text-4xl font-bold">Add Project</h1>
				<label htmlFor="title" className="text-xl font-bold">Title:</label>
				<input 
					className="border-black border-2 rounded-lg py-[5px] px-[10px]"
					type="text" 
					id="title"
					name="title"
					value={projectForm.title}
					onChange={(e) => handleProjectForm(e)}
				/>
				<div className="flex items-center gap-[20px]">
					<button className="px-[10px] py-[5px] rounded-md font-bold text-white bg-green-600 w-[100%] hover:bg-green-500" onClick={(e) => createProject(e)}>Add Project</button>
					<button className="px-[10px] py-[5px] rounded-md font-bold text-white bg-red-600 w-[100%] hover:bg-red-500" onClick={(e) => toggleAddProjectForm(e)}>Cancel</button>
				</div>
			</form>
		</div>
	)
}

export default AddProjectForm