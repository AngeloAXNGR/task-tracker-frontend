// Components
import Sidebar from "../components/Sidebar"

const Home = () => {
	return (
		<div className="flex justify-between">
			<Sidebar/>
			<div>
				Task Bar Goes Here
			</div>
		</div>
	)
}

export default Home