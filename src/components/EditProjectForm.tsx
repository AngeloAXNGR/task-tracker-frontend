import { useFormContext } from "../hooks/useFormContext";
import useAuthContext from "../hooks/useAuthContext";

// Redux projectApi Endpoint Hooks
import { useUpdateProjectMutation } from "../store";

const EditProjectForm = () => {
	const {toggleEditProjectForm, projectForm, setProjectForm, handleProjectForm, setActiveProject, activeProject} = useFormContext();
	const {user} = useAuthContext()
	const [updateProject, results] = useUpdateProjectMutation();

	const handleUpdateProject = async(e:React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		updateProject({user, projectId:activeProject, formData:projectForm})

		if(!results.error){
			setProjectForm({title:''})
			toggleEditProjectForm(e, null)
			setActiveProject(activeProject);
		}
	}
	
	return (
		<div className="fixed top-0 flex items-center justify-center w-full h-screen">
			<div className="w-[100%] fixed top-0 h-screen bg-black opacity-40" onClick={(e) => toggleEditProjectForm(e, null)}></div>
			<form action="" className="text-white bg-slate-800 absolute mx-auto left-0 right-0 max-w-[320px] flex flex-col p-[30px] rounded-lg gap-[20px] font-bold">
				<h1 className="text-4xl font-bold">Update Project</h1>
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
					<button className="px-[10px] py-[5px] rounded-md font-bold text-white bg-slate-600 w-[100%] hover:bg-slate-500 transition-bg duration-150" onClick={(e) => {handleUpdateProject(e)}}>Update</button>
					<button className="px-[10px] py-[5px] rounded-md font-bold text-white bg-slate-600 w-[100%] hover:bg-slate-500 transition-bg duration-150" onClick={(e) => toggleEditProjectForm(e, null)}>Cancel</button>
				</div>
			</form>
		</div>
	)
}

export default EditProjectForm