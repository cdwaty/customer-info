from strands import Agent
from strands.models import BedrockModel
from textract_tool import TextractTool
from rds_query_tool import RdsQueryTool
from rds_update_tool import RdsUpdateTool

llm = BedrockModel(model="us.anthropic.claude-3-5-haiku-20241022-v1:0")

agent = Agent(
    llm=llm,
    tools=[TextractTool(), RdsQueryTool(), RdsUpdateTool()]
)

instructions = """
1. Use TextractTool to extract text from the uploaded document.
2. Use RdsQueryTool with the S3 key to fetch customer data.
3. Compare the extracted text with the customer data.
4. Respond only with one of: MATCH, NAME_MATCH, ADDRESS_MATCH, NO_MATCH, UNCERTAIN.
5. After determining the result, call RdsUpdateTool to save it.
"""

def run_agent(bucket, key):
    inputs = {"bucket": bucket, "key": key}
    return agent.run(instructions, inputs=inputs)
