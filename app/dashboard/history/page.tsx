import { fetchHistory } from "@/lib/db";
import HistoryContent from "./components/HistoryContent";
import { ErrorMessage } from "@/components/ErrorMessage";

export default async function HistoryPage() {
  try {
    const history = await fetchHistory();

    if (history === null) {
      return <ErrorMessage title="No history found" message="Try generating some content first!" />;
    }

    return <HistoryContent initialHistory={history} />;
  } catch (error) {
    return <ErrorMessage title="Failed to load history" message="Please try again later." />;
  }
}