import className from 'classnames';
import { twMerge } from 'tailwind-merge';


type ButtonProps = {
	children?:React.ReactNode
	[key: string]: any
	primary?:boolean
	secondary?:boolean
	confirm?:boolean
	danger?:boolean
	rounded?:boolean
	outline?:boolean
}

const validateProps = (props:ButtonProps) => {
	const {primary, secondary, confirm, danger} = props
	const trueCount = [primary, secondary, confirm, danger].filter(Boolean).length
	if(trueCount > 1){
		throw new Error(
			'Only props between "primary", "secondary", "confirm", "danger" are applicable one at a time'
		)
	}
}

const Button = (
	{
		children,
		primary,
		secondary,
		confirm,
		danger,
		rounded,
		outline,
		...rest
	}:ButtonProps) => {

	// Run validation on first render of the component
	validateProps({primary, secondary, confirm, danger})


	let buttonStyles = className(
		rest.className, 
		'px-[10px] py-[5px] rounded-md font-bold text-white bg-slate-600 w-[100%] transition-bg duration-150',
		{
			'bg-blue-500 hover:bg-blue-400': primary,
			'bg-black text-white hover:bg-slate-500': secondary,
			'bg-green-500 hover:bg-green-400': confirm,
			'bg-red-500 hover:bg-red-400': danger,
			'rounded-full': rounded,
			'bg-white': outline,
			'text-blue-500 border-blue-500':  outline && primary,
			'text-black border-black': outline && secondary,
			'text-green-500 border-green-500': outline && confirm,
			'text-red-500 border-red-500': outline && danger
		}
		)

		buttonStyles = twMerge(buttonStyles);
	return (
		<button {...rest} className={buttonStyles}>{children}</button>
	)
}

export default Button