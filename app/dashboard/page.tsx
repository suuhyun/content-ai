"use client"

import { useState, useEffect } from "react"
import { contentTypes } from "@/lib/constants"
import MotionDiv from "@/components/MotionDiv"
import { ContentCard } from "./components/ContentCard"
import Header from "@/components/Header"

export default function DashboardPage() {
  const [searchInput, setSearchInput] = useState("All")
  const [templateList, setTemplateList] = useState(contentTypes)

  useEffect(() => {
    if (searchInput !== "All") {
      const filteredTemplates = contentTypes.filter((type) =>
        type.title.toLowerCase().includes(searchInput.toLowerCase()),
      )
      setTemplateList(filteredTemplates)
    } else {
      setTemplateList(contentTypes)
    }
  }, [searchInput])

  return (
      <div className="flex h-screen">
        <div className="flex-1 flex flex-col overflow-hidden bg-primary">
          <Header type="search" onSearchInput={setSearchInput} />
          <main className="flex-1 overflow-auto">
            <div className="w-full max-w-7xl mx-auto p-6 md:p-8 lg:p-10">
              <div className="flex items-center justify-between mb-10">
                <h1 className="heading-primary">
                  Content Generator
                </h1>
                <div className="text-sm font-medium text-violet-600/60 dark:text-violet-400/60">
                  {contentTypes.length} templates available
                </div>
              </div>
              <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {templateList.map((type, index) => (
                  <MotionDiv
                    key={type.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ContentCard
                      title={type.title}
                      description={type.description}
                      icon={type.icon}
                      slug={type.slug}
                      index={index}
                      color={type.color}
                    />
                  </MotionDiv>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
  )
}

