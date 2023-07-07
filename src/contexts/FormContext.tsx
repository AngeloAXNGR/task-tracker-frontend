import { createContext, useState } from 'react';

// Types
import { FormContextType, FormContextProviderProps } from '../types/form';
import { ProjectType } from '../types/project';
import { TaskType } from '../types/task';

export const FormContext = createContext({} as FormContextType)

export const FormContextProvider = (({children}:FormContextProviderProps) => {
	const [addProjectFormState, setAddProjectFormState] = useState(false);
	const [editProjectFormState, setEditProjectFormState] = useState(false);
	const [projectForm, setProjectForm] = useState({title:''})

	const [activeProject, setActiveProject] = useState('')

	const [activeTask, setActiveTask] = useState('')

	const [addTaskFormState, setAddTaskFormState] = useState(false);
	const [editTaskFormState, setEditTaskFormState] = useState(false);
	const [taskForm, setTaskForm] = useState({title:'', dueDate:'', priority:'P1', description:''})

	const toggleAddProjectForm = (e:React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
		e.preventDefault();
		setAddProjectFormState(prevState => {return !prevState})
	}

	const toggleEditProjectForm = (e:React.MouseEvent<any>, project:ProjectType | null) => {
		e.preventDefault();
		setEditProjectFormState(prevState => {return !prevState});
		setActiveProject(project?._id || '');
		setProjectForm({title:project?.title || ''})
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

	const toggleEditTaskForm = (e:React.MouseEvent<HTMLButtonElement | HTMLDivElement>, task:TaskType | null) => {
		e.stopPropagation();
		setActiveTask(task?._id || '');
		setEditTaskFormState(prevState => {return !prevState});
		setTaskForm({title:task?.title || '', dueDate:task?.dueDate || '', priority:task?.priority || '', description:task?.description || ''})
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
					toggleEditTaskForm,
					activeProject,
					setActiveProject,
					activeTask,
					setActiveTask
					}
				}>
			{children}
		</FormContext.Provider>
	)
})