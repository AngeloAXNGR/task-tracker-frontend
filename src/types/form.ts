import { ProjectType, ProjectForm } from "./project";
import { TaskType, TaskForm } from "./task";

export type FormContextType = {
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
	toggleEditProjectForm: (e:React.MouseEvent<any>, project:ProjectType | null) => void
	toggleAddTaskForm: (e:React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => void
	toggleEditTaskForm: (e:React.MouseEvent<any>, task:TaskType | null) => void
	activeProject: string
	setActiveProject: React.Dispatch<React.SetStateAction<string>>
	activeTask: string
	setActiveTask: React.Dispatch<React.SetStateAction<string>>
}

export type FormContextProviderProps = {
	children:React.ReactNode;
}