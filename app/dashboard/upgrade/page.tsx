"use client";

import Header from "@/components/Header";
import MotionDiv from "@/components/MotionDiv";
import { Button } from "@/components/ui/button";
import { pointPackages } from "@/lib/constants";
import { Check, Sparkles, Zap } from 'lucide-react';
import { useRouter } from "next/navigation";


const UpgradePage = () => {
  const router = useRouter();

  const handleOnClick = async (packageType: string) => {
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ packageType }),
      });

      if (!response.ok) {
        throw new Error("Failed to initiate checkout");
      }

      const data = await response.json();
      router.push(data.url);
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-primary">
      <Header />
      <div className="max-w-4xl mx-auto pb-8 p-6 md:p-8 lg:p-10">
        <div className="flex flex-col items-center text-center mb-12">
          <h1 className="heading-primary mb-4">Purchase Points</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Power up your content creation with ContentAI points
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {pointPackages.map((pack, index) => (
            <MotionDiv
              key={pack.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {pack.popular && (
                <div className="z-10 absolute -top-4 left-0 right-0 flex justify-center">
                  <div className="btn-gradient !px-3 !py-1 !rounded-full !text-sm font-medium flex items-center gap-1">
                    <Sparkles className="w-4 h-4" />
                    Best Value
                  </div>
                </div>
              )}

              <div
                className={`h-full rounded-2xl p-6 backdrop-blur-xl
                  ${
                    pack.popular
                      ? "bg-white/10 dark:bg-gray-800/10 ring-2 ring-violet-500/20"
                      : "bg-white/5 dark:bg-gray-800/5"
                  }
                `}
              >
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                    {pack.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {pack.description}
                  </p>
                </div>

                <div className="mb-6">
                  <div className="flex flex-col">
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold text-gray-800 dark:text-gray-200">
                        {pack.price}
                      </span>
                    </div>
                    <div className="mt-2 space-y-1">
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                        <span className="text-gray-600 dark:text-gray-400">
                          {pack.points} points
                        </span>
                      </div>
                      {pack.bonus !== "0" && (
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-pink-600 dark:text-pink-400" />
                          <span className="text-pink-600 dark:text-pink-400">
                            +{pack.bonus} bonus points
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {pack.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-violet-500/10 dark:bg-violet-500/20 flex items-center justify-center">
                        <Check className="w-3 h-3 text-violet-600 dark:text-violet-400" />
                      </div>
                      <span className="text-gray-600 dark:text-gray-400">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <Button
                  className="w-full"
                  variant={pack.popular ? "default" : "outline"}
                  disabled={pack.button.disabled}
                  onClick={() => handleOnClick(pack.name)}
                >
                  {pack.button.text}
                </Button>
              </div>
            </MotionDiv>
          ))}
        </div>

        <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>10 point = 1 content generation</p>
          <p className="mt-2">
            Points are valid for the specified duration from the date of purchase
          </p>
        </div>
      </div>
    </div>
  );
};

export default UpgradePage;