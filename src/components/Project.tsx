import { BsFillTrash3Fill } from 'react-icons/bs';

// Types
import { ProjectType } from "../types/project"

// Hooks
import { useProjectContext } from '../hooks/useProjectContext';

const Project = ({_id, title, createdAt, updatedAt}: ProjectType) => {

	const {dispatch} = useProjectContext();


	const deleteProject = async() => {
		const response = await fetch(`http://localhost:4000/api/projects/${_id}`, {
			method:'DELETE'
		}) 

		const json = await response.json()

		if(response.ok){
			dispatch({type:'DELETE_PROJECT', payload:json})
		}
	}

	return (
		<div className="flex px-[10px] py-[5px] rounded-md text-white bg-slate-700 hover:bg-slate-600 cursor-pointer items-center justify-between">
			<h2>{title}</h2>
			<BsFillTrash3Fill onClick={deleteProject}/>
		</div>
	)
}

export default Project