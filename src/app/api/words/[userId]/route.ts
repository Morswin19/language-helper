import dbConnect from "@/lib/dbConnect";
import Word from "@/models/Word";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { userId: string } }) {
	await dbConnect();
	try {
		const words = await Word.find({ userId: params.userId });

		return NextResponse.json({ words });
	} catch (err: any) {
		return NextResponse.json({ err: err.message });
	}
}
