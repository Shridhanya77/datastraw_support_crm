import os
import sqlite3
from pathlib import Path

DATABASE = Path(__file__).parent / "crm.db"


class SQLiteConnection:
    def __init__(self):
        self.conn = sqlite3.connect(DATABASE)
        self.conn.row_factory = sqlite3.Row

    def execute(self, query, params=()):
        return self.conn.execute(query, params)

    def commit(self):
        self.conn.commit()

    def close(self):
        self.conn.close()


class PostgreSQLConnection:
    def __init__(self):
        import psycopg2
        from psycopg2.extras import RealDictCursor

        self.conn = psycopg2.connect(os.environ["DATABASE_URL"])
        self.cursor_factory = RealDictCursor

    def execute(self, query, params=()):
        query = query.replace("?", "%s")
        cursor = self.conn.cursor(cursor_factory=self.cursor_factory)
        cursor.execute(query, params)
        return cursor

    def commit(self):
        self.conn.commit()

    def close(self):
        self.conn.close()


def get_db_connection():
    if os.environ.get("DATABASE_URL"):
        return PostgreSQLConnection()

    return SQLiteConnection()


def init_db():
    conn = get_db_connection()

    conn.execute("""
        CREATE TABLE IF NOT EXISTS tickets (
            id SERIAL PRIMARY KEY,
            ticket_id TEXT UNIQUE NOT NULL,
            customer_name TEXT NOT NULL,
            customer_email TEXT NOT NULL,
            subject TEXT NOT NULL,
            description TEXT NOT NULL,
            status TEXT NOT NULL DEFAULT 'Open',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    conn.execute("""
        CREATE TABLE IF NOT EXISTS notes (
            id SERIAL PRIMARY KEY,
            ticket_id TEXT NOT NULL,
            note_text TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (ticket_id) REFERENCES tickets(ticket_id)
        )
    """)

    conn.commit()
    conn.close()