

// Custom Hooks
import { useFormContext } from "../hooks/useFormContext"

// Components
import ProjectList from '../components/ProjectList';
import TaskList from '../components/TaskList';
import AddTaskForm from '../components/AddTaskForm';
import EditTaskForm from '../components/EditTaskForm';
import ViewTask from '../components/ViewTask';
import AddProjectForm from "../components/AddProjectForm";
import EditProjectForm from "../components/EditProjectForm";


const Home = () => {
	const {addProjectFormState, editProjectFormState, addTaskFormState, editTaskFormState} = useFormContext();
	// const {tasks,dispatch, selectedTask, taskOpen} = useTaskContext();


	return (
		<div className="flex justify-between">
			<ProjectList/>
			<TaskList/>


			{editTaskFormState && <EditTaskForm/>}
			{addTaskFormState && <AddTaskForm/>}
			{addProjectFormState && <AddProjectForm/> }
			{editProjectFormState && <EditProjectForm/>}
			{/* {taskOpen &&
				<ViewTask
					_id={selectedTask._id}
					title={selectedTask.title}
					dueDate={selectedTask.dueDate}
					priority={selectedTask.priority}
					description={selectedTask.description}
				/>
			} */}
		</div>
	)
}

export default Home