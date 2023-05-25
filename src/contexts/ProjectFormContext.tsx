import { createContext, useState } from 'react';

// Hooks
import { useProjectContext } from '../hooks/useProjectContext';

type ProjectFormContextType = {
	addProjectFormState: boolean;
	editProjectFormState: boolean;
	title:string
	setTitle: React.Dispatch<React.SetStateAction<string>>
	toggleAddProjectForm: (e:React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => void
	toggleEditProjectForm: (e:React.MouseEvent<any>, _id:string, title:string) => void
}

type ProjectFormContextProviderProps = {
	children:React.ReactNode;
}

export const ProjectFormContext = createContext({} as ProjectFormContextType)

export const ProjectFormContextProvider = (({children}:ProjectFormContextProviderProps) => {
	const [addProjectFormState, setAddProjectFormState] = useState(false);
	const [editProjectFormState, setEditProjectFormState] = useState(false);
	const [title, setTitle] = useState('')
	const {activeProject, setActiveProject} = useProjectContext()

	const toggleAddProjectForm = (e:React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
		e.preventDefault();
		setAddProjectFormState(prevState => {return !prevState})
	}

	const toggleEditProjectForm = (e:React.MouseEvent<any>, _id:string, title:string) => {
		e.preventDefault();
		setEditProjectFormState(prevState => {return !prevState});
		setActiveProject(_id);
		setTitle(title)
		console.log(activeProject);
	}

	return(
		<ProjectFormContext.Provider value={{addProjectFormState, toggleAddProjectForm, title, setTitle, editProjectFormState, toggleEditProjectForm}}>
			{children}
		</ProjectFormContext.Provider>
	)
})