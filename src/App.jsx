import { useState } from "react";
import LeadForm from "./components/LeadForm";
import LeadList from "./components/LeadList";

export default function App() {
  const [refresh, setRefresh] = useState(0);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <LeadForm onLeadAdded={() => setRefresh(refresh + 1)} />
      <LeadList refreshTrigger={refresh} />
    </div>
  );
}
