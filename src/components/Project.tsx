// Types
import { ProjectType } from "../types/project"

const Project = ({_id, title, createdAt, updatedAt}: ProjectType) => {
	return (
		<div className="flex px-[10px] py-[5px] rounded-md text-white bg-slate-700 hover:bg-slate-600 cursor-pointer">
			<h2>{title}</h2>
		</div>
	)
}

export default Project