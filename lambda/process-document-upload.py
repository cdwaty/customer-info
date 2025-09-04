import boto3
import json

s3 = boto3.client('s3')
textract = boto3.client('textract')

def lambda_handler(event, context):
    # 1. Get S3 bucket and object key (filename) from event
    bucket = event['Records'][0]['s3']['bucket']['name']
    key = event['Records'][0]['s3']['object']['key']

    print(f"Processing file: {key} from bucket: {bucket}")

    # 2. Call Textract to extract text
    response = textract.detect_document_text(
        Document={
            'S3Object': {
                'Bucket': bucket,
                'Name': key
            }
        }
    )

    # 3. Collect all detected text lines
    extracted_lines = []
    for item in response['Blocks']:
        if item['BlockType'] == 'LINE':
            extracted_lines.append(item['Text'])

    print("Extracted text:", extracted_lines)

    return {
        'statusCode': 200,
        'body': json.dumps('Processing complete!')
    }
