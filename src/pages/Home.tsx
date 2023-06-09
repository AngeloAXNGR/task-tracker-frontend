import { useEffect } from 'react';

// Components
import Sidebar from "../components/Sidebar"
import AddProjectForm from "../components/AddProjectForm"
import EditProjectForm from "../components/EditProjectForm"
import Task from '../components/Task';
import AddTaskForm from '../components/AddTaskForm';
import EditTaskForm from '../components/EditTaskForm';
import ViewTask from '../components/ViewTask';

// Custom Hooks
import { useFormContext } from "../hooks/useFormContext"
import { useProjectContext } from "../hooks/useProjectContext"
import { useTaskContext } from '../hooks/useTaskContext';
import useAuthContext from '../hooks/useAuthContext';

// types
import { TaskType } from '../types/task';


const domainName = import.meta.env.VITE_DOMAIN_NAME;

const Home = () => {
	const {addProjectFormState, editProjectFormState, addTaskFormState, toggleAddTaskForm, editTaskFormState} = useFormContext();
	const{activeProject} = useProjectContext();
	const {tasks,dispatch, selectedTask, taskOpen} = useTaskContext();
	const {user} = useAuthContext();

	useEffect(() =>{
		const fetchTasks = async() => {
			console.log('Fetching Tasks . . . (useEffect @ Home.tsx)')
			const response = await fetch(`${domainName}/api/projects/${activeProject}/tasks`, {headers:{'Authorization': `Bearer ${user.token}`}});
			const json = await response.json();

			if(response.ok){
				dispatch({type:'SET_TASKS', payload:json})
			}
		}

		if(activeProject === ""){
			dispatch({type:'SET_TASKS', payload:""})
			return
		}
		fetchTasks()

	},[dispatch, activeProject])


	console.log(activeProject)
	return (
		<div className="flex justify-between">
			<Sidebar/>
			{addProjectFormState && <AddProjectForm/>}
			{editProjectFormState && <EditProjectForm/>}
			{editTaskFormState && <EditTaskForm/>}
			{addTaskFormState && <AddTaskForm/>}
			{taskOpen &&
				<ViewTask
					_id={selectedTask._id}
					title={selectedTask.title}
					dueDate={selectedTask.dueDate}
					priority={selectedTask.priority}
					description={selectedTask.description}
				/>
			}

			<div className="w-0 sm:w-[100%] flex flex-col items-center pt-[20px]">
				{tasks && 
					<button className="px-[10px] py-[5px] rounded-md font-bold text-white bg-slate-600 hover:bg-slate-500 transition-bg duration-150 mb-[20px]" onClick={(e) => toggleAddTaskForm(e)}>Add Task</button>
				}

				{tasks && tasks.map((task:TaskType) => {
					return(
						<Task
							key={task._id}
							_id={task._id}
							title={task.title}
							dueDate={task.dueDate}
							description={task.description}
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