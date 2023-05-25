import { createContext, useState } from 'react';

type ProjectFormContextType = {
	addProjectFormState: boolean;
	title:string
	setTitle: React.Dispatch<React.SetStateAction<string>>
	toggleAddProjectForm: (e:React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => void
}

type ProjectFormContextProviderProps = {
	children:React.ReactNode;
}

export const ProjectFormContext = createContext({} as ProjectFormContextType)

export const ProjectFormContextProvider = (({children}:ProjectFormContextProviderProps) => {
	const [addProjectFormState, setAddProjectFormState] = useState(false);
	const [title, setTitle] = useState('')

	const toggleAddProjectForm = (e:React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
		e.preventDefault();
		setAddProjectFormState(prevState => {return !prevState})
	}

	return(
		<ProjectFormContext.Provider value={{addProjectFormState, toggleAddProjectForm, title, setTitle}}>
			{children}
		</ProjectFormContext.Provider>
	)
})