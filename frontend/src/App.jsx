import { useEffect, useState } from "react";
import CreateTicket from "./CreateTicket";
import { getTickets } from "./services/api";
import TicketDetails from "./TicketDetails";

function App() {
  const [showCreateTicket, setShowCreateTicket] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

const ticketsPerPage = 10;

  async function loadTickets() {
    try {
      setLoading(true);
      setError("");

      const data = await getTickets(search, status);
      setTickets(data);
    } catch (err) {
      console.error(err);
      setError("Unable to load tickets.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
  setCurrentPage(1);
  loadTickets();
}, [search, status]);

const totalPages = Math.ceil(
  tickets.length / ticketsPerPage
);

const startIndex =
  (currentPage - 1) * ticketsPerPage;

const visibleTickets = tickets.slice(
  startIndex,
  startIndex + ticketsPerPage
);
  const totalTickets = tickets.length;

  const openTickets = tickets.filter(
    (ticket) => ticket.status === "Open"
  ).length;

  const inProgressTickets = tickets.filter(
    (ticket) => ticket.status === "In Progress"
  ).length;

  const closedTickets = tickets.filter(
    (ticket) => ticket.status === "Closed"
  ).length;

  // Create Ticket page
  if (showCreateTicket) {
    return (
      <CreateTicket
        onBack={() => setShowCreateTicket(false)}
        onCreated={() => {
          setShowCreateTicket(false);
          loadTickets();
        }}
      />
    );
  }

  // Ticket Details page
  if (selectedTicket) {
    return (
      <TicketDetails
        ticketId={selectedTicket}
        onBack={() => {
          setSelectedTicket(null);
          loadTickets();
        }}
      />
    );
  }

  // Dashboard
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
<header className="bg-white border-b">
  <div className="max-w-7xl mx-auto px-6 py-4">
    <div className="flex items-center justify-between">

      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          SupportCRM
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Customer Support Ticket Management
        </p>
      </div>

      <div className="hidden sm:flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center">
          <span className="text-sm font-semibold text-blue-700">
            A
          </span>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-900">
            Admin
          </p>
          <p className="text-xs text-gray-500">
            Support Team
          </p>
        </div>
      </div>

    </div>
  </div>
</header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-6 py-8">

        {/* Dashboard heading */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Dashboard
            </h2>

            <p className="text-gray-500 mt-1">
              Manage and track customer support tickets.
            </p>
          </div>

          <button
            onClick={() => setShowCreateTicket(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-medium"
          >
            + New Ticket
          </button>
        </div>

        {/* Summary cards */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

  {/* Total */}
  <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
    <div className="flex items-center justify-between">
      <p className="text-sm font-medium text-gray-500">
        Total Tickets
      </p>

      <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center">
        <span className="text-gray-600 font-semibold">
          #
        </span>
      </div>
    </div>

    <p className="text-3xl font-bold text-gray-900 mt-4">
      {totalTickets}
    </p>

    <p className="text-xs text-gray-500 mt-1">
      All support requests
    </p>
  </div>

  {/* Open */}
  <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
    <div className="flex items-center justify-between">
      <p className="text-sm font-medium text-gray-500">
        Open
      </p>

      <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center">
        <span className="text-blue-600 font-semibold">
          O
        </span>
      </div>
    </div>

    <p className="text-3xl font-bold text-blue-600 mt-4">
      {openTickets}
    </p>

    <p className="text-xs text-gray-500 mt-1">
      Awaiting support
    </p>
  </div>

  {/* In Progress */}
  <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
    <div className="flex items-center justify-between">
      <p className="text-sm font-medium text-gray-500">
        In Progress
      </p>

      <div className="w-9 h-9 rounded-lg bg-yellow-100 flex items-center justify-center">
        <span className="text-yellow-600 font-semibold">
          P
        </span>
      </div>
    </div>

    <p className="text-3xl font-bold text-yellow-600 mt-4">
      {inProgressTickets}
    </p>

    <p className="text-xs text-gray-500 mt-1">
      Currently being handled
    </p>
  </div>

  {/* Closed */}
  <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
    <div className="flex items-center justify-between">
      <p className="text-sm font-medium text-gray-500">
        Closed
      </p>

      <div className="w-9 h-9 rounded-lg bg-green-100 flex items-center justify-center">
        <span className="text-green-600 font-semibold">
          ✓
        </span>
      </div>
    </div>

    <p className="text-3xl font-bold text-green-600 mt-4">
      {closedTickets}
    </p>

    <p className="text-xs text-gray-500 mt-1">
      Resolved tickets
    </p>
  </div>

</div>

        {/* Search and filter */}
<div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-6">

  <div className="flex flex-col lg:flex-row lg:items-end gap-4">

    <div className="flex-1">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Search Tickets
      </label>

      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          🔍
        </span>

        <input
          type="text"
          placeholder="Search by ticket ID, customer, email, subject or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 rounded-lg pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>

    <div className="w-full lg:w-56">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Filter by Status
      </label>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="All">All Statuses</option>
        <option value="Open">Open</option>
        <option value="In Progress">In Progress</option>
        <option value="Closed">Closed</option>
      </select>
    </div>

  </div>

  <div className="mt-4 text-sm text-gray-500">
    Showing <span className="font-medium text-gray-700">{tickets.length}</span>{" "}
    {tickets.length === 1 ? "ticket" : "tickets"}
  </div>

</div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 mb-6">
            {error}
          </div>
        )}

        {/* Tickets */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">

          <div className="px-6 py-5 border-b">
            <h3 className="text-lg font-semibold text-gray-900">
              Tickets
            </h3>
          </div>

          {loading ? (
            <div className="p-8 text-center text-gray-500">
              Loading tickets...
            </div>
          ) : tickets.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No tickets found.
            </div>
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      Ticket ID
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      Customer
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      Subject
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      Status
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      Created
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y">

                  {visibleTickets.map((ticket) => (
                    <tr
                      key={ticket.ticket_id}
                      className="hover:bg-gray-50"
                    >

                      {/* Ticket ID */}
                      <td className="px-6 py-4">
                        <button
                          onClick={() =>
                            setSelectedTicket(ticket.ticket_id)
                          }
                          className="font-medium text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          {ticket.ticket_id}
                        </button>
                      </td>

                      {/* Customer */}
                      <td className="px-6 py-4 text-gray-900">
                        {ticket.customer_name}
                      </td>

                      {/* Subject */}
                      <td className="px-6 py-4 text-gray-700">
                        {ticket.subject}
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">

                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                            ticket.status === "Open"
                              ? "bg-blue-100 text-blue-700"
                              : ticket.status === "In Progress"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {ticket.status}
                        </span>

                      </td>

                      {/* Created */}
                      <td className="px-6 py-4 text-gray-500 text-sm">
                        {ticket.created_at}
                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

{totalPages > 1 && (
  <div className="flex items-center justify-between px-6 py-4 border-t">

    <p className="text-sm text-gray-500">
      Page {currentPage} of {totalPages}
    </p>

    <div className="flex gap-2">

      <button
        onClick={() =>
          setCurrentPage((page) => Math.max(page - 1, 1))
        }
        disabled={currentPage === 1}
        className="px-4 py-2 border border-gray-300 rounded-lg text-sm disabled:opacity-40"
      >
        Previous
      </button>

      <button
        onClick={() =>
          setCurrentPage((page) =>
            Math.min(page + 1, totalPages)
          )
        }
        disabled={currentPage === totalPages}
        className="px-4 py-2 border border-gray-300 rounded-lg text-sm disabled:opacity-40"
      >
        Next
      </button>

    </div>

  </div>
)}
            </div>
          )}

        </div>

      </main>

    </div>
  );
}

export default App;