// Components
import Sidebar from "../components/Sidebar"
import AddProjectForm from "../components/AddProjectForm"

// Custom Hooks
import { useProjectFormContext } from "../hooks/useProjectFormContext"

const Home = () => {
	const {addProjectFormState} = useProjectFormContext();
	return (
		<div className="flex justify-between">
			<Sidebar/>
			{addProjectFormState && <AddProjectForm/>}
			<div>
				Task Bar Goes Here
			</div>
		</div>
	)
}

export default Home