import { useEffect } from 'react';


// Components
import Sidebar from "../components/Sidebar"
import AddProjectForm from "../components/AddProjectForm"
import EditProjectForm from "../components/EditProjectForm"
import Task from '../components/Task';
import AddTaskForm from '../components/AddTaskForm';
import EditTaskForm from '../components/EditTaskForm';

// Custom Hooks
import { useFormContext } from "../hooks/useFormContext"
import { useProjectContext } from "../hooks/useProjectContext"
import { useTaskContext } from '../hooks/useTaskContext';

// types
import { TaskType } from '../types/task';

const Home = () => {
	const {addProjectFormState, editProjectFormState, addTaskFormState, toggleAddTaskForm, editTaskFormState} = useFormContext();
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
			{editTaskFormState && <EditTaskForm/>}
			{addTaskFormState && <AddTaskForm/>}

			<div className="w-0 sm:w-[100%] flex flex-col items-center gap-[20px] pt-[20px]">
				{tasks && 
					<button className="text-white font-bold bg-green-700 px-[20px] py-[5px] rounded-md" onClick={(e) => toggleAddTaskForm(e)}>Add Task</button>
				}

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