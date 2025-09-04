import os
import json
import requests

# This script fetches a new flight price and writes it to a JSON file.
# It is designed to be run as part of a GitHub Action.

# Get the SerpAPI key from the GitHub Actions environment variables
# The key is securely stored as a GitHub Secret.
serpapi_key = os.environ.get('SERPAPI_API_KEY')
if not serpapi_key:
    print("Error: SERPAPI_API_KEY environment variable not set.")
    exit(1)

# Flight search parameters
# You can change these to match your flight details
params = {
  "api_key": serpapi_key,
  "engine": "google_flights",
  "hl": "en",
  "departure_id": "MIA",
  "arrival_id": "PVG",
  "outbound_date": "2025-11-22"
}

try:
    # Make the request to the SerpAPI
    response = requests.get("https://serpapi.com/search.json", params=params)
    response.raise_for_status()  # Raise an exception for bad status codes
    data = response.json()

    # Extract the lowest price from the best_flights results
    lowest_price = data.get("best_flights")[0].get("price")
    
    # Create a simple JSON object to store the price
    price_data = {
        "price": lowest_price
    }
    
    # Write the data to a JSON file
    with open("data.json", "w") as f:
        json.dump(price_data, f, indent=2)

    print(f"Successfully fetched and updated price to: ${lowest_price}")

except Exception as e:
    print(f"An error occurred: {e}")
    # Write an error message to the file to prevent the dashboard from breaking
    with open("data.json", "w") as f:
        json.dump({"error": "Failed to fetch price"}, f, indent=2)
