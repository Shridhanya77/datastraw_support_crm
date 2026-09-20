const API_BASE_URL = "https://datastraw-support-crm-2.onrender.com/api";

export async function getTickets(search = "", status = "All") {
  let url = `${API_BASE_URL}/tickets?`;

  if (search) {
    url += `search=${encodeURIComponent(search)}&`;
  }

  if (status !== "All") {
    url += `status=${encodeURIComponent(status)}`;
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch tickets");
  }

  return response.json();
}

export async function getTicket(ticketId) {
  const response = await fetch(
    `${API_BASE_URL}/tickets/${ticketId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch ticket");
  }

  return response.json();
}

export async function createTicket(ticketData) {
  const response = await fetch(`${API_BASE_URL}/tickets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ticketData),
  });

  if (!response.ok) {
    throw new Error("Failed to create ticket");
  }

  return response.json();
}

export async function updateTicket(ticketId, data) {
  const response = await fetch(
    `${API_BASE_URL}/tickets/${ticketId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update ticket");
  }

  return response.json();
}

export async function deleteTicket(ticketId) {
  const response = await fetch(
    `${API_BASE_URL}/tickets/${ticketId}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete ticket");
  }

  return response.json();
}