export const getNextRepeatDate = (streak: number) => {
	const nextRepeatDate = new Date();

	switch (streak) {
		case 0:
			nextRepeatDate.setDate(nextRepeatDate.getDate() + 2); // 2 days
			break;
		case 1:
			nextRepeatDate.setDate(nextRepeatDate.getDate() + 7); // 1 week
			break;
		case 2:
			nextRepeatDate.setDate(nextRepeatDate.getDate() + 14); // 2 weeks
			break;
		case 3:
			nextRepeatDate.setDate(nextRepeatDate.getDate() + 21); // 3 weeks
			break;
		case 4:
			nextRepeatDate.setDate(nextRepeatDate.getDate() + 28); // 4 weeks
			break;
		case 5:
			nextRepeatDate.setDate(nextRepeatDate.getDate() + 35); // 5 weeks
			break;
		case 6:
			nextRepeatDate.setDate(nextRepeatDate.getDate() + 42); // 6 weeks
			break;
		case 7:
			nextRepeatDate.setDate(nextRepeatDate.getDate() + 49); // 7 weeks
			break;
		case 8:
			nextRepeatDate.setDate(nextRepeatDate.getDate() + 56); // 8 weeks
			break;
		case 9:
			nextRepeatDate.setDate(nextRepeatDate.getDate() + 63); // 9 weeks
			break;
		case 10:
			nextRepeatDate.setDate(nextRepeatDate.getDate() + 70); // 10 weeks
			break;
		default:
			// For streaks > 10, cap at 10 weeks
			nextRepeatDate.setDate(nextRepeatDate.getDate() + 70);
			break;
	}

	return nextRepeatDate;
};
