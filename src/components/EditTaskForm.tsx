import { useFormContext } from "../hooks/useFormContext";
import { useTaskContext } from "../hooks/useTaskContext";


const domainName = import.meta.env.VITE_DOMAIN_NAME;
const EditTaskForm = () => {	
	const {toggleEditTaskForm, taskForm, handleTaskForm, setTaskForm} = useFormContext();


	const {dispatch, activeTask} = useTaskContext();


	const updateTask = async(e:React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		const title = taskForm.title;
		const dueDate = taskForm.dueDate;
		const priority = taskForm.priority;

		const response = await fetch(`${domainName}/api/tasks/${activeTask}`,{
			method:'PATCH',
			headers:{'Content-type': 'application/json'},
			body:JSON.stringify({title, dueDate, priority})
		});

		const json = await response.json();

		if(response.ok){
			toggleEditTaskForm(e, '', '', '', '')
			dispatch({type:'UPDATE_TASK', payload:{...json, title:title, dueDate:dueDate, priority:priority}})
			setTaskForm({title:'', dueDate:'', priority:'P1'})
		}

	}
	return (
		<div>
			<div className="bg-black opacity-70 w-full h-screen fixed top-0 left-0 z-0" onClick={(e) => toggleEditTaskForm(e, '', '', '', '')}></div>
			<form action="" className="bg-white absolute mx-auto left-0 right-0 max-w-[320px] flex flex-col p-[30px] rounded-lg gap-[20px]">
				<h1 className="text-center text-4xl font-bold">Update Task</h1>
				<label htmlFor="title" className="text-xl font-bold">Title:</label>
				<input 
					className="border-black border-2 rounded-lg py-[5px] px-[10px]"
					type="text" 
					id="title"
					name="title"
					value={taskForm.title} onChange={(e) => handleTaskForm(e)}
				/>

				<label htmlFor="title" className="text-xl font-bold">Due Date:</label>
				<input 
					className="border-black border-2 rounded-lg py-[5px] px-[10px]"
					type="date" 
					id="dueDate"
					name="dueDate"
					value={taskForm.dueDate} onChange={(e) => handleTaskForm(e)}
				/>

				<label htmlFor="title" className="text-xl font-bold">Priority:</label>		
				<select name="priority" id="priority" value={taskForm.priority} onChange={(e) => handleTaskForm(e)}>
					<option value="P1">P1</option>
					<option value="P2">P2</option>
					<option value="P3">P3</option>
					<option value="P4">P4</option>
				</select>
				
				<div className="flex items-center gap-[20px]">
					<button className="px-[10px] py-[5px] rounded-md font-bold text-white bg-green-600 w-[100%] hover:bg-green-500" onClick={updateTask}>Update Task</button>
					<button className="px-[10px] py-[5px] rounded-md font-bold text-white bg-red-600 w-[100%] hover:bg-red-500" onClick={(e) => toggleEditTaskForm(e, '', '', '', '')}>Cancel</button>
				</div>
			</form>
		</div>
	)
}

export default EditTaskForm