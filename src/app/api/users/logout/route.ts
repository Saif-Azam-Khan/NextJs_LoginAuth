import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = NextResponse.json({
      message: "Logged out successfully",
      status: 200,
    });
    res.cookies.delete("token");

    return res;
  } catch (error) {
    return NextResponse.json({ error: "Error while logging out", status: 400 });
  }
}
