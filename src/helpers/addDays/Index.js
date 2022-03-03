export const handlerAddDays = (date, days) => {
    const mDate = new Date(date);
	const result = new Date(mDate.getTime()+(parseInt(days || 0)*24*60*60*1000));
    return result
}