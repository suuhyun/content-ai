import Stripe from "stripe";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { packageType } = await req.json();

    const packages = {
      "Starter Pack": { points: 500, price: 500, description: "Starter AI Credit - 500 points" },
      "Pro Pack": { points: 1200, price: 1000, description: "Pro AI Credit - 1,200 points" },
    };

    const selectedPackage = packages[packageType as keyof typeof packages];

    if (!selectedPackage) {
      return new NextResponse("Invalid Package", { status: 400 });
    }

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        quantity: 1,
        price_data: {
          currency: "USD",
          product_data: {
            name: `${packageType}`,
            description: selectedPackage.description,
          },
          unit_amount: selectedPackage.price,
        },
      },
    ];

    await db.purchase.create({
      data: {
        userId: userId,
        credit: selectedPackage.points,
      },
    });

    let stripeCustomer = await db.stripeCustomer.findUnique({
      where: { userId: userId },
      select: { stripeCustomerId: true },
    });

    if (!stripeCustomer) {
      const customer = await stripe.customers.create({
        email: user?.emailAddresses[0].emailAddress,
      });

      stripeCustomer = await db.stripeCustomer.create({
        data: {
          userId: userId,
          stripeCustomerId: customer.id,
        },
      });
    }

    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomer.stripeCustomerId,
      line_items,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?category=All`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
      metadata: {
        userId: userId,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe Checkout Error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}