// React Icons
import { MdModeEditOutline } from 'react-icons/md';


// Hooks
import { useTaskContext } from '../hooks/useTaskContext';
import { useFormContext } from '../hooks/useFormContext';

// Utils
import { parseDate } from '../utils/date';

import { useRemoveTaskMutation } from '../store';

// Types
import { TaskType } from '../types/task';


const Task = ({...task}:TaskType) => {
	const [removeTask] = useRemoveTaskMutation();

	const {dispatch, toggleTaskView} = useTaskContext();
	const {toggleEditTaskForm} = useFormContext()

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

	return (
		<div className="flex items-start justify-between w-[80%] text-white p-[10px] hover:bg-slate-500 cursor-pointer border-b-[1px] border-slate-500 transition-bg duration-150" onClick={(e) => toggleTaskView(e, task._id)}>
			<div className="flex items-start gap-[5px]">
				<div className={`border-2 ${priorityColor} h-[20px] w-[20px] rounded-full hover:bg-white cursor-pointer`} onClick={(e) => handleRemoveTask(e)}></div>
				<div className="flex flex-col">
					<h1 className="mt-[-2px]">{task.title}</h1>
					<h1 className={dueDateString}>{parseDate(task.dueDate)}</h1>
				</div>
			</div>

			<div className="cursor-pointer">
				<MdModeEditOutline onClick={(e:React.MouseEvent<any>) => toggleEditTaskForm(e, task)}/>
			</div>
		</div>
	)
}

export default Task