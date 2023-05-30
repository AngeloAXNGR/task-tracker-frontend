import { useContext } from 'react';

// Contexts
import { FormContext } from "../contexts/FormContext";


export const useFormContext = () => {
	const context = useContext(FormContext);

	if(!context){
		throw Error('useFormContext must be used inside a FormContextProvider');
	}

	return context
}