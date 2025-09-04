const API_URL = "http://localhost:5000/api/leads";

export async function getLeads() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch leads");
  return res.json();
}

export async function createLead(data) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create lead");
  return res.json();
}
