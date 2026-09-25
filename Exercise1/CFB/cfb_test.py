import requests
import pandas as pd

API_KEY = ""

url = "https://api.collegefootballdata.com/games"

headers = {
    "Authorization": f"Bearer {API_KEY}"
}

params = {
    "year": 2023,
}

response = requests.get(url, headers=headers, params=params)

print("Status code:", response.status_code)

if response.status_code == 200:

    games = response.json()

    # Turn API data into a Pandas DataFrame
    df = pd.DataFrame(games)

    print(f"Found {len(df)} games\n")

    # Show the data
    print(df)

    # Show the column names
    print("\nColumns:")
    print(df.columns.tolist())

    # Save the data as a CSV file
    df.to_csv("cfb_2023_games.csv", index=False)

    print("\nCSV file created!")

else:
    print("Something went wrong:")
    print(response.text)
