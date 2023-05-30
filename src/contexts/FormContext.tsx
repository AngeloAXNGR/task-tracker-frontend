import { createContext, useState } from 'react';

// Hooks
import { useProjectContext } from '../hooks/useProjectContext';

type ProjectForm = {
	title:string
}

type TaskForm = {
	title:string,
	dueDate:string,
	priority:string,
}

type FormContextType = {
	addProjectFormState: boolean;
	editProjectFormState: boolean;
	projectForm:ProjectForm;
	setProjectForm: React.Dispatch<React.SetStateAction<any>>
	handleProjectForm: (event:React.ChangeEvent<any>) => void
	toggleAddProjectForm: (e:React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => void
	toggleEditProjectForm: (e:React.MouseEvent<any>, _id:string, title:string) => void
	// toggleAddTaskForm: (e:React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => void
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


	return(
		<FormContext.Provider value={{addProjectFormState, toggleAddProjectForm, projectForm, handleProjectForm, setProjectForm, editProjectFormState, toggleEditProjectForm}}>
			{children}
		</FormContext.Provider>
	)
})