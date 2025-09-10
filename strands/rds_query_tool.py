import os
import psycopg2
from strands_agents import Tool

class RdsQueryTool(Tool):
    def __init__(self):
        self.conn_params = {
            "host": os.environ["DB_HOST"],
            "dbname": os.environ["DB_NAME"],
            "user": os.environ["DB_USER"],
            "password": os.environ["DB_PASSWORD"],
            "port": os.environ.get("DB_PORT", 5432),
        }

    def run(self, s3_key: str) -> dict:
        """Fetch customer data associated with a document S3 key."""
        conn = psycopg2.connect(**self.conn_params)
        try:
            with conn.cursor() as cursor:
                cursor.execute(
                    """
                    SELECT c.first_name, c.last_name, c.street_address, 
                           c.suburb, c.city, c.post_code
                    FROM customers c
                    JOIN documents d ON d.customer_id = c.id
                    WHERE d.s3_key = %s
                    """,
                    (s3_key,)
                )
                row = cursor.fetchone()
                if row:
                    return {
                        "first_name": row[0],
                        "last_name": row[1],
                        "street_address": row[2],
                        "suburb": row[3],
                        "city": row[4],
                        "post_code": row[5],
                    }
                else:
                    return {"error": f"No customer found for key {s3_key}"}
        finally:
            conn.close()
