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

text = response["choices"][0]["text"]
f = open('result.txt', 'w')

f.write(text)
  
print(response)