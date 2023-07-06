import { BsFillTrash3Fill } from 'react-icons/bs';
import { MdModeEditOutline } from 'react-icons/md';

// Types
import { ProjectType } from "../types/project"
export type ProjectPropsType = {
	project: ProjectType
}

// Hooks
import { useFormContext } from '../hooks/useFormContext';
// import { useTaskContext } from '../hooks/useTaskContext';
import useAuthContext from '../hooks/useAuthContext';

// Redux projectApi Endpoint Hooks
import { useRemoveProjectMutation } from '../store';

const Project = ({project}: ProjectPropsType) => {
	const {user} = useAuthContext()
	const [removeProject, results] = useRemoveProjectMutation();
	const {toggleEditProjectForm, activeProject, setActiveProject} = useFormContext()

	const handleRemoveProject = async(e:React.MouseEvent<HTMLOrSVGElement>) => {
		e.stopPropagation();
		removeProject({user, project})

		if(!results.error){
			setActiveProject('');
		}
	}


	return (
		<div className={`flex px-[10px] py-[5px] rounded-md text-white ${activeProject === project._id ? 'bg-slate-500' : 'bg-slate-800' } cursor-pointer items-center justify-between `} onClick={() => setActiveProject(project._id)}>
			<h2>{project.title}</h2>
			<div className="flex items-center gap-[10px]">
				<MdModeEditOutline onClick={(e:React.MouseEvent<any>) => toggleEditProjectForm(e, project)}/>
				<BsFillTrash3Fill onClick={(e:React.MouseEvent<HTMLOrSVGElement>) => handleRemoveProject(e)}/>
			</div>
		</div>
	)
}

export default Project