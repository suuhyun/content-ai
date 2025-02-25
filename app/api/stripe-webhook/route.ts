import { db } from "@/lib/db";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const packages = {
  "Starter Pack": { points: 500 },
  "Pro Pack": { points: 1200 },
} as const;

export async function POST(req: Request) {
  const body = await req.text();
  const stripeHeader = await headers();
  const sig = stripeHeader.get("stripe-signature");

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    return NextResponse.json({ error: "Invalid Signature" }, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const userId = session?.metadata?.userId;
  const packageType = session?.metadata?.packageType;

  if (event.type === "checkout.session.completed") {
    if (!userId || !packageType || !(packageType in packages)) {
      return new NextResponse("Invalid session", { status: 400 });
    }

    try {
      const selectedPackage = packages[packageType as keyof typeof packages];

      const user = await db.user.findUnique({
        where: { userId },
      });

      if (!user) return new NextResponse("Invalid session", { status: 400 });

      await db.user.update({
        where: { userId },
        data: {
          totalCredit: user.totalCredit + selectedPackage.points,
        },
      });
      
    } catch (error) {
      return new NextResponse("Error updating user credits", { status: 500 });
    }
  } else {
    return new NextResponse("Invalid event", { status: 200 });
  }

  return new NextResponse("Success", { status: 200 });
}
