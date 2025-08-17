"use client";

import { useWordStore } from "@/store/wordStore";
import { Box, Button, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import { Temporal } from "temporal-polyfill";
import { texts } from "@/constants/texts";

function RepeatsCalendar() {
	const [month, setMonth] = useState(Temporal.Now.plainDateISO().month);
	const [year, setYear] = useState(Temporal.Now.plainDateISO().year);
	const [monthCalendar, setMonthCalendar] = useState<
		{ date: Temporal.PlainDate; isInMonth: boolean }[]
	>([]);
	const [repeatsByDate, setRepeatsByDate] = useState<
		{ day: number; month: number; year: number; count: number }[]
	>([]);
	const { storeWords } = useWordStore();

	const next = () => {
		const { month: nextMonth, year: nextYear } = Temporal.PlainYearMonth.from({
			month,
			year,
		}).add({ months: 1 });
		setMonth(nextMonth);
		setYear(nextYear);
	};

	const previous = () => {
		const { month: prevMonth, year: prevYear } = Temporal.PlainYearMonth.from({
			month,
			year,
		}).subtract({ months: 1 });
		setMonth(prevMonth);
		setYear(prevYear);
	};

	useEffect(() => {
		const fiveWeeks = 5 * 7;
		const sixWeeks = 6 * 7;
		const startOfMonth = Temporal.PlainDate.from({ year, month, day: 1 });
		const monthLength = startOfMonth.daysInMonth;
		const dayOfWeekMonthStartedOn = startOfMonth.dayOfWeek - 1;
		// Calculate the overall length including days from the previous and next months to be shown
		const length = dayOfWeekMonthStartedOn + monthLength > fiveWeeks ? sixWeeks : fiveWeeks;

		// Create blank array
		const calendar = new Array(length)
			.fill({})
			// Populate each day in the array
			.map((_, index) => {
				const date = startOfMonth.add({
					days: index - dayOfWeekMonthStartedOn,
				});
				return {
					isInMonth: !(
						index < dayOfWeekMonthStartedOn || index - dayOfWeekMonthStartedOn >= monthLength
					),
					date,
				};
			});

		setMonthCalendar(calendar);
	}, [year, month]);

	useEffect(() => {
		const wordsFilterByDate = storeWords.map((word) => word.nextRepeatDate);
		const dateCountArray = wordsFilterByDate.reduce(
			(acc, dateString) => {
				const date = new Date(dateString);
				let day;
				let month;
				let year;
				if (date < new Date()) {
					const today = new Date();
					day = today.getDate();
					month = today.getMonth() + 1; // getMonth() is 0-indexed
					year = today.getFullYear();
				} else {
					day = date.getDate();
					month = date.getMonth() + 1; // getMonth() is 0-indexed
					year = date.getFullYear();
				}

				// Find existing entry for this date
				const existingEntry = acc.find(
					(item) => item.day === day && item.month === month && item.year === year,
				);

				if (existingEntry) {
					existingEntry.count++;
				} else {
					acc.push({ day, month, year, count: 1 });
				}

				return acc;
			},
			[] as { day: number; month: number; year: number; count: number }[],
		);
		setRepeatsByDate(dateCountArray);
	}, [storeWords]);

	return (
		<Container className="mt-8">
			<Typography variant="h5" component="h1" className="">
				{texts.calendar.numberOfRepeats}
			</Typography>
			<Box className="flex flex-col">
				<Box className="mt-0 md:mt-8 md:flex md:flex-row-reverse md:items-center md:justify-between">
					<Box className="mt-4 flex justify-start gap-4 py-4 md:mt-0">
						<Button
							variant="contained"
							startIcon={<ChevronLeftIcon />}
							className="me-2 w-[120px]"
							onClick={previous}
						>
							{texts.calendar.previous}
						</Button>
						<Button
							variant="contained"
							endIcon={<ChevronRightIcon />}
							className="w-[120px]"
							onClick={next}
						>
							{texts.calendar.next}
						</Button>
					</Box>
					<Typography variant="h5" component="p" className="mt-4">
						{Temporal.PlainDate.from({ year, month, day: 1 }).toLocaleString("en", {
							month: "long",
							year: "numeric",
						})}
					</Typography>
				</Box>
				<Box className="grid grid-cols-7">
					{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((name, index) => (
						<Box key={index}>{name}</Box>
					))}
				</Box>
				<Box className="grid flex-grow grid-cols-7">
					{monthCalendar.map((day, index) => (
						<Box
							key={index}
							className={`h-20 border border-slate-700 p-1 md:p-2 ${
								day.isInMonth
									? "bg-[var(--mui-palette-secondary-light)]"
									: "bg-[var(--mui-palette-secondary-main)]"
							}`}
						>
							<Typography color="primary.light" className="!text-sm">
								{day.date.day}
							</Typography>
							{repeatsByDate.map((date, index) => {
								if (
									date.day === day.date.day &&
									date.month === day.date.month &&
									date.year === day.date.year
								) {
									return (
										<>
											<Typography key={index} className="hidden md:inline-block md:!text-base">
												{date.count} {texts.repeats.title}
											</Typography>
											<Typography key={index} className="inline-block !text-sm md:hidden">
												{date.count} {texts.repeats.titleMobile}
											</Typography>
										</>
									);
								}
							})}
						</Box>
					))}
				</Box>
			</Box>
		</Container>
	);
}

export default RepeatsCalendar;
