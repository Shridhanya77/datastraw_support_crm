import { useEffect, useState } from "react";
import { getTicket, updateTicket, deleteTicket } from "./services/api";

function TicketDetails({ ticketId, onBack }) {
  const [ticket, setTicket] = useState(null);
  const [status, setStatus] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function loadTicket() {
    try {
      setLoading(true);
      setError("");

      const data = await getTicket(ticketId);

      setTicket(data);
      setStatus(data.status);
    } catch (err) {
      console.error(err);
      setError("Unable to load ticket.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTicket();
  }, [ticketId]);

  async function handleUpdate() {
    try {
      setSaving(true);
      setError("");

      await updateTicket(ticketId, {
        status,
        notes: note,
      });

      setNote("");

      await loadTicket();
    } catch (err) {
      console.error(err);
      setError("Unable to update ticket.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
  const confirmed = window.confirm(
    "Are you sure you want to delete this ticket?"
  );

  if (!confirmed) {
    return;
  }

  try {
    setSaving(true);
    setError("");

    await deleteTicket(ticketId);

    onBack();
  } catch (err) {
    console.error(err);
    setError("Unable to delete ticket.");
  } finally {
    setSaving(false);
  }
}

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">
          Loading ticket...
        </p>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={onBack}
            className="text-blue-600 hover:text-blue-700"
          >
            ← Back to Dashboard
          </button>

          <p className="mt-6 text-red-600">
            Ticket not found.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-5xl mx-auto px-6 py-5">

          <h1 className="text-2xl font-bold text-gray-900">
            SupportCRM
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Customer Support Ticket Management
          </p>

        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">

        {/* Back button */}
        <button
          onClick={onBack}
          className="text-blue-600 hover:text-blue-700 mb-6"
        >
          ← Back to Dashboard
        </button>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 mb-6">
            {error}
          </div>
        )}

        {/* Ticket information */}
        <div className="bg-white rounded-xl shadow-sm p-8">

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">

            <div>
              <p className="text-sm font-medium text-blue-600">
                {ticket.ticket_id}
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-1">
                {ticket.subject}
              </h2>
            </div>

            <span
              className={`inline-flex w-fit px-3 py-1 rounded-full text-sm font-medium ${
                ticket.status === "Open"
                  ? "bg-blue-100 text-blue-700"
                  : ticket.status === "In Progress"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {ticket.status}
            </span>

          </div>

          {/* Customer */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

            <div>
              <p className="text-sm text-gray-500">
                Customer Name
              </p>

              <p className="mt-1 font-medium text-gray-900">
                {ticket.customer_name}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Customer Email
              </p>

              <p className="mt-1 font-medium text-gray-900">
                {ticket.customer_email}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Created At
              </p>

              <p className="mt-1 text-gray-900">
                {ticket.created_at}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Last Updated
              </p>

              <p className="mt-1 text-gray-900">
                {ticket.updated_at}
              </p>
            </div>

          </div>

          {/* Description */}
          <div className="mt-8">

            <p className="text-sm text-gray-500">
              Description
            </p>

            <div className="mt-2 bg-gray-50 rounded-lg p-4 text-gray-700">
              {ticket.description}
            </div>

          </div>

        </div>

        {/* Update ticket */}
        <div className="bg-white rounded-xl shadow-sm p-8 mt-6">

          <h3 className="text-lg font-semibold text-gray-900">
            Update Ticket
          </h3>

          <div className="mt-5">

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full md:w-64 border border-gray-300 rounded-lg px-4 py-3 bg-white"
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Closed">Closed</option>
            </select>

          </div>

          <div className="mt-5">

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Add Note / Comment
            </label>

            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows="4"
              placeholder="Add a note about this ticket..."
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />

          </div>

          <div className="mt-5 flex flex-col sm:flex-row gap-3">

  <button
    onClick={handleUpdate}
    disabled={saving}
    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-medium disabled:opacity-50"
  >
    {saving ? "Saving..." : "Save Changes"}
  </button>

  <button
    onClick={handleDelete}
    disabled={saving}
    className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-lg font-medium disabled:opacity-50"
  >
    Delete Ticket
  </button>

</div>

        </div>

        {/* Notes */}
        <div className="bg-white rounded-xl shadow-sm p-8 mt-6">

          <h3 className="text-lg font-semibold text-gray-900">
            Notes & Comments
          </h3>

          {ticket.notes.length === 0 ? (
            <p className="text-gray-500 mt-4">
              No notes yet.
            </p>
          ) : (
            <div className="mt-5 space-y-4">

              {ticket.notes.map((item) => (
                <div
                  key={item.id}
                  className="border border-gray-200 rounded-lg p-4"
                >

                  <p className="text-gray-800">
                    {item.note_text}
                  </p>

                  <p className="text-xs text-gray-500 mt-2">
                    {item.created_at}
                  </p>

                </div>
              ))}

            </div>
          )}

        </div>

      </main>

    </div>
  );
}

export default TicketDetails;