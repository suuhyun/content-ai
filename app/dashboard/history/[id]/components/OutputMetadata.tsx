interface OutputMetadataProps {
    templateUsed: string
    createdAt: string | Date
  }

export default function OutputMetadata({ templateUsed, createdAt } :OutputMetadataProps) {
    return (
      <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Additional Information</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Template</div>
            <div className="text-gray-800 dark:text-gray-200">{templateUsed}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Created</div>
            <div className="text-gray-800 dark:text-gray-200">{new Date(createdAt).toLocaleString()}</div>
          </div>
        </div>
      </div>
    )
  }