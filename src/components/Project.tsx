// React Icons
import { BsFillTrash3Fill } from 'react-icons/bs';
import { MdModeEditOutline } from 'react-icons/md';

// Redux
import { useDispatch, useSelector, batch} from 'react-redux';
import { changeProjecTitle, changeActiveProject, toggleEditProjectForm, useRemoveProjectMutation } from '../store';

// Hooks
import useAuthContext from '../hooks/useAuthContext';

// Types
import { ProjectType } from '../types/project';


const Project = ({...project}: ProjectType) => {
	const {user} = useAuthContext()
	const [removeProject, results] = useRemoveProjectMutation();
	const dispatch = useDispatch()
	const {activeProject} = useSelector(({projectForm}) => {
		return{
			activeProject: projectForm.activeProject
		}
	})

	const handleRemoveProject = async(e:React.MouseEvent<HTMLOrSVGElement>) => {
		e.stopPropagation();
		removeProject({user, project})

		if(!results.error){
			dispatch(changeActiveProject(""))
		}
	}

	const handleEditProjectForm = (e:React.MouseEvent<HTMLOrSVGElement>) => {
		e.stopPropagation()
		batch(() => {
			dispatch(toggleEditProjectForm(true))
			dispatch(changeProjecTitle(project.title))
			dispatch(changeActiveProject(project._id))
		})
	}

	return (
		<div className={`flex px-[10px] py-[5px] rounded-md text-white ${activeProject === project._id ? 'bg-slate-500' : 'bg-slate-800' } cursor-pointer items-center justify-between `} onClick={() => dispatch(changeActiveProject(project._id))}>
			<h2>{project.title}</h2>
			<div className="flex items-center gap-[10px]">
				<MdModeEditOutline onClick={(e:React.MouseEvent<HTMLOrSVGElement>) => handleEditProjectForm(e)}/>
				<BsFillTrash3Fill onClick={(e:React.MouseEvent<HTMLOrSVGElement>) => handleRemoveProject(e)}/>
			</div>
		</div>
	)
}

export default Project