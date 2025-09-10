from strands import Agent
from strands.models import BedrockModel
from textract_tool import textract_tool
from rds_query_tool import rds_query_tool
from rds_update_tool import rds_update_tool

llm = BedrockModel(model="us.anthropic.claude-3-5-haiku-20241022-v1:0")

agent = Agent(
    llm=llm,
    tools=[textract_tool, rds_query_tool, rds_update_tool]
)

instructions = """
1. Use textract_tool to extract text from the uploaded document.
2. Use rds_query_tool with the S3 key to fetch customer data.
3. Compare the extracted text with the customer data.
4. Respond only with one of: MATCH, NAME_MATCH, ADDRESS_MATCH, NO_MATCH, UNCERTAIN.
5. After determining the result, call rds_update_tool to save it.
"""

def run_agent(bucket, key):
    inputs = {"bucket": bucket, "key": key}
    return agent.run(instructions, inputs=inputs)
