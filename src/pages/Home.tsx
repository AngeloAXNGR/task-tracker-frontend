import { useEffect } from 'react';


// Components
import Sidebar from "../components/Sidebar"
import AddProjectForm from "../components/AddProjectForm"
import EditProjectForm from "../components/EditProjectForm"
import Task from '../components/Task';

// Custom Hooks
import { useProjectFormContext } from "../hooks/useProjectFormContext"
import { useProjectContext } from "../hooks/useProjectContext"
import { useTaskContext } from '../hooks/useTaskContext';

// types
import { TaskType } from '../types/task';

const Home = () => {
	const {addProjectFormState, editProjectFormState} = useProjectFormContext();
	const{activeProject} = useProjectContext();
	const {tasks,dispatch} = useTaskContext();

	useEffect(() =>{
		const fetchTasks = async() => {
			console.log('Fetching Tasks . . . (useEffect @ Home.tsx)')
			const response = await fetch(`http://localhost:4000/api/projects/${activeProject}/tasks`);
			const json = await response.json();

			if(response.ok){
				dispatch({type:'SET_TASKS', payload:json})
			}
		}

		fetchTasks()

	},[dispatch, activeProject])

	return (
		<div className="flex justify-between">
			<Sidebar/>
			{addProjectFormState && <AddProjectForm/>}
			{editProjectFormState && <EditProjectForm/>}
			<div className="w-0 sm:w-[100%]">
				{tasks && tasks.map((task:TaskType) => {
					return(
						<Task
							key={task._id}
							_id={task._id}
							title={task.title}
							dueDate={task.dueDate}
							priority={task.priority}
							createdAt={task.createdAt}
							updatedAt={task.updatedAt}
						/>
					)
				})}
			</div>
		</div>
	)
}

export default Home