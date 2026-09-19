from flask import Flask, request, jsonify
from flask_cors import CORS
from database import get_db_connection, init_db

app = Flask(__name__)
CORS(app)

# Initialize database
init_db()


@app.route("/")
def home():
    return {
        "message": "Datastraw Support CRM API is running"
    }


# CREATE TICKET
@app.route("/api/tickets", methods=["POST"])
def create_ticket():

    data = request.get_json()

    # Check required fields
    required_fields = [
        "customer_name",
        "customer_email",
        "subject",
        "description"
    ]

    for field in required_fields:
        if not data.get(field):
            return jsonify({
                "error": f"{field} is required"
            }), 400

    # Generate ticket ID
    conn = get_db_connection()

    result = conn.execute(
        "SELECT COUNT(*) AS count FROM tickets"
    ).fetchone()

    next_number = result["count"] + 1

    ticket_id = f"TKT-{next_number:03d}"

    # Insert ticket
    conn.execute("""
        INSERT INTO tickets (
            ticket_id,
            customer_name,
            customer_email,
            subject,
            description
        )
        VALUES (?, ?, ?, ?, ?)
    """, (
        ticket_id,
        data["customer_name"],
        data["customer_email"],
        data["subject"],
        data["description"]
    ))

    conn.commit()

    # Get created ticket
    ticket = conn.execute("""
        SELECT ticket_id, created_at
        FROM tickets
        WHERE ticket_id = ?
    """, (ticket_id,)).fetchone()

    conn.close()

    return jsonify({
        "ticket_id": ticket["ticket_id"],
        "created_at": ticket["created_at"]
    }), 201

# GET ALL TICKETS
# GET ALL / SEARCH / FILTER TICKETS
@app.route("/api/tickets", methods=["GET"])
def get_tickets():

    status = request.args.get("status")
    search = request.args.get("search")

    conn = get_db_connection()

    query = """
        SELECT
            ticket_id,
            customer_name,
            subject,
            status,
            created_at
        FROM tickets
        WHERE 1=1
    """

    params = []

    # Filter by status
    if status and status != "All":
        query += " AND status = ?"
        params.append(status)

    # Search across ticket information
    if search:
        query += """
            AND (
                customer_name LIKE ?
                OR ticket_id LIKE ?
                OR customer_email LIKE ?
                OR description LIKE ?
                OR subject LIKE ?
            )
        """

        search_value = f"%{search}%"

        params.extend([
            search_value,
            search_value,
            search_value,
            search_value,
            search_value
        ])

    query += " ORDER BY created_at DESC"

    tickets = conn.execute(
        query,
        params
    ).fetchall()

    conn.close()

    return jsonify([
        dict(ticket)
        for ticket in tickets
    ])

    conn = get_db_connection()

    tickets = conn.execute("""
        SELECT
            ticket_id,
            customer_name,
            subject,
            status,
            created_at
        FROM tickets
        ORDER BY created_at DESC
    """).fetchall()

    conn.close()

    return jsonify([
        dict(ticket)
        for ticket in tickets
    ])

# GET SINGLE TICKET
@app.route("/api/tickets/<ticket_id>", methods=["GET"])
def get_ticket(ticket_id):

    conn = get_db_connection()

    ticket = conn.execute("""
        SELECT
            ticket_id,
            customer_name,
            customer_email,
            subject,
            description,
            status,
            created_at,
            updated_at
        FROM tickets
        WHERE ticket_id = ?
    """, (ticket_id,)).fetchone()

    if not ticket:
        conn.close()

        return jsonify({
            "error": "Ticket not found"
        }), 404

    notes = conn.execute("""
        SELECT
            id,
            note_text,
            created_at
        FROM notes
        WHERE ticket_id = ?
        ORDER BY created_at DESC
    """, (ticket_id,)).fetchall()

    conn.close()

    result = dict(ticket)

    result["notes"] = [
        dict(note)
        for note in notes
    ]

    return jsonify(result)

# UPDATE TICKET
@app.route("/api/tickets/<ticket_id>", methods=["PUT"])
def update_ticket(ticket_id):

    data = request.get_json()

    conn = get_db_connection()

    # Check if ticket exists
    ticket = conn.execute("""
        SELECT *
        FROM tickets
        WHERE ticket_id = ?
    """, (ticket_id,)).fetchone()

    if not ticket:
        conn.close()

        return jsonify({
            "error": "Ticket not found"
        }), 404

    status = data.get("status")
    note_text = data.get("notes")

    # Update status
    if status:

        allowed_statuses = [
            "Open",
            "In Progress",
            "Closed"
        ]

        if status not in allowed_statuses:
            conn.close()

            return jsonify({
                "error": "Invalid status"
            }), 400

        conn.execute("""
            UPDATE tickets
            SET status = ?,
                updated_at = CURRENT_TIMESTAMP
            WHERE ticket_id = ?
        """, (status, ticket_id))

    # Add note
    if note_text:

        conn.execute("""
            INSERT INTO notes (
                ticket_id,
                note_text
            )
            VALUES (?, ?)
        """, (ticket_id, note_text))

    conn.commit()

    updated_ticket = conn.execute("""
        SELECT updated_at
        FROM tickets
        WHERE ticket_id = ?
    """, (ticket_id,)).fetchone()

    conn.close()

    return jsonify({
        "success": True,
        "updated_at": updated_ticket["updated_at"]
    })

# DELETE TICKET
@app.route("/api/tickets/<ticket_id>", methods=["DELETE"])
def delete_ticket(ticket_id):

    conn = get_db_connection()

    # Check if ticket exists
    ticket = conn.execute("""
        SELECT ticket_id
        FROM tickets
        WHERE ticket_id = ?
    """, (ticket_id,)).fetchone()

    if not ticket:
        conn.close()

        return jsonify({
            "error": "Ticket not found"
        }), 404

    # Delete related notes first
    conn.execute("""
        DELETE FROM notes
        WHERE ticket_id = ?
    """, (ticket_id,))

    # Delete ticket
    conn.execute("""
        DELETE FROM tickets
        WHERE ticket_id = ?
    """, (ticket_id,))

    conn.commit()
    conn.close()

    return jsonify({
        "success": True,
        "message": "Ticket deleted successfully"
    })


if __name__ == "__main__":
    app.run(debug=True)