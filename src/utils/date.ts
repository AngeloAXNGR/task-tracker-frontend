const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export const parseDate = (dueDate: string) => {
  const today = new Date().toJSON().substring(0, 10);
  const dueTimeStamp:any = new Date(today);
  const todayTimeStamp:any = new Date(dueDate);
  const diffTime = todayTimeStamp - dueTimeStamp;
  const diffDay = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDay === 0) {
    return "Today";
  } else if (diffDay === 1) {
    return "Tomorrow";
  } else if (diffDay === -1) {
    return "Yesterday";
  } else {
    const [year, month, day] = dueDate.split('-');
    const parsedMonth = parseInt(month);
    return `${day} ${monthNames[parsedMonth - 1]} ${year}`;
  }
};
