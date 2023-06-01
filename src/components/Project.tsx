import { BsFillTrash3Fill } from 'react-icons/bs';
import { MdModeEditOutline } from 'react-icons/md';

// Types
import { ProjectType } from "../types/project"

// Hooks
import { useProjectContext } from '../hooks/useProjectContext';
import { useFormContext } from '../hooks/useFormContext';

const Project = ({_id, title, createdAt, updatedAt}: ProjectType) => {
	const {dispatch, setActiveProject} = useProjectContext();

	const {toggleEditProjectForm} = useFormContext()

	const deleteProject = async(e:React.MouseEvent<HTMLOrSVGElement>) => {
		e.stopPropagation();
		const response = await fetch(`http://localhost:4000/api/projects/${_id}`, {
			method:'DELETE'
		}) 

		const json = await response.json()

		if(response.ok){
			dispatch({type:'DELETE_PROJECT', payload:json})
		}
	}

	return (
		<div className="flex px-[10px] py-[5px] rounded-md text-white bg-slate-700 hover:bg-slate-600 cursor-pointer items-center justify-between" onClick={() => setActiveProject(_id)}>
			<h2>{title}</h2>
			<div className="flex items-center gap-[10px]">
				<MdModeEditOutline onClick={(e:React.MouseEvent<any>) => toggleEditProjectForm(e, _id, title)}/>
				<BsFillTrash3Fill onClick={(e:React.MouseEvent<HTMLOrSVGElement>) => deleteProject(e)}/>
			</div>
		</div>
	)
}

export default Project