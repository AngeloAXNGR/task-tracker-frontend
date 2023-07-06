// Redux API Endpoint Hooks
import { useFetchTasksQuery } from "../store"

// Custom Hooks
import useAuthContext from "../hooks/useAuthContext"
import { useFormContext } from "../hooks/useFormContext"

// Components
import Task from "./Task"

// Types 
import { TaskType } from "../types/task"


const TaskList = () => {
	const {user} = useAuthContext();
	const {activeProject, toggleAddTaskForm} = useFormContext();

	const {data, isLoading} = useFetchTasksQuery({user, activeProject})

	let content;

	if(isLoading){
		content = <div>Loading Tasks. . .</div>
	}else{
		content = data?.map((task:TaskType) => {
			return(
				<Task
					key={task._id}
					task={task}
				/>
			)
		})
	}

	return (
			<div className="w-0 sm:w-[100%] flex flex-col items-center pt-[20px]">
				{data && 
					<button className="px-[10px] py-[5px] rounded-md font-bold text-white bg-slate-600 hover:bg-slate-500 transition-bg duration-150 mb-[20px]" onClick={(e) => toggleAddTaskForm(e)}>Add Task</button>
				}

				{content}
			</div>
	)
}

export default TaskList