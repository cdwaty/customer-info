import boto3
from strands.tools import tool

@tool
def textract_tool(bucket: str, key: str) -> str:
    """Extract text lines from a document in S3 using Textract."""
    textract = boto3.client("textract")
    response = textract.detect_document_text(
        Document={"S3Object": {"Bucket": bucket, "Name": key}}
    )
    
    lines = [b["Text"] for b in response["Blocks"] if b["BlockType"] == "LINE"]
    return "\n".join(lines)
