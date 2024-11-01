import dbConnect from "@/app/lib/dbConnect";
import User from "@/app/models/User";
import { NextResponse } from "next/server";

export async function GET() {
	await dbConnect();
	try {
		const users = await User.find({});

		return NextResponse.json({ users });
	} catch (err: any) {
		return NextResponse.json({ err: err.message }, { status: 400 });
	}
}
