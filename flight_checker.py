import os
import json
from datetime import datetime
from serpapi import GoogleSearch

def fetch_flight_price(departure_id, arrival_id):
    """Fetches flight prices using SerpApi and returns structured data."""
    api_key = os.environ.get("SERPAPI_API_KEY")
    if not api_key:
        print("Error: SERPAPI_API_KEY environment variable not set.")
        return {
            "price": None,
            "route_info": None,
            "last_updated": datetime.now().isoformat(),
            "status": "missing_api_key"
        }

    params = {
        "engine": "google_flights",
        "departure_id": departure_id,
        "arrival_id": arrival_id,
        "outbound_date": "2025-11-21",  # Updated to a future date
        "return_date": "2025-11-29",    # Updated to a future date
        "currency": "USD",
        "hl": "en",
        "api_key": api_key
    }

    try:
        search = GoogleSearch(params)
        data = search.get_dict()

        if "error" in data:
            print(f"Error from SerpAPI for {departure_id}-{arrival_id}: {data['error']}")
            return {
                "price": None,
                "route_info": None,
                "last_updated": datetime.now().isoformat(),
                "status": f"api_error: {data['error']}"
            }
        
        best_price = None
        route_info = None

        # Check for flights in "best_flights" or "other_flights"
        flights_results = data.get("best_flights", []) or data.get("other_flights", [])

        if flights_results:
            best_flight = flights_results[0]
            best_price = best_flight.get("price")
            if best_flight.get("flights"):
                all_flights = best_flight["flights"]
                # Create the route string from the flight segments
                airport_ids = [flight["departure_airport"]["id"] for flight in all_flights]
                airport_ids.append(all_flights[-1]["arrival_airport"]["id"])
                route_info = '→'.join(airport_ids)

        return {
            "price": best_price,
            "route_info": route_info,
            "last_updated": datetime.now().isoformat(),
            "status": "ok" if best_price else "no_price_found"
        }

    except Exception as e:
        print(f"An unexpected error occurred for {departure_id}-{arrival_id}: {e}")
        return {
            "price": None,
            "route_info": None,
            "last_updated": datetime.now().isoformat(),
            "status": f"request_exception: {str(e)}"
        }

def main():
    """Main function to fetch prices for multiple routes and save to a file."""
    routes_to_check = [
        {"departure": "FLL", "arrival": "PVG"},
        {"departure": "MIA", "arrival": "PVG"}
    ]
    
    all_flights_data = {}

    for route in routes_to_check:
        print(f"Fetching price for {route['departure']}-{route['arrival']}...")
        flight_data = fetch_flight_price(route['departure'], route['arrival'])
        all_flights_data[f"{route['departure']}-{route['arrival']}"] = flight_data

    # Write the combined data to a single JSON file
    with open("flights_data.json", "w") as f:
        json.dump(all_flights_data, f, indent=4)

    print("Flight data has been updated in flights_data.json")

if __name__ == "__main__":
    main()

