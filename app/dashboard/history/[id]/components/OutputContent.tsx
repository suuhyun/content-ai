import ReactMarkdown from "react-markdown";

export default function OutputContent({
  description,
}: {
  description: string | null;
}) {
  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 whitespace-pre-line">
      <ReactMarkdown>{description}</ReactMarkdown>
    </div>
  );
}
