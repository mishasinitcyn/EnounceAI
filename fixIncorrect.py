import os
import openai

openai.api_key = ("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")

response = openai.Completion.create(
  engine="text-davinci-001",
  prompt="Correct this to standard English:\n\n I going to the store to get some eggs. I need some eggs for my breakfast. I am going to the store to get some eggs.",
  temperature=0,
  max_tokens=1024,
  top_p=1,
  frequency_penalty=0,
  presence_penalty=0
)

print(response)