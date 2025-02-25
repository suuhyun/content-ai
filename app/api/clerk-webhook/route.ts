import { db } from "@/lib/db"
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { data, type } = await req.json();

    if (type === "user.created") {
      const userId = data.id;
      await db.user.create({
        data: {
          userId,
          totalCredit: 1000,
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Clerk Webhook Error:", error);
    return new NextResponse("Error processing webhook", { status: 500 });
  }
}
