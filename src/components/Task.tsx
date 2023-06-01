// React Icons
import { BsFillTrash3Fill } from 'react-icons/bs';
import { MdModeEditOutline } from 'react-icons/md';

// Types
import { TaskType } from "../types/task"

// Hooks
import { useTaskContext } from '../hooks/useTaskContext';
import { useFormContext } from '../hooks/useFormContext';

// Utils
import { parseDate } from '../utils/date';


const Task = ({_id, title, dueDate, priority, createdAt, updatedAt}:TaskType) => {

	const {dispatch} = useTaskContext();
	const {toggleEditTaskForm} = useFormContext()

	const deleteTask = async() => {
		const response = await fetch(`http://localhost:4000/api/tasks/${_id}`, {
			method:'DELETE'
		})

		const json = await response.json();

		if(response.ok){
			dispatch({type: 'DELETE_TASK', payload:json})
		}
	}


	return (
		<div className="flex items-center w-[1000px] max-w-[100%] text-white text-2xl font-bold justify-center gap-[20px]">
			<h1>{title}</h1>
			<h1>{parseDate(dueDate)}</h1>
			<MdModeEditOutline onClick={(e:React.MouseEvent<any>) => toggleEditTaskForm(e,_id, title, dueDate, priority)}/>
			<BsFillTrash3Fill onClick={deleteTask}/>
		</div>
	)
}

export default Task