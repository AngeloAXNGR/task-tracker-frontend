// Types
import { TaskType } from "../types/task"

import { ReactMarkdown } from "react-markdown/lib/react-markdown"

// Hooks
import { useTaskContext } from "../hooks/useTaskContext"

// Utils
import { parseDate } from "../utils/date"

// React-Icons
import {AiFillCloseCircle} from 'react-icons/ai';

const ViewTask = ({_id, title, dueDate, priority, description}:TaskType) => {

	const {toggleTaskView} = useTaskContext()

	// Used to apply a white text for rendered links in ReactMarkdown
	const renderLink = (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
		return(
			<a {...props} className="text-white">
				{props.children}
			</a>
		)
	}

	const renderText = (props: React.ComponentPropsWithoutRef<'p'>) => (
    <p {...props} className="text-white" />
  );

  const renderHeading = (props: React.ComponentPropsWithoutRef<'h1'>) => (
    <h1 {...props} className="text-white" />
  );

  const renderStrong = (props: React.ComponentPropsWithoutRef<'strong'>) => (
    <strong {...props} className="text-white" />
  );

  const renderEmphasis = (props: React.ComponentPropsWithoutRef<'em'>) => (
    <em {...props} className="text-white" />
  );

	
  const renderList = (props: React.ComponentPropsWithoutRef<'li'>) => (
    <li {...props} className="text-white" />
  );

	return (

	<div className="fixed top-0 flex items-center justify-center w-full h-screen">
		<div className="w-[100%] fixed top-0 h-screen bg-black opacity-40" onClick={(e) => toggleTaskView(e, _id)}></div>
		<div className="bg-slate-800 w-[100%] max-w-[920px] text-white relative z-10 rounded-xl overflow-hidden">
			<div className="overflow-hidden p-[20px] border-b-[1px] border-slate-500 flex justify-end cursor-pointer">
				<AiFillCloseCircle
					onClick={(e:any) => toggleTaskView(e,_id)}
				/>
			</div>
			<div className="flex justify-center">
				<div className="flex flex-col w-[75%] items-center p-[30px] border-r-[1px] border-slate-500">
					<h1 className="self-start text-4xl font-bold mb-[20px]">{title}</h1>
					<div className="prose overflow-auto h-[320px] border-[1px] border-slate-700  rounded-lg w-[100%]">
						<ReactMarkdown
							className="px-[20px] mt-[10px] rounded-lg"
							components={{
							a:renderLink,
							p: renderText,
							h1: renderHeading,
							strong: renderStrong,
							em: renderEmphasis,
							li:renderList
							}}
						>
							{description}
						</ReactMarkdown>
					</div>
				</div>
				<div className="bg-slate-700 w-[25%] py-[30px] px-[10px] flex flex-col">
					<div className="border-y-[1px] border-slate-500 py-[5px] font-bold">
						<h2>Due Date</h2>
						<h2>{parseDate(dueDate)}</h2>
					</div>
					<div className="border-b-[1px] border-slate-500 py-[5px] font-bold">
						<h2>Priority</h2>
						<h2>{priority}</h2>
					</div>
				</div>
			</div>
		</div>
	</div>
	)
}

export default ViewTask