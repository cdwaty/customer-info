import json
from agent_app import run_agent

def lambda_handler(event, context):
    # Get S3 bucket and key from event
    bucket = event["Records"][0]["s3"]["bucket"]["name"]
    key = event["Records"][0]["s3"]["object"]["key"]

    print(f"Triggered by file: {key} in bucket: {bucket}")

    # Run Strands Agent
    result = run_agent(bucket, key)

    return {
        "statusCode": 200,
        "body": json.dumps({"message": "Processing complete", "result": str(result)})
    }
