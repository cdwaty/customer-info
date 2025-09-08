import boto3
import json
import psycopg2
import os

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

    # 4. Connect to PostgreSQL RDS and get customer data
    customer_data = get_customer_data(key)
    print("Customer data:", customer_data)

    return {
        'statusCode': 200,
        'body': json.dumps('Processing complete!')
    }

def get_customer_data(s3_key):
    conn = psycopg2.connect(
        host=os.environ['DB_HOST'],
        database=os.environ['DB_NAME'],
        user=os.environ['DB_USER'],
        password=os.environ['DB_PASSWORD'],
        port=os.environ.get('DB_PORT', 5432)
    )
    
    try:
        with conn.cursor() as cursor:
            cursor.execute(
                "SELECT first_name, last_name, street_address, suburb, city, post_code FROM customers c join documents d on d.customer_id = c.id where s3_key = %s",
                (s3_key,)
            )
            result = cursor.fetchone()
            print(f"Query result: {result}")
            print(f"Result length: {len(result) if result else 'None'}")
            
            if result:
                return {
                    'first_name': result[0] if len(result) > 0 else None,
                    'last_name': result[1] if len(result) > 1 else None,
                    'street_address': result[2] if len(result) > 2 else None,
                    'suburb': result[3] if len(result) > 3 else None,
                    'city': result[4] if len(result) > 4 else None,
                    'post_code': result[5] if len(result) > 5 else None
                }
    finally:
        conn.close()
    
    print("No customer data found or insufficient columns")
    return None

