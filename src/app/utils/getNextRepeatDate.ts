export const getNextRepeatDate = (repeats: number, goodRepeats: number, badRepeats: number) => {
	const percentOfGoodRepeats = (goodRepeats * 100) / repeats;

	let nextRepeatDate = new Date();

	if (percentOfGoodRepeats < 20) {
		nextRepeatDate.setDate(nextRepeatDate.getDate() + 1); // add 1 day
	} else if (percentOfGoodRepeats < 40) {
		nextRepeatDate.setDate(nextRepeatDate.getDate() + 3); // add 3 days
	} else if (percentOfGoodRepeats < 60) {
		nextRepeatDate.setDate(nextRepeatDate.getDate() + 7); // add 1 week
	} else if (percentOfGoodRepeats < 80) {
		nextRepeatDate.setDate(nextRepeatDate.getDate() + 14); // add 2 weeks
	} else {
		nextRepeatDate.setMonth(nextRepeatDate.getMonth() + 1); // add 1 month
	}

	return nextRepeatDate;
};
