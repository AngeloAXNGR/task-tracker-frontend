// React Icons
import { MdModeEditOutline } from 'react-icons/md';

// Types
import { TaskType } from "../types/task"

// Hooks
import { useTaskContext } from '../hooks/useTaskContext';
import { useFormContext } from '../hooks/useFormContext';

// Utils
import { parseDate } from '../utils/date';



const domainName = import.meta.env.VITE_DOMAIN_NAME;
const Task = ({_id, title, dueDate, priority, createdAt, updatedAt}:TaskType) => {

	const {dispatch} = useTaskContext();
	const {toggleEditTaskForm} = useFormContext()

	const deleteTask = async() => {
		const response = await fetch(`${domainName}/api/tasks/${_id}`, {
			method:'DELETE'
		})

		const json = await response.json();

		if(response.ok){
			dispatch({type: 'DELETE_TASK', payload:json})
		}
	}

	const priorityColors:any = {
		P1: 'border-[#e81224]',
		P2: 'border-[#f7630c]',
		P3: 'border-[#0078d7]',
	};

	const dueDateStrings:any = {
		Yesterday: 'text-red-400',
		Today: 'text-yellow-300',
		Tomorrow: 'text-yellow-300',
	}

	const priorityColor = priorityColors[priority] || 'border-white';

	const dueDateString = dueDateStrings[parseDate(dueDate)] || 'text-white';

	return (
		<div className="flex items-start justify-between w-[500px] max-w-[100%] text-white">
			<div className="flex items-start gap-[5px]">
				<div className={`border-2 ${priorityColor} h-[20px] w-[20px] rounded-full hover:bg-white cursor-pointer`} onClick={deleteTask}></div>
				<h2 className="hidden">{createdAt}</h2>
				<h2 className="hidden">{updatedAt}</h2>
				<div className="flex flex-col">
					<h1 className="mt-[-2px]">{title}</h1>
					<h1 className={dueDateString}>{parseDate(dueDate)}</h1>
				</div>
			</div>

			<div className="cursor-pointer">
				<MdModeEditOutline onClick={(e:React.MouseEvent<any>) => toggleEditTaskForm(e,_id, title, dueDate, priority)}/>
			</div>
		</div>
	)
}

export default Task