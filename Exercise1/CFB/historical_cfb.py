import requests
import pandas as pd

API_KEY = ""

url = "https://api.collegefootballdata.com/games"

headers = {
    "Authorization": f"Bearer {API_KEY}"
}

# Seasons we want
years = [2021, 2022, 2023, 2024, 2025]

all_games = []

for year in years:

    print(f"Getting {year} data...")

    params = {
        "year": year
    }

    response = requests.get(
        url,
        headers=headers,
        params=params
    )

    if response.status_code == 200:

        games = response.json()

        print(f"  Found {len(games)} total games")

        # Add the games to our full dataset
        all_games.extend(games)

    else:

        print(f"  Error getting {year}")
        print(response.text)


# --------------------------------------------------
# Create DataFrame with all games
# --------------------------------------------------

df = pd.DataFrame(all_games)

print("\nTotal games before filtering:")
print(len(df))


# --------------------------------------------------
# Keep only games where BOTH teams are FBS
# --------------------------------------------------

fbs_games = df[
    (df["homeClassification"] == "fbs") &
    (df["awayClassification"] == "fbs")
].copy()


print("\nTotal FBS vs FBS games:")
print(len(fbs_games))


# --------------------------------------------------
# Show how many games came from each season
# --------------------------------------------------

print("\nFBS games by season:")

print(
    fbs_games["season"]
    .value_counts()
    .sort_index()
)


# --------------------------------------------------
# Save raw data
# --------------------------------------------------

df.to_csv(
    "cfb_2021_2025_raw_games.csv",
    index=False
)


# --------------------------------------------------
# Save clean FBS data
# --------------------------------------------------

fbs_games.to_csv(
    "cfb_2021_2025_fbs_games.csv",
    index=False
)


print("\nFiles created:")
print("cfb_2021_2025_raw_games.csv")
print("cfb_2021_2025_fbs_games.csv")