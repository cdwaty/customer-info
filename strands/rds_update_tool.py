import os
import psycopg2
from strands_agents import Tool

class RdsUpdateTool(Tool):
    def __init__(self):
        self.conn_params = {
            "host": os.environ["DB_HOST"],
            "dbname": os.environ["DB_NAME"],
            "user": os.environ["DB_USER"],
            "password": os.environ["DB_PASSWORD"],
            "port": os.environ.get("DB_PORT", 5432),
        }

    def run(self, s3_key: str, status: str) -> str:
        """Update verification result in documents table."""
        conn = psycopg2.connect(**self.conn_params)
        try:
            with conn.cursor() as cursor:
                cursor.execute(
                    "UPDATE documents SET status = %s WHERE s3_key = %s",
                    (status, s3_key)
                )
                conn.commit()
            return f"Updated document {s3_key} with status: {status}"
        finally:
            conn.close()
