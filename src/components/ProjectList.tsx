// React Icons
import { MdAddCircleOutline } from 'react-icons/md';

// Custom Hooks
import useAuthContext from '../hooks/useAuthContext';
import { useFormContext } from '../hooks/useFormContext';

// Redux API Endpoint Hooks
import { useFetchProjectsQuery } from '../store';

// Components
import Project from './Project';

// Types
import { ProjectType } from '../types/project';

const ProjectList = () => {
	const { user } = useAuthContext();
	const { toggleAddProjectForm } = useFormContext();
	const { data, isFetching, error } = useFetchProjectsQuery(user);

	let content;

	if(isFetching){
	content = <div>Loading Projects . . .</div>
	}else if(error){
	content = <div>Error loading Projects</div>
	}else{
	content = data.map((project:ProjectType) => {
		return(
			<Project 
				key={project._id}
				project={project}
			/>
		)
	})
	}

	return (
		<div className="bg-slate-900 w-[100%] h-[calc(100vh-58px)] px-[20px] py-[10px] sm:w-[320px] sm:max-w-[100%]">
			<div className="flex items-center mb-[20px] justify-between">
				<h1 className="text-white font-bold text-3xl">Projects</h1>
				<MdAddCircleOutline className="text-white cursor-pointer" size={30} onClick={(e:any)=>toggleAddProjectForm(e)}/>
			</div>

			<div className="flex flex-col gap-[20px]">
				{content}
			</div>
		</div>
	)
}

export default ProjectList