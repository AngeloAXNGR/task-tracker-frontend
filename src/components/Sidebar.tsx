import { useEffect } from 'react';

// Types
import { ProjectType } from '../types/project';

// Custom Hooks
import { useProjectContext } from '../hooks/useProjectContext';
import { useProjectFormContext } from '../hooks/useProjectFormContext';

// Components
import Project from './Project';

const Sidebar = () => {
	const {projects, dispatch} = useProjectContext();
	const {toggleAddProjectForm} = useProjectFormContext();

	useEffect(() =>{
		const fetchProjects = async() => {
			const response = await fetch(`http://localhost:4000/api/projects`);
			const json = await response.json();

			if(response.ok){
				dispatch({type:'SET_PROJECTS', payload:json})
			}
		}

		fetchProjects()

	},[dispatch])

	return (
		<div className="bg-slate-950 py-[10px] px-[20px] h-screen w-[320px] max-w-[100%]">
			<h1 className="text-white font-bold text-3xl mb-[20px]">Projects</h1>

			<div className="flex flex-col gap-[20px]">
				<button className="px-[10px] py-[5px] rounded-md text-white bg-slate-700 hover:bg-slate-600 cursor-pointer items-center justify-between" onClick={(e) => toggleAddProjectForm(e)}>Add Project</button>
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