// React Icons
import { MdAddCircleOutline } from 'react-icons/md';

// Custom Hooks
import useAuthContext from '../hooks/useAuthContext';

// Redux
import { useDispatch } from 'react-redux';
import { toggleAddProjectForm, useFetchProjectsQuery } from '../store';


// Components
import Project from './Project';
import Skeleton from './Skeleton';

// Types
import { ProjectType } from '../types/project';

const ProjectList = () => {
	const { user } = useAuthContext();
	const { data, isLoading, error } = useFetchProjectsQuery(user);

	const dispatch = useDispatch();

	let content;

	if(isLoading){
		content = <Skeleton times={3} className="w-full h-[40px]"/>
	}else if(error){
		content = <div>Error loading Projects</div>
	}else{
		content = data.map((project:ProjectType) => {
			return(
				<Project 
					key={project._id}
					{...project}
				/>
			)
		})
	}

	return (
		<div className="bg-slate-900 w-[100%] h-[calc(100vh-58px)] px-[20px] py-[10px] sm:w-[320px] sm:max-w-[100%]">
			<div className="flex items-center mb-[20px] justify-between">
				<h1 className="text-white font-bold text-3xl">Projects</h1>
				<MdAddCircleOutline className="text-white cursor-pointer" size={30} onClick={() => dispatch(toggleAddProjectForm(true))}/>
			</div>

			<div className="flex flex-col gap-[20px]">
				{content}
			</div>
		</div>
	)
}

export default ProjectList