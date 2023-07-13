import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';

type SkeletonComponentProps = {
	times:number,
	className?: string
}

const Skeleton = ({times, className}:SkeletonComponentProps) => {

	let outerClassNames = classNames(
		'relative',
		'overflow-hidden',
		'bg-slate-700',
		'rounded',
		'mb-2.5',
		'rounded-xl',
		className
	)

	let innerClassNames = classNames(
		'animate-shimmer',
		'absolute',
		'inset-0',
		'bg-gradient-to-r',
		'from-slate-700',
		'via-slate-900',
		'to-slate-700',
		'-translate-x-full'
	)

	innerClassNames = twMerge(innerClassNames)
	outerClassNames = twMerge(outerClassNames)

	const boxes:any = [];
	for(let i = 0; i < times; i++){
		boxes.push(<div key={i} className={outerClassNames}><div className={innerClassNames}/></div>)
	}

	return (
		boxes
	)
}

export default Skeleton