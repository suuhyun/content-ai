import { POINTS_PER_QUESTION } from "@/lib/constants";
import { db, getUserCredit } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ totalCredit: 0 }, { status: 401 });

  const totalCredit = await getUserCredit(userId);
  return NextResponse.json({ totalCredit });
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("User not Authenticated", { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { userId },
      select: { totalCredit: true },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    if (user.totalCredit < POINTS_PER_QUESTION) {
      return new NextResponse("Not enough points", { status: 403 });
    }

    await db.user.update({
      where: { userId },
      data: { totalCredit: user.totalCredit - POINTS_PER_QUESTION },
    });

    return new NextResponse(
      JSON.stringify({
        success: true,
        newCredit: user.totalCredit - POINTS_PER_QUESTION,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error deducting credit:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
