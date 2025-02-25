"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader, ArrowLeft } from "lucide-react";
import Editor from "./components/Editor";
import { contentTypes } from "@/lib/constants";
import { chatSession } from "@/lib/gemini-ai";
import Link from "next/link";
import Header from "@/components/Header";
import { UserCreditContext, useUserCredit } from "@/app/context/UserCreditProvider";
import { toast } from "sonner";

export default function TemplateSlug() {
  const { templateSlug } = useParams();
  const selectedTemplate = contentTypes.find(
    (item) => item.slug === templateSlug
  );
  const [isLoading, setIsLoading] = useState(false);
  const [aiOutput, setAIOutput] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const { deductCredit, totalCredit } = useUserCredit();

  const generateAIContent = async (formData: FormData) => {
    if (totalCredit < 10) {
      toast("Not enough points to generate content.");
      return;
    }
    setIsLoading(true);
    try {
      const dataSet = {
        title: formData.get("title"),
        description: formData.get("description"),
      };

      const selectedPrompt = selectedTemplate?.aiPrompt;
      const finalAIPrompt = JSON.stringify(dataSet) + ", " + selectedPrompt;

      const result = await chatSession.sendMessage(finalAIPrompt);
      const aiText = result.response?.candidates?.[0]?.content.parts[0].text;
      setAIOutput(aiText || "");

      const response = await fetch("/api/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: dataSet.title,
          description: aiText,
          templateUsed: selectedTemplate?.title,
        }),
      });
      if (!response.ok) {
        toast("Failed to generate content");
        return;
      }
      deductCredit(10);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 h-screen overflow-auto bg-primary">
      <Header type="default" />
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center gap-6 mb-8">
          <Link
            href="/dashboard?category=All"
            className="p-2.5 rounded-2xl glass-bg glass-hover"
          >
            <ArrowLeft className="w-5 h-5 text-violet-500 dark:text-violet-400" />
          </Link>
          <div>
            <h1 className="heading-primary">{selectedTemplate?.title}</h1>
            <p className="subtext">{selectedTemplate?.description}</p>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                generateAIContent(formData);
              }}
            >
              <div className="card space-y-6">
                <div className="card-gradient" />
                {selectedTemplate?.form?.map((form) => (
                  <div key={form.label} className="relative">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {form.label}
                    </label>
                    {form.field === "input" ? (
                      <Input
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="input-field"
                      />
                    ) : (
                      <Textarea
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="textarea-field"
                      />
                    )}
                  </div>
                ))}
              </div>

              <Button
                className="btn-gradient w-full h-12 hover:scale-[1.02]"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Content"
                )}
              </Button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="card"
          >
            <div className="card-gradient" />
            <div className="relative">
              <h2 className="!text-xl font-semibold mb-4 heading-primary">
                Generated Content
              </h2>
              <Editor value={isLoading ? "Generating..." : aiOutput} />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
