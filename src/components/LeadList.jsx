import { useEffect, useState } from "react";
import { getLeads } from "../api/leadApi";

export default function LeadList({ refreshTrigger }) {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    getLeads().then(setLeads).catch(console.error);
  }, [refreshTrigger]);

  return (
    <div className="bg-white shadow p-6 rounded-lg mt-6">
      <h2 className="text-xl font-bold mb-4">Leads</h2>
      {leads.length === 0 ? (
        <p className="text-gray-500">No leads found.</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Company</th>
              <th className="p-2 border">Notes</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead._id}>
                <td className="p-2 border">{lead.name}</td>
                <td className="p-2 border">{lead.email}</td>
                <td className="p-2 border">{lead.phone}</td>
                <td className="p-2 border">{lead.company}</td>
                <td className="p-2 border">{lead.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
