import { BsFillTrash3Fill } from 'react-icons/bs';
import { MdModeEditOutline } from 'react-icons/md';

// Types
import { ProjectType } from "../types/project"

// Hooks
import { useProjectContext } from '../hooks/useProjectContext';
import { useFormContext } from '../hooks/useFormContext';


const domainName = import.meta.env.VITE_DOMAIN_NAME;
const Project = ({_id, title, createdAt, updatedAt}: ProjectType) => {
	const {dispatch,activeProject,setActiveProject} = useProjectContext();

	const {toggleEditProjectForm} = useFormContext()

	const deleteProject = async(e:React.MouseEvent<HTMLOrSVGElement>) => {
		e.stopPropagation();
		const response = await fetch(`${domainName}/api/projects/${_id}`, {
			method:'DELETE'
		}) 

		const json = await response.json()

		if(response.ok){
			dispatch({type:'DELETE_PROJECT', payload:json})
		}
	}

	return (
		<div className={`flex px-[10px] py-[5px] rounded-md text-white ${activeProject === _id ? 'bg-slate-400' : 'bg-slate-700' } cursor-pointer items-center justify-between hover:bg-slate-600`} onClick={() => setActiveProject(_id)}>
			<h2>{title}</h2>
			<h2 className="hidden">{createdAt}</h2>
			<h2 className="hidden">{updatedAt}</h2>
			<div className="flex items-center gap-[10px]">
				<MdModeEditOutline onClick={(e:React.MouseEvent<any>) => toggleEditProjectForm(e, _id, title)}/>
				<BsFillTrash3Fill onClick={(e:React.MouseEvent<HTMLOrSVGElement>) => deleteProject(e)}/>
			</div>
		</div>
	)
}

export default Project