'''
import os
import openai

openai.api_key = "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"

    response = openai.Completion.create(
  engine="text-davinci-001",
  prompt="Generate a grammatically incorrect paragraph",
  temperature=1,
  max_tokens=1941,
  top_p=1,
  frequency_penalty=0,
  presence_penalty=0
)

#print(response)
'''

import os
import openai
openai.api_key = "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"

print(openai.api_key)

# return(response)
