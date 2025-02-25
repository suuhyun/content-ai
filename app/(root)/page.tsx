import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Sparkles } from "lucide-react";
import { SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Blob } from "@/components/ui/blob";
import { CursorEffect } from "@/components/ui/cursor-effect";
import MotionDiv from "@/components/MotionDiv";

export default async function LandingPage() {
  const { userId } = await auth();
  if (userId) redirect("/dashboard?category=All");

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-950 to-black overflow-hidden [cursor:none]">
      <CursorEffect />
      <div className="relative min-h-screen flex items-center justify-center px-6">
        <div className="absolute inset-0 flex items-center justify-center">
          <Blob />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-10">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <MotionDiv
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 mx-auto bg-gradient-to-r from-violet-400 to-pink-400 rounded-3xl flex items-center justify-center transform rotate-12"
            >
              <Sparkles className="w-10 h-10 text-white" />
            </MotionDiv>

            <h1 className="text-6xl md:text-7xl xl:text-8xl font-bold text-white tracking-tight">
              Create Content with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-400">
                AI Magic
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/70 font-light max-w-2xl mx-auto">
              Transform your ideas into engaging content in seconds with our
              AI-powered platform
            </p>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-center gap-4"
          >
            <SignInButton>
              <Button className="bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 text-white px-10 py-7 rounded-2xl text-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-violet-600/20">
                Start Creating
              </Button>
            </SignInButton>
            <span className="text-white/40 text-sm font-light">
              No credit card required
            </span>
          </MotionDiv>
        </div>

        <MotionDiv
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {[...Array(20)].map((_, i) => (
            <MotionDiv
              key={i}
              className="absolute w-2 h-2 bg-white/10 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -10, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </MotionDiv>
      </div>
    </div>
  );
}
