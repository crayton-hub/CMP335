import pandas as pd

# Read the clean FBS game data
df = pd.read_csv("cfb_2021_2025_fbs_games.csv")

team_stats = []

# Go through each season separately
for season in sorted(df["season"].unique()):

    season_games = df[df["season"] == season]

    # Get every team that played that season
    teams = set(season_games["homeTeam"]) | set(season_games["awayTeam"])

    for team in teams:

        # Home games
        home_games = season_games[
            season_games["homeTeam"] == team
        ]

        # Away games
        away_games = season_games[
            season_games["awayTeam"] == team
        ]

        # Points scored
        points_scored = (
            home_games["homePoints"].sum()
            + away_games["awayPoints"].sum()
        )

        # Points allowed
        points_allowed = (
            home_games["awayPoints"].sum()
            + away_games["homePoints"].sum()
        )

        # Wins
        home_wins = (
            home_games["homePoints"] > home_games["awayPoints"]
        ).sum()

        away_wins = (
            away_games["awayPoints"] > away_games["homePoints"]
        ).sum()

        wins = home_wins + away_wins

        # Losses
        home_losses = (
            home_games["homePoints"] < home_games["awayPoints"]
        ).sum()

        away_losses = (
            away_games["awayPoints"] < away_games["homePoints"]
        ).sum()

        losses = home_losses + away_losses

        # Total games
        games = wins + losses

        # Statistics
        win_pct = wins / games if games > 0 else 0
        ppg = points_scored / games if games > 0 else 0
        papg = points_allowed / games if games > 0 else 0
        point_diff = ppg - papg

        # Get conference
        if len(home_games) > 0:
            conference = home_games.iloc[0]["homeConference"]
        elif len(away_games) > 0:
            conference = away_games.iloc[0]["awayConference"]
        else:
            conference = None

        team_stats.append({
            "Season": season,
            "Team": team,
            "Conference": conference,
            "Games": games,
            "Wins": wins,
            "Losses": losses,
            "WinPct": win_pct,
            "PPG": ppg,
            "PAPG": papg,
            "PointDiff": point_diff
        })


# Create DataFrame
team_df = pd.DataFrame(team_stats)

# Sort by season and winning percentage
team_df = team_df.sort_values(
    ["Season", "WinPct"],
    ascending=[True, False]
)

# Round statistics
team_df["WinPct"] = team_df["WinPct"].round(3)
team_df["PPG"] = team_df["PPG"].round(2)
team_df["PAPG"] = team_df["PAPG"].round(2)
team_df["PointDiff"] = team_df["PointDiff"].round(2)

# Display results
print("\nTeam statistics:\n")
print(team_df.to_string(index=False))

# Save the dataset
team_df.to_csv(
    "cfb_2021_2025_team_stats.csv",
    index=False
)

print("\nTeam statistics saved!")