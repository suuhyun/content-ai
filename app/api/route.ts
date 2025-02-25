import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("User not Authenticated", { status: 401 });
    }

    const { title, description, templateUsed } = await req.json();
    const createNewOutput = await db.aIOutput.create({
      data: {
        userId,
        title,
        description: description || "",
        templateUsed,
      },
    });

    revalidatePath("/");
    revalidatePath(`/dashboard/history`);

    return new NextResponse(JSON.stringify(createNewOutput), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("POST AI GENERATE: Error generating output", error);
    return new NextResponse("POST AI GENERATE: Error generating output", {
      status: 500,
    });
  }
}