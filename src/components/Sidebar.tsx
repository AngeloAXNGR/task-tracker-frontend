import { useEffect } from 'react';

// React Icons
import { MdAddCircleOutline } from 'react-icons/md';

// Types
import { ProjectType } from '../types/project';

// Custom Hooks
import { useProjectContext } from '../hooks/useProjectContext';
import { useFormContext } from '../hooks/useFormContext';

// Components
import Project from './Project';

const Sidebar = () => {
	const {projects, dispatch} = useProjectContext();
	const {toggleAddProjectForm} = useFormContext();

	useEffect(() =>{
		const fetchProjects = async() => {
			console.log('Fetching Projects . . . (useEffect @ Sidebar.tsx)')
			const response = await fetch(`http://localhost:4000/api/projects`);
			const json = await response.json();

			if(response.ok){
				dispatch({type:'SET_PROJECTS', payload:json})
			}
		}

		fetchProjects()

	},[dispatch])

	return (
		<div className="bg-slate-900 w-[100%] h-[calc(100vh-56px)] px-[20px] py-[10px] sm:w-[320px] sm:max-w-[100%]">
			<div className="flex items-center mb-[20px] justify-between">
				<h1 className="text-white font-bold text-3xl">Projects</h1>
				<MdAddCircleOutline className="text-white cursor-pointer" size={30} onClick={(e:any) => toggleAddProjectForm(e)}/>
			</div>
			<div className="flex flex-col gap-[20px]">
				{projects &&
					projects.map((project:ProjectType) => {
						return(
							<Project 
								key={project._id}
								_id={project._id} 
								title={project.title} 
								createdAt={project.createdAt} 
								updatedAt={project.updatedAt}
							/>
						)
					})
				}
			</div>
		</div>
	)
}

export default Sidebar