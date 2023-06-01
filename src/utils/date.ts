const monthNames = ["Jan", "Feb", "Mar" ,"Apr" , "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export const parseDate = (date:string) => {
	// Separate String
	const month = parseInt(date.split('-')[1].replace("0", ""))
	const year = date.split('-')[0]
	const day = date.split('-')[2].replace("0", "")

	

	return `${day} ${monthNames[month-1]} ${year}`
}