"use client"

import ReactMarkdown from "react-markdown";

export default function Editor({ value }: { value: string }) {
  return (
    <div className="editor-wrapper">
      <div className="editor-content">
        <ReactMarkdown>{value}</ReactMarkdown>
      </div>
    </div>
  )
}