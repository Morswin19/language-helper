import dbConnect from "@/lib/dbConnect";
import Word from "@/models/Word";
import { NextResponse } from "next/server";

export async function PATCH(request: Request, { params }: { params: { wordId: string } }) {
	await dbConnect();
	try {
		const body = await request.json();
		const updatedWord = await Word.findByIdAndUpdate(params.wordId, body, {
			new: true,
			runValidators: true,
		});
		if (!updatedWord) {
			return NextResponse.json({ error: "Word not found" }, { status: 404 });
		}
		return NextResponse.json({ word: updatedWord });
	} catch (err: any) {
		return NextResponse.json({ error: err.message }, { status: 400 });
	}
}

export async function DELETE(request: Request, { params }: { params: { wordId: string } }) {
	await dbConnect();
	try {
		const deletedWord = await Word.findByIdAndDelete(params.wordId);
		if (!deletedWord) {
			return NextResponse.json({ error: "Word not found" }, { status: 404 });
		}
		return NextResponse.json({ message: "Word deleted successfully" });
	} catch (err: any) {
		return NextResponse.json({ error: err.message }, { status: 400 });
	}
}
