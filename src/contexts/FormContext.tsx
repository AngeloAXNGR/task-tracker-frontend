import { createContext, useState } from 'react';

// Hooks
import { useProjectContext } from '../hooks/useProjectContext';
import { useTaskContext } from '../hooks/useTaskContext';

type ProjectForm = {
	title:string
}

type TaskForm = {
	title:string,
	dueDate:string,
	priority:string,
	description:string,
}

type FormContextType = {
	addProjectFormState: boolean;
	editProjectFormState: boolean;
	addTaskFormState:boolean;
	editTaskFormState:boolean;
	projectForm:ProjectForm;
	taskForm:TaskForm;
	setProjectForm: React.Dispatch<React.SetStateAction<any>>
	setTaskForm: React.Dispatch<React.SetStateAction<any>>
	handleProjectForm: (event:React.ChangeEvent<any>) => void
	handleTaskForm: (event:React.ChangeEvent<any>) => void
	toggleAddProjectForm: (e:React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => void
	toggleEditProjectForm: (e:React.MouseEvent<any>, _id:string, title:string) => void
	toggleAddTaskForm: (e:React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => void
	toggleEditTaskForm: (e:React.MouseEvent<any>, _id:string, title:string, dueDate:string, priority:string, description:string) => void
}

type FormContextProviderProps = {
	children:React.ReactNode;
}

export const FormContext = createContext({} as FormContextType)

export const FormContextProvider = (({children}:FormContextProviderProps) => {
	const [addProjectFormState, setAddProjectFormState] = useState(false);
	const [editProjectFormState, setEditProjectFormState] = useState(false);
	const [projectForm, setProjectForm] = useState({title:''})
	const {activeProject, setActiveProject} = useProjectContext()

	const [addTaskFormState, setAddTaskFormState] = useState(false);
	const [editTaskFormState, setEditTaskFormState] = useState(false);
	const [taskForm, setTaskForm] = useState({title:'', dueDate:'', priority:'P1', description:''})
	const {setActiveTask} = useTaskContext()

	const toggleAddProjectForm = (e:React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
		e.preventDefault();
		setAddProjectFormState(prevState => {return !prevState})
	}

	const toggleEditProjectForm = (e:React.MouseEvent<any>, _id:string, title:string) => {
		e.preventDefault();
		setEditProjectFormState(prevState => {return !prevState});
		setActiveProject(_id);
		setProjectForm({title:title})
		console.log(activeProject);
	}

	const handleProjectForm = (event:React.ChangeEvent<any>) => {
		const {name, value} = event.target
		setProjectForm((prevData:any) => {
			return {...prevData,
				[name]:value
			}
		})
	}


	const toggleAddTaskForm = (e:React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
		e.preventDefault();
		setAddTaskFormState(prevState => {return !prevState})
	}

	const toggleEditTaskForm = (e:React.MouseEvent<HTMLButtonElement | HTMLDivElement>, _id:string, title:string, dueDate:string, priority:string, description:string) => {
		e.preventDefault();
		setActiveTask(_id);
		setEditTaskFormState(prevState => {return !prevState});
		setTaskForm({title:title, dueDate:dueDate, priority:priority, description:description})
	}

	const handleTaskForm = (event:React.ChangeEvent<any>) => {
		const {name, value} = event.target
		setTaskForm((prevData:any) => {
			return {...prevData,
				[name]:value
			}
		})
	}

	return(
		<FormContext.Provider 
			value={
				{
					projectForm, 
					addProjectFormState, 
					toggleAddProjectForm, 
					handleProjectForm, 
					setProjectForm, 
					editProjectFormState, 
					toggleEditProjectForm, 


					taskForm,
					addTaskFormState, 
					toggleAddTaskForm,
					handleTaskForm,
					setTaskForm,
					editTaskFormState,
					toggleEditTaskForm
					}
				}>
			{children}
		</FormContext.Provider>
	)
})