
// Redux Hooks
import { useSelector } from "react-redux";

// Components
import ProjectList from '../components/ProjectList';
import TaskList from '../components/TaskList';
import AddTaskForm from '../components/AddTaskForm';
import EditTaskForm from '../components/EditTaskForm';
import ViewTask from '../components/ViewTask';
import AddProjectForm from "../components/AddProjectForm";
import EditProjectForm from "../components/EditProjectForm";


const Home = () => {

	const {addProjectForm, editProjectForm} = useSelector(({projectForm}) => {
		return{
			addProjectForm: projectForm.addProjectForm,
			editProjectForm: projectForm.editProjectForm
		}
	})


	const {addTaskForm, editTaskForm, viewTaskForm} = useSelector(({taskForm}) => {
		return {
			addTaskForm: taskForm.addTaskForm,
			editTaskForm: taskForm.editTaskForm,
			viewTaskForm: taskForm.viewTaskForm
		}
	})

	return (
		<div className="flex justify-between">
			<ProjectList/>
			<TaskList/>
			{editTaskForm && <EditTaskForm/>}
			{addTaskForm && <AddTaskForm/>}
			{addProjectForm && <AddProjectForm/> }
			{editProjectForm && <EditProjectForm/>}
			{viewTaskForm && <ViewTask/>}
		</div>
	)
}

export default Home