import os
import json
from datetime import datetime
from serpapi import GoogleSearch

def get_flight_data(departure_id, arrival_id, date, api_key):
    """
    Fetches flight data for a given route and date using the SerpAPI Google Flights API.

    Args:
        departure_id (str): The departure airport code (e.g., "FLL").
        arrival_id (str): The arrival airport code (e.g., "PVG").
        date (str): The outbound date in YYYY-MM-DD format.
        api_key (str): The SerpAPI API key.

    Returns:
        dict: A dictionary containing the flight information or an error status.
    """
    print(f"Fetching flight data for {departure_id} to {arrival_id} on {date}...")
    params = {
        "engine": "google_flights",
        "departure_id": departure_id,
        "arrival_id": arrival_id,
        "outbound_date": date,
        "api_key": api_key,
        "currency": "USD",
        "hl": "en"
    }

    try:
        search = GoogleSearch(params)
        data = search.get_dict()

        # Handle API errors returned in the response
        if "error" in data:
            print(f"Error from SerpAPI: {data['error']}")
            return {
                "price": None,
                "route_info": None,
                "last_updated": datetime.now().isoformat(),
                "status": f"api_error: {data['error']}"
            }

        # Check for best flights and extract information
        if "best_flights" in data and data["best_flights"]:
            best_flight = data["best_flights"][0]
            price = best_flight.get("price")
            
            # Construct the full route information string (e.g., FLL-JFK-PVG)
            if best_flight.get("flights"):
                all_flights = best_flight["flights"]
                airport_ids = [flight["departure_airport"]["id"] for flight in all_flights]
                airport_ids.append(all_flights[-1]["arrival_airport"]["id"])
                route_info = "-".join(airport_ids)
                
                print(f"Found best price: ${price} with route: {route_info}")
                return {
                    "price": price,
                    "route_info": route_info,
                    "last_updated": datetime.now().isoformat(),
                    "status": "ok"
                }
        
        # Handle cases where no flights are found
        print("No flights found for this route.")
        return {
            "price": None,
            "route_info": None,
            "last_updated": datetime.now().isoformat(),
            "status": "no_flights_found"
        }

    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return {
            "price": None,
            "route_info": None,
            "last_updated": datetime.now().isoformat(),
            "status": f"request_exception: {str(e)}"
        }

def main():
    """
    Main function to run the flight data fetching process for multiple routes.
    """
    # It's best practice to store your API key in an environment variable
    # You can get one from https://serpapi.com/
    api_key = os.getenv("SERPAPI_API_KEY")

    if not api_key:
        print("Error: SERPAPI_API_KEY environment variable not set.")
        output_data = {
            "FLL-PVG": {"status": "missing_api_key"},
            "MIA-PVG": {"status": "missing_api_key"},
            "last_updated": datetime.now().isoformat()
        }
    else:
        # Based on the HTML, the trip date is November 22nd. We'll use 2025.
        flight_date = "2025-11-22"
        routes = [("FLL", "PVG"), ("MIA", "PVG")]
        
        all_flight_data = {}
        for dep_id, arr_id in routes:
            route_key = f"{dep_id}-{arr_id}"
            flight_info = get_flight_data(dep_id, arr_id, flight_date, api_key)
            all_flight_data[route_key] = flight_info
        
        output_data = all_flight_data

    # Save the collected data to a JSON file
    output_filename = "flights_data.json"
    with open(output_filename, "w") as f:
        json.dump(output_data, f, indent=4)

    print(f"\nFlight data has been saved to {output_filename}")

if __name__ == "__main__":
    main()
