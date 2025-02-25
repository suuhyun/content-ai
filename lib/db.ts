import { AIOutput, PrismaClient } from "@prisma/client";
export const db = new PrismaClient();

export async function fetchOutputById(id: string): Promise<AIOutput | null> {
  try {
    if (!id) throw new Error("Invalid ID");

    const output = await db.aIOutput.findUnique({
      where: { id },
    });

    if (!output) throw new Error("Output not found");

    return output;
  } catch (error) {
    console.error("Error fetching output:", error);
    return null;
  }
}

export async function fetchHistory() {
  try {
    const history = await db.aIOutput.findMany({
      orderBy: { createdAt: "desc" },
    });

    if (!history || history.length === 0) {
      return null;
    }

    return history;
  } catch (error) {
    console.error("Failed to fetch history:", error);
    throw new Error("Failed to load history.");
  }
}

export async function getUserCredit(userId: string) {
  try {
    const user = await db.user.findUnique({
      where: { userId },
      select: { totalCredit: true },
    });

    return user?.totalCredit ?? 0;
  } catch (error) {
    console.error("Failed to fetch user credit:", error);
    return 0;
  }
}
