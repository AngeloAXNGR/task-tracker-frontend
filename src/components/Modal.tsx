
type ModalProps = {
	children: React.ReactNode,
	[key: string]: any

}

const Modal = ({children, ...rest}: ModalProps) => {
	return (
		<div className="fixed top-0 flex items-center justify-center w-full h-screen">
			<div className="w-[100%] fixed top-0 h-screen bg-black opacity-40" {...rest}>
			</div>
			{children}
		</div>
	)
}

export default Modal