# Guess the Country by Geographic Shadow
Video Demo: <URL HERE>
## Description:
This project is an interactive web-based game that challenges users to guess countries by their geographic shadow. The user is presented with the shadow (silhouette) of a country and must guess which country it represents. After each guess, the app gives feedback on how far the guessed country is from the correct answer and the direction (north, south, east, or west) relative to the correct country. This provides a fun way to improve one’s geographical knowledge while enjoying a puzzle-like game.

The inspiration for the project came from the desire to blend education and gaming. The concept of guessing countries based solely on their shadows can be both entertaining and educational, encouraging users to think critically about global geography. Additionally, the directional hints after each guess offer an engaging element that adds depth to the game.

## Project Structure:
**public/**: This directory contains all the static assets required for the game, including country shadow images, stylesheets (CSS), and other resources that support the front-end experience. These assets are critical to ensuring smooth interaction between the user and the graphical elements of the game.

**src/**: The source code for the project lives here. It contains React components and JavaScript logic that power the user interface and game functionality. The core of the game, including how the country shadows are displayed, how user input is handled, and how feedback is calculated, is all done within this directory. Each part of the game, from rendering the shadow to calculating the distance and direction of guesses, is compartmentalized within React components to ensure modularity and ease of maintenance.

**get_countries.py**: This Python script plays a vital role in the project by retrieving and processing the geographic data for the countries used in the game. This data includes the coordinates of each country, which are critical for calculating the distance and direction between the user’s guess and the correct country. The script acts as a backend utility to ensure that the game functions smoothly by delivering the correct data to the front end.

**package.json**: This file is used to manage project dependencies and configuration. It ensures that all the necessary libraries (e.g., React) are installed and properly configured. It also manages build scripts, making it easy to deploy the project or run it locally during development. The file is crucial for setting up the environment and ensuring consistency across different machines.

## Technology Stack:
The project is built using React, a popular JavaScript library for building user interfaces. React was chosen for this project due to its flexibility, performance, and strong community support. Below are some key advantages of using React in this project:

Component-based architecture: React’s component-based design allows for reusable pieces of code, making development faster and easier to maintain. For example, the game’s shadow display and feedback mechanisms are each encapsulated in their own components, which makes them easy to update or extend in the future.

Virtual DOM: React uses a virtual representation of the DOM, which makes updates fast and efficient. This is especially useful for this project, where user input (guesses) and feedback (distance and direction) need to be updated frequently without lag or performance issues.

Strong community support: React has a large and active developer community, which means there are plenty of libraries, tools, and resources available. This made it easier to find solutions to problems and speed up development, particularly under the time constraints.

## Design Choices:
One of the key design decisions in this project was to ensure scalability. The architecture of the game is designed in a way that makes it easy to add new countries or modify the existing game rules. For instance, the game can easily scale by adding new geographical regions or implementing different game modes (e.g., continent-specific challenges) without requiring a major overhaul of the code.

Another design consideration was maintainability. By organizing the project into modular React components, each part of the application can be maintained and updated independently. This means that updates or fixes to one part of the game won’t affect others, making future maintenance easier.

## Challenges and Considerations:
Developing this project during the ongoing war in Israel posed a significant challenge. The time available for development was limited due to disruptions and the need to prioritize safety. Working remotely from different locations also made it harder to concentrate on the project.

To overcome these challenges, I worked whenever possible, even in unconventional places. Additionally, I received assistance from a friend who helped me manage some of the development tasks. This collaboration allowed us to complete the project despite the difficult circumstances.

## Conclusion:
This project combines educational gaming with real-world geographic knowledge. Using React, I was able to create an interactive and responsive game that challenges users in a fun, engaging way. Despite the challenges posed by the external environment, the project was successfully completed. Moving forward, I see opportunities to enhance the game further, such as by adding more countries, implementing leaderboards, or integrating APIs for real-time geographic data.

I hope that this project provides an enjoyable experience while also promoting a greater understanding of world geography.
