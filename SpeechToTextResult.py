import requests
endpoint = "https://api.assemblyai.com/v2/transcript/okpv4zx8fs-4739-4e75-853e-d88110748bb1"
headers = {
    "authorization": "6025ce2db7ac493d9be1a89220f70d17",
}
response = requests.get(endpoint, headers=headers)
print(response.json())