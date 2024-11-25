# FUT Champions Ultimate Team
Build Custom Tactics & Formations . For a French translation [FR](./README.md).

## Additional Resources


## Project Context

The application will allow users to build their FUT (Ultimate Team) by adding, positioning, and modifying players while adhering to tactical formations like 4-4-2 or 4-3-3. The focus will be on an interactive experience with dynamic forms, data management via localStorage, and an engaging interface.

## Key Features

### UI Integration and Dynamic Player Addition

Form to add players with fields for name, position, rating, stats, and other relevant details.
Application of appropriate positions for each player according to the chosen formation (e.g., 4-3-3 or 4-4-2).

### Player Positioning According to Selected Tactical Formation

Adherence to positions based on the chosen tactical formation.
Formation 4-3-3: Includes 1 GK, 2 CB (Center Backs), 1 LB (Left Back), 1 RB (Right Back), 3 CM (Central Midfielders), 1 LW (Left Winger), 1 RW (Right Winger), and 1 ST (Striker).
Formation 4-4-2: Includes 1 GK, 2 CB, 1 LB, 1 RB, 2 CM, 1 RM (Right Midfielder), 1 LM (Left Midfielder), and 2 ST.
Automatic adaptation of player positions based on the chosen formation.

### Player Card Management

Add, modify, and delete player cards via a UI interface.
Strict limitation to 11 players in the main formation; remaining players are reserved for substitutions.

### Dynamic Forms for Player Management

Allow adding or removing players while adhering to tactical formation rules (maximum 11 players for the main formation, others being reserves).

### Team Chemistry Calculation (Bonus)

Automatic calculation of the chemistry score based on defined rules such as links between players from the same club, league, or nationality.
Display of the total chemistry score of the formation.

**Example Calculation:**

A correctly positioned player receives 10 points.
If he has 1 strong club link, he gains 3 additional points.
If he shares the same league with two adjacent players, he gains 4 points (2x2).
If he shares the same nationality with a player, he gains 1 point.

**Player_Chemistry = 10 (Correct_Position) + 3 (Club_Link) + 4 (League_Link) + 1 (Nationality_Link) = 18 points**

For a team of 11 players, sum the chemistry of each player to get the total team chemistry score.
The total score is normalized on a scale of 0 to 100.

### Form Field Validation

Validation of all input fields for players, such as name, position, and rating, to ensure data consistency.
Application of native validations to ensure the accuracy of entered information.

### LocalStorage for Formations and Players (Bonus)

Save formation and player data for future use without losing chosen configurations.
Automatic loading of saved data upon application launch.

### Responsive Design

The application interface adapts to different screen sizes (laptop, tablet, mobile).
Dynamic adjustment of player positioning and display to ensure an optimal user experience on any device.

## Required Technologies

- HTML
- Native CSS
- Vanilla JS (Native DOM)

## User Stories

### Creating a Team of 11 Players

- As a user, I want to add players to my formation via a dynamic form, with a maximum of 11 selected players to ensure a compliant team structure.

### Acceptance Criteria

- I can add a player using a dynamic form with necessary fields (name, position, stats).
- I can modify or delete added players.
- The form validates the entered data.

### Adapting the Chosen Formation (e.g., 4-3-3 or 4-4-2)

- As a user, I want to change my team's formation and see player positions adjusted accordingly.

### Acceptance Criteria

- I can choose between predefined formations (e.g., 4-4-2, 4-3-3).
- Player positioning is automatically updated to fit the chosen formation.
- Only valid positions for the formation are available for each player.

### Chemistry Score Calculation

- As a user, I want to see my team's "chemistry" score calculated and displayed based on player relationships to optimize my team composition.

### Acceptance Criteria

- The chemistry score is dynamically updated based on selected players and their compatibility.
- Strong/weak links are visually highlighted.

### Data Saving and Retrieval

- As a user, I want my formation and team data to be automatically saved so I can retrieve it later.

### Acceptance Criteria

- Data is stored locally.
- Data retrieval occurs when the application loads.

### Dynamic Player Form

- As a user, I want to dynamically add new players within the interface.

### Acceptance Criteria

- A dynamic form allows creating new players.
- The interface adjusts positions and the number of players.

## Performance Criteria

- Intuitive and responsive user interface.
- Effective field validations to ensure data integrity.
- Dynamic formation changes without page refresh.
- Accurate and fast team chemistry calculation.
- Reliable save function using localStorage.
