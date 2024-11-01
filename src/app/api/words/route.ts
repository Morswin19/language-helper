import dbConnect from "@/app/lib/dbConnect";
import Word from "@/app/models/Word";
import { NextResponse } from "next/server";

export async function GET() {
	await dbConnect();
	try {
		const words = await Word.find({});

		return NextResponse.json({ words });
	} catch (err: any) {
		return NextResponse.json({ err: err.message });
	}
}

export async function POST(request: Request) {
	await dbConnect();
	try {
		const body = await request.json();
		const newWord = new Word(body);
		const savedWord = await newWord.save(newWord);
		return NextResponse.json({ word: savedWord }, { status: 201 });
	} catch (err: any) {
		return NextResponse.json({ error: err.message }, { status: 400 });
	}
}
