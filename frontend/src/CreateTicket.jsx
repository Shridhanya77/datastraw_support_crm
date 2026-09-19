import { useState } from "react";
import { createTicket } from "./services/api";

function CreateTicket({ onBack, onCreated }) {
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_email: "",
    subject: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const result = await createTicket(formData);

      onCreated(result);
    } catch (err) {
      console.error(err);
      setError("Unable to create ticket.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <header className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-6 py-5">

          <h1 className="text-2xl font-bold text-gray-900">
            SupportCRM
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Customer Support Ticket Management
          </p>

        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">

        <button
          onClick={onBack}
          className="text-blue-600 hover:text-blue-700 mb-6"
        >
          ← Back to Dashboard
        </button>

        <div className="bg-white rounded-xl shadow-sm p-8">

          <h2 className="text-2xl font-semibold text-gray-900">
            Create New Ticket
          </h2>

          <p className="text-gray-500 mt-1 mb-8">
            Enter the customer's issue details below.
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Customer Name
                </label>

                <input
                  type="text"
                  name="customer_name"
                  value={formData.customer_name}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Rahul Kumar"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Customer Email
                </label>

                <input
                  type="email"
                  name="customer_email"
                  value={formData.customer_email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="rahul@example.com"
                />
              </div>

            </div>

            <div className="mt-6">

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Issue Title
              </label>

              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Unable to login"
              />

            </div>

            <div className="mt-6">

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="6"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Describe the customer's issue..."
              />

            </div>

            <div className="mt-8 flex gap-4">

              <button
                type="button"
                onClick={onBack}
                className="px-5 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium disabled:opacity-50"
              >
                {loading ? "Creating..." : "Create Ticket"}
              </button>

            </div>

          </form>

        </div>

      </main>

    </div>
  );
}

export default CreateTicket;