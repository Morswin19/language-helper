import * as React from "react";
import { getUserWords } from "@/app/requests/getUserWords";
import WordsGrid from "./wordsGrid";

export default async function UserWords({ params }: { params: { userID: string } }) {
	const words = await getUserWords(params.userID);

	return <WordsGrid words={words} />;
}
