import { useState, useEffect } from "react"

// Redux Hooks
import { useSelector, useDispatch } from "react-redux"
import { toggleAddTaskForm } from "../store"

// Redux API Endpoint Hooks
import { useFetchTasksQuery } from "../store"

// Custom Hooks
import useAuthContext from "../hooks/useAuthContext"

// Components
import Task from "./Task"
import Button from "./Button"

// Types
import { TaskType } from "../types/task"

const TaskList = () => {
	const {user} = useAuthContext();
	const dispatch = useDispatch();
	const [skip, setSkip] = useState(true);
	const {activeProject} = useSelector(({projectForm}) => {
		return{
			activeProject: projectForm.activeProject
		}
	})

	useEffect(() => {
		if(activeProject === ""){
			setSkip(true)
		}else {
			setSkip(false)
		}
	},[activeProject])

	const {data, isLoading} = useFetchTasksQuery({user, activeProject}, {skip})

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
					<Button className="max-w-[150px] mb-[20px] hover:bg-slate-500" onClick={() => dispatch(toggleAddTaskForm(true))}>Add Task</Button>
				}

				{content}
			</div>
	)
}

export default TaskList