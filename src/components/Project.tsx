import { BsFillTrash3Fill } from 'react-icons/bs';
import { MdModeEditOutline } from 'react-icons/md';

// Types
import { ProjectType } from "../types/project"

// Hooks
import { useProjectContext } from '../hooks/useProjectContext';
import { useFormContext } from '../hooks/useFormContext';
import { useTaskContext } from '../hooks/useTaskContext';
import useAuthContext from '../hooks/useAuthContext';


const domainName = import.meta.env.VITE_DOMAIN_NAME;
const Project = ({_id, title}: ProjectType) => {
	const {dispatch,activeProject,setActiveProject} = useProjectContext();
	const {dispatch:taskDispatch} = useTaskContext()
	const {user} = useAuthContext()

	const {toggleEditProjectForm} = useFormContext()

	const deleteProject = async(e:React.MouseEvent<HTMLOrSVGElement>) => {
		e.stopPropagation();
		const response = await fetch(`${domainName}/api/projects/${_id}`, {
			method:'DELETE',
			headers:{
				'Authorization': `Bearer ${user.token}`
			}
		}) 

		const json = await response.json()

		if(response.ok){
			dispatch({type:'DELETE_PROJECT', payload:json})

			
			
			if(activeProject === _id){
				// Render nothing in the task pane if an active project has been deleted
				taskDispatch({type:'SET_TASKS', payload:null})
			}
		}
	}

	return (
		<div className={`flex px-[10px] py-[5px] rounded-md text-white ${activeProject === _id ? 'bg-slate-500' : 'bg-slate-800' } cursor-pointer items-center justify-between `} onClick={() => setActiveProject(_id)}>
			<h2>{title}</h2>
			<div className="flex items-center gap-[10px]">
				<MdModeEditOutline onClick={(e:React.MouseEvent<any>) => toggleEditProjectForm(e, _id, title)}/>
				<BsFillTrash3Fill onClick={(e:React.MouseEvent<HTMLOrSVGElement>) => deleteProject(e)}/>
			</div>
		</div>
	)
}

export default Project