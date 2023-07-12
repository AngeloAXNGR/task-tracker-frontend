// React Icons
import { MdModeEditOutline } from 'react-icons/md';

// Utils
import { parseDate } from '../utils/date';

// Types
import { TaskType } from '../types/task';

// Redux
import {useDispatch} from 'react-redux';
import { useRemoveTaskMutation, changeActiveTask, getTaskData, toggleEditTaskForm, toggleViewTaskForm } from '../store';

const Task = ({...task}:TaskType) => {
	const [removeTask] = useRemoveTaskMutation();
	const dispatch = useDispatch();

	const handleRemoveTask = (e:React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		removeTask({task})
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

	const priorityColor = priorityColors[task.priority] || 'border-white';
	const dueDateString = dueDateStrings[parseDate(task.dueDate)] || 'text-white';

	const handleEditTaskForm = (e:React.MouseEvent<HTMLOrSVGElement>) => {
		e.stopPropagation();
		dispatch(toggleEditTaskForm(true))
		dispatch(changeActiveTask(task._id))
		dispatch(getTaskData({title:task.title, dueDate:task.dueDate, priority:task.priority, description:task.description}))
	}

	const handleViewTaskForm = (e:React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		dispatch(toggleViewTaskForm(true))
		dispatch(getTaskData({title:task.title, dueDate:task.dueDate, priority:task.priority, description:task.description}))
	}

	return (
		<div className="flex items-start justify-between w-[80%] text-white p-[10px] hover:bg-slate-500 cursor-pointer border-b-[1px] border-slate-500 transition-bg duration-150" onClick={(e) => handleViewTaskForm(e)}>
			<div className="flex items-start gap-[5px]">
				<div className={`border-2 ${priorityColor} h-[20px] w-[20px] rounded-full hover:bg-white cursor-pointer`} onClick={(e) => handleRemoveTask(e)}></div>
				<div className="flex flex-col">
					<h1 className="mt-[-2px]">{task.title}</h1>
					<h1 className={dueDateString}>{parseDate(task.dueDate)}</h1>
				</div>
			</div>

			<div className="cursor-pointer">
				<MdModeEditOutline onClick={(e:React.MouseEvent<any>) => handleEditTaskForm(e)}/>
			</div>
		</div>
	)
}

export default Task