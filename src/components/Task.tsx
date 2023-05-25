import { TaskType } from "../types/task"

const Task = ({_id, title, dueDate, priority, createdAt, updatedAt}:TaskType) => {
	return (
		<div className="flex items-center w-[1000px] max-w-[100%] text-white text-2xl font-bold justify-center gap-[20px]">
			<h1>{title}</h1>
			<h1>{dueDate}</h1>
		</div>
	)
}

export default Task