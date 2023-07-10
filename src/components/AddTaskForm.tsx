import { useFormContext } from "../hooks/useFormContext"
import { useAddTaskMutation } from "../store";

// Components 
import Button from "./Button";

const AddTaskForm = () => {	
	const {toggleAddTaskForm, taskForm, handleTaskForm, setTaskForm, activeProject} = useFormContext();



	const [addTask, results] = useAddTaskMutation()


	const handleTaskAdd = (e:React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		addTask({activeProject, formData:taskForm})

		if(!results.error){
			setTaskForm({title:'', dueDate:'', priority:'P1'})
			toggleAddTaskForm(e)
		}
	}


	return (
		<div className="fixed top-0 flex items-center justify-center w-full h-screen">
			<div className="w-[100%] fixed top-0 h-screen bg-black opacity-40" onClick={(e) => toggleAddTaskForm(e)}></div>
			<form action="" className="text-white h-[520px] max-h-[100%] bg-slate-800 w-[620px] overflow-auto flex flex-col gap-[20px] p-[30px] pt-[10px] rounded-xl relative z-10 font-bold">
				<h1 className="text-4xl font-bold">Add Task</h1>
				<label htmlFor="title" className="text-xl font-bold hidden">Title:</label>
				<input 
					className="rounded-lg py-[5px] px-[10px] bg-slate-700 placeholder:text-gray-300 placeholder:font-bold"
					type="text" 
					id="title"
					name="title"
					placeholder="Title"
					value={taskForm.title} onChange={(e) => handleTaskForm(e)}
				/>

				<label htmlFor="dueDate" className="text-xl font-bold hidden ">Due Date:</label>
				<input 
					className="rounded-lg py-[10px] px-[10px] bg-slate-700 font-bold text-gray-300"
					type="date" 
					id="dueDate"
					name="dueDate"
					value={taskForm.dueDate} onChange={(e) => handleTaskForm(e)}
				/>


				<label htmlFor="priority" className="text-xl font-bold hidden">Priority:</label>		
				<select className="rounded-lg py-[5px] px-[10px] bg-slate-700" name="priority" id="priority" value={taskForm.priority} onChange={(e) => handleTaskForm(e)}>
					<option value="P1">🔴   P1</option>
					<option value="P2">🟠   P2</option>
					<option value="P3">🔵   P3</option>
					<option value="P4">⚫   P4</option>
				</select>

				<label htmlFor="description" className="text-xl font-bold">Description:</label>
				<textarea className="p-[10px] bg-slate-700 placeholder:font-bold placeholder:text-gray-300" name="description" id="description" cols={30} rows={10} value={taskForm.description} onChange={(e) =>handleTaskForm(e)}  placeholder="Add a Description (optional)"/>
				
				<div className="flex items-center gap-[20px]">
					<Button primary onClick={handleTaskAdd}>Add Task</Button>
					<Button danger  onClick={(e:any) => toggleAddTaskForm(e)}>Cancel</Button>
				</div>
			</form>
		</div>
	)
}

export default AddTaskForm