import useAuthContext from "../hooks/useAuthContext";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { changeActiveProject, changeProjecTitle, toggleEditProjectForm, useUpdateProjectMutation } from "../store";

// Components
import Button from "./Button";
import Modal from "./Modal";


const EditProjectForm = () => {
	const {user} = useAuthContext()
	const [updateProject, results] = useUpdateProjectMutation();
	const dispatch = useDispatch();
	const {title, activeProject} = useSelector(({projectForm}) => {
		return {
			activeProject: projectForm.activeProject,
			title: projectForm.title
		}
	})

	const handleUpdateProject = async(e:React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		updateProject({user, projectId:activeProject, formData:{title}})

		if(!results.error){
			dispatch(toggleEditProjectForm(false))
			dispatch(changeActiveProject(activeProject))
			dispatch(changeProjecTitle(""))
		}
	}

	const handleProjectForm = (event:React.ChangeEvent<HTMLInputElement>) => {
		dispatch(changeProjecTitle(event.target.value))
	} 
	
	return (
		<Modal onClick={() => dispatch(toggleEditProjectForm(false))}>
			<form action="" className="text-white bg-slate-800 absolute mx-auto left-0 right-0 max-w-[320px] flex flex-col p-[30px] rounded-lg gap-[20px] font-bold">
				<h1 className="text-4xl font-bold">Update Project</h1>
				<label htmlFor="title" className="text-xl font-bold hidden">Title:</label>
				<input
					className="bg-slate-700 rounded-lg py-[5px] px-[10px] placeholder:text-gray-300 placeholder:font-bold"
					type="text"
					id="title"
					name="title"
					value={title}
					onChange={(e) => handleProjectForm(e)}
					placeholder="Title"
				/>
				<div className="flex items-center gap-[20px]">
					<Button primary onClick={(e:any) => {handleUpdateProject(e)}}>Update</Button>
					<Button danger onClick={() => dispatch(toggleEditProjectForm(false))}>Cancel</Button>
				</div>
			</form>
		</Modal>
	)
}

export default EditProjectForm