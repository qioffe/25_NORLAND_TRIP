import os
import json
import requests
from datetime import datetime

# Get the API key from the environment variables
serpapi_api_key = os.getenv('SERPAPI_API_KEY')

if not serpapi_api_key:
    print("SERPAPI_API_KEY environment variable is not set.")
    exit()

# Define the search parameters for the flight route
params = {
    "api_key": serpapi_api_key,
    "engine": "google_flights",
    "q": "MIA to PVG flights", # Added to provide more context to the API
    "hl": "en",
    "gl": "us",
    "currency": "USD",
    "from_code": "MIA",
    "to_code": "PVG",
    "outbound_date": "2025-11-22"
}

try:
    # Make the request to SerpAPI
    response = requests.get("https://serpapi.com/search", params=params)
    data = response.json()
    
    # Check for errors in the API response
    if "error" in data:
        print(f"Error from SerpAPI: {data['error']}")
        exit()

    # Find the best flight price
    best_price = None
    if "best_flights" in data and data["best_flights"]:
        best_price = data["best_flights"][0].get("price")
    elif "other_flights" in data and data["other_flights"]:
        best_price = data["other_flights"][0].get("price")
    
    # Get the current time for the update timestamp
    timestamp = datetime.now().isoformat()

    # Prepare the data to be saved to data.json
    output_data = {
        "price": best_price,
        "last_updated": timestamp
    }
    
    # Save the data to a JSON file
    with open("data.json", "w") as f:
        json.dump(output_data, f, indent=4)
        
    print(f"Successfully updated data.json with price: ${best_price}")

except requests.exceptions.RequestException as e:
    print(f"An error occurred while making the API request: {e}")
    exit()

except (KeyError, IndexError) as e:
    print(f"Could not parse the API response. Key missing: {e}")
    exit()
