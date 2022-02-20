import requests
endpoint = "https://api.assemblyai.com/v2/transcript"
json = {
    "audio_url": "https://drive.google.com/file/d/11LrLrp5UjaCB-TxFo5RfWfWkC7M-nQS4/view?usp=sharing",
    "speaker_labels": True
}
headers = {
    "authorization": "6025ce2db7ac493d9be1a89220f70d17",
    "content-type": "application/json"
}
response = requests.post(endpoint, json=json, headers=headers)
print(response.json())