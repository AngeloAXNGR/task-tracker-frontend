// Components
import Sidebar from "../components/Sidebar"
import AddProjectForm from "../components/AddProjectForm"
import EditProjectForm from "../components/EditProjectForm"

// Custom Hooks
import { useProjectFormContext } from "../hooks/useProjectFormContext"

const Home = () => {
	const {addProjectFormState, editProjectFormState} = useProjectFormContext();
	return (
		<div className="flex justify-between">
			<Sidebar/>
			{addProjectFormState && <AddProjectForm/>}
			{editProjectFormState && <EditProjectForm/>}
			<div>
				Task Bar Goes Here
			</div>
		</div>
	)
}

export default Home