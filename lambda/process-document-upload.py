import boto3
import json
import psycopg2
import os

s3 = boto3.client('s3')
textract = boto3.client('textract')
bedrock = boto3.client('bedrock-runtime')

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

    # 5. Verify customer data matches extracted text using Bedrock
    if customer_data:
        verification_result = verify_customer_match(customer_data, extracted_lines)
        print("Verification result:", verification_result)

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

def verify_customer_match(customer_data, extracted_lines):
    print("=== BEDROCK CALL DEBUG ===")
    print(f"Customer data for LLM: {customer_data}")
    print(f"Extracted lines for LLM: {extracted_lines}")
    
    prompt = f"""Compare the customer information with the extracted text from a proof of address document.

Customer Data:
Name: {customer_data.get('first_name', '')} {customer_data.get('last_name', '')}
Address: {customer_data.get('street_address', '')} {customer_data.get('suburb', '')} {customer_data.get('city', '')} {customer_data.get('post_code', '')}

Extracted Text from Document:
{' '.join(extracted_lines)}

Does the customer name and address appear in the extracted text?
Note that the first name might be abbreviated to an initial, and the address might have minor variations (like "St" vs "Street").
Respond only with one of the following results:
1. 'MATCH' if both name and address are found
2. 'NAME_MATCH' if only the name is found
3. 'ADDRESS_MATCH' if only the address is found
4. 'NO_MATCH' if neither name nor address is found
5. 'UNCERTAIN' if the match is uncertain

Respond with only one of the above options, no additional text, with the exception of 'UNCERTAIN' where you may add a brief explanation."""


    print(f"Prompt being sent to Bedrock: {prompt}")
    
    try:
        print("Calling Bedrock invoke_model...")
        response = bedrock.invoke_model(
            modelId='us.anthropic.claude-3-5-haiku-20241022-v1:0',
            body=json.dumps({
                'anthropic_version': 'bedrock-2023-05-31',
                'max_tokens': 100,
                'messages': [{'role': 'user', 'content': prompt}]
            }) 
        )
        print("Bedrock call successful!")
        print(f"Response status: {response.get('ResponseMetadata', {}).get('HTTPStatusCode')}")
        
        result = json.loads(response['body'].read())
        print(f"Bedrock response: {result}")
        
        final_result = result['content'][0]['text'].strip()
        print(f"Final verification result: {final_result}")
        return final_result
        
    except Exception as e:
        print(f"ERROR calling Bedrock: {str(e)}")
        print(f"Error type: {type(e)}")
        raise e

