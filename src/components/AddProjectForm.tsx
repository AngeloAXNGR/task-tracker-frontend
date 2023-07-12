import useAuthContext from "../hooks/useAuthContext";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { toggleAddProjectForm, changeProjecTitle, useAddProjectMutation } from "../store";

// Components
import Button from "./Button";

const AddProjectForm = () => {
	const {user} = useAuthContext();
	const [addProject, results] = useAddProjectMutation()
	const dispatch = useDispatch()
	const {title} = useSelector(({projectForm}) =>{
		return{
			title: projectForm.title
		}
	})

	const handleProjectAdd = (e:React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		// Need revision at somepoint (formData should take in a string instead of an object)
		// Revise project API for this
		addProject({user,formData:{title}})

		if(!results.error){
			dispatch(changeProjecTitle(""))
			dispatch(toggleAddProjectForm(false))
		}
	}

	const handleProjectForm = (event:React.ChangeEvent<HTMLInputElement>) => {
		dispatch(changeProjecTitle(event.target.value))
	} 

	return (
		<div className="fixed top-0 flex items-center justify-center w-full h-screen">
			<div className="w-[100%] fixed top-0 h-screen bg-black opacity-40" onClick={() => dispatch(toggleAddProjectForm(false))}></div>
			<form action="" className="text-white bg-slate-800 absolute mx-auto left-0 right-0 max-w-[320px] flex flex-col p-[30px] rounded-lg gap-[20px] font-bold">
				<h1 className="text-4xl font-bold">Add Project</h1>
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
					<Button primary onClick={(e:any) => handleProjectAdd(e)}>Add Project</Button>
					<Button danger  onClick={() => dispatch(toggleAddProjectForm(false))}>Cancel</Button>
				</div>
			</form>
		</div>
	)
}

export default AddProjectForm