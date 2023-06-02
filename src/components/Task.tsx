// React Icons
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
		<div className="flex items-start justify-between w-[500px] max-w-[100%] text-white">
			<div className="flex items-start gap-[5px]">
				<div className="border-2 h-[20px] w-[20px] rounded-full hover:bg-white cursor-pointer" onClick={deleteTask}></div>
				<div className="flex flex-col">
					<h1 className="mt-[-2px]">{title}</h1>
					<h1 className={`${parseDate(dueDate) === "Yesterday" ? 'text-red-400' : parseDate(dueDate) === "Today" || parseDate(dueDate) === "Tomorrow" ? 'text-yellow-300' : 'text-white'}`}>{parseDate(dueDate)}</h1>
				</div>
			</div>

			<div className="cursor-pointer">
				<MdModeEditOutline onClick={(e:React.MouseEvent<any>) => toggleEditTaskForm(e,_id, title, dueDate, priority)}/>
			</div>
		</div>
	)
}

export default Task