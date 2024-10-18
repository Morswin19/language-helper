import dbConnect from "@/app/lib/dbConnect";
import User from "@/app/models/User";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { userId: string } }) {
	await dbConnect();
	try {
		const user = await User.findById(params.userId);
		if (!user) return NextResponse.json({ err: "User not found" }, { status: 404 });

		return NextResponse.json({ user });
	} catch (err: any) {
		return NextResponse.json({ error: err.message }, { status: 500 });
	}
}

export async function PATCH(request: Request, { params }: { params: { userId: string } }) {
	await dbConnect();
	try {
		const body = await request.json();
		const updatedUser = await User.findByIdAndUpdate(params.userId, body, {
			new: true,
			runValidators: true,
		});
		if (!updatedUser) {
			return NextResponse.json({ error: "User not found" }, { status: 404 });
		}
		return NextResponse.json({ user: updatedUser });
	} catch (err: any) {
		return NextResponse.json({ error: err.message }, { status: 400 });
	}
}
