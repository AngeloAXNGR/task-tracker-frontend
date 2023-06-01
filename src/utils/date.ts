const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const parseDate = (date: string) => {
  const [year, month, day] = date.split('-');
  const parsedMonth = parseInt(month.replace("0", ""));
  const parsedDay = day.replace("0", "");

  return `${parsedDay} ${monthNames[parsedMonth - 1]} ${year}`;
};