// Types
import { TaskType } from "../types/task"

import { ReactMarkdown } from "react-markdown/lib/react-markdown"

// Hooks
import { useTaskContext } from "../hooks/useTaskContext"

import { parseDate } from "../utils/date"

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
		<div>
			<div className="bg-black opacity-20 w-full h-screen fixed top-0 left-0 z-0" onClick={(e) => toggleTaskView(e, _id)}></div>
			<div className="absolute max-w-[920px] mx-auto left-0 right-0 flex rounded-xl p-[20px] pt-[10px] bg-slate-900 text-white gap-[30px]">
				<div className="prose flex flex-col rounded-lg w-[75%]">
					<h1 className="text-5xl mb-[10px] text-white">{title}</h1>
					<ReactMarkdown 
						className="border-2 border-slate-800 px-[20px] mt-[10px] rounded-lg" 
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
				<div>
					<h2>Due Date: {parseDate(dueDate)}</h2>
					<h2>Priority: {priority}</h2>
				</div>
			</div>
		</div>
	)
}

export default ViewTask