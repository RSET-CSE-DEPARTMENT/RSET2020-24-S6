import openai

openai.api_key = "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"
prompt = "List 10 animals"

response = openai.ChatCompletion.create(model="gpt-3.5-turbo",  messages=[
                {"role": "system", "content": prompt }
            ])

print(response)
