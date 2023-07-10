import { useFormContext } from "../hooks/useFormContext";
import useAuthContext from "../hooks/useAuthContext";

// Redux projectApi Endpoint Hooks
import { useAddProjectMutation } from "../store";

// Components
import Button from "./Button";

const AddProjectForm = () => {
	const {toggleAddProjectForm, projectForm, handleProjectForm, setProjectForm} = useFormContext();
	const {user} = useAuthContext();
	const [addProject, results] = useAddProjectMutation()

	const handleProjectAdd = (e:React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		addProject({user,formData:projectForm})

		if(!results.error){
			setProjectForm({title:''})
			toggleAddProjectForm(e)
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
					<Button primary onClick={(e:any) => handleProjectAdd(e)}>Add Project</Button>
					<Button danger  onClick={(e:any) => toggleAddProjectForm(e)}>Cancel</Button>
				</div>
			</form>
		</div>
	)
}

export default AddProjectForm