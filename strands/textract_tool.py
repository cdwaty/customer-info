import boto3
from strands_agents import Tool

class TextractTool(Tool):
    def __init__(self):
        self.textract = boto3.client("textract")

    def run(self, bucket: str, key: str) -> str:
        """Extract text lines from a document in S3 using Textract."""
        response = self.textract.detect_document_text(
            Document={"S3Object": {"Bucket": bucket, "Name": key}}
        )

        lines = [b["Text"] for b in response["Blocks"] if b["BlockType"] == "LINE"]
        return "\n".join(lines)
