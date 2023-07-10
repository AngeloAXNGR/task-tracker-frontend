// Redux API Endpoint Hooks
import { useFetchTasksQuery } from "../store"

// Custom Hooks
import useAuthContext from "../hooks/useAuthContext"
import { useFormContext } from "../hooks/useFormContext"

// Components
import Task from "./Task"
import Button from "./Button"

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
					{...task}
				/>
			)
		})
	}

	return (
			<div className="w-0 sm:w-[100%] flex flex-col items-center pt-[20px]">
				{data && 
					<Button className="max-w-[150px] mb-[20px] hover:bg-slate-500" onClick={(e:any) => toggleAddTaskForm(e)}>Add Task</Button>
				}

				{content}
			</div>
	)
}

export default TaskList