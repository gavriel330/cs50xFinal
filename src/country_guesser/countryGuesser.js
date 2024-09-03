import React, { useEffect, useState } from "react";
import { Box, Button, Heading, Text } from "grommet";
import { list_storage } from "./../services/list_storage";
import { calcCrow, calcDirection } from "./country_utils";
import "./emoji.css";
import { CountryGuessRow } from "./modules/CountryGuessRow";
import { DynamicSvg } from "./modules/DynamicSvg";
import GuessScoreBoard from "./modules/GuessScoreBoard";
import { GuessTable } from "./modules/GuessTable";
import { InputSelect } from "./modules/InputSelect";
import getCountries from "./useCountries";

class Guess {
  constructor(guessedCountry, actualCountry) {
    this.country = guessedCountry;
    this.distanceKm = calcCrow(guessedCountry, actualCountry);
    this.direction = calcDirection(guessedCountry, actualCountry);
  }
}

const gameType = "CountriesWorld";
const maxGuesses = 6;

export const CountryGuesser = () => {
  const [countries, setCountries] = useState([]);
  const [countriesDict, setCountriesDict] = useState({});
  const [round, setRound] = useState(0);
  const [roundOver, setRoundOver] = useState(false);
  const [chosenCountry, setChosenCountry] = useState();
  const [guessedCountry, setGuessedCountry] = useState("");
  const [currentGuesses, setCurrentGuesses] = useState([]);
  const [scores, setScores] = useState(
    list_storage.getList(gameType, (o) => parseInt(o)) ||
    new Array(maxGuesses + 1).fill(0)
  );
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const [newCountries, newCountriesDict] = getCountries(false);
    setCountries(newCountries);
    setCountriesDict(newCountriesDict);
    const newChosenCountry = newCountries[Math.floor(Math.random() * newCountries.length)];
    setChosenCountry(newChosenCountry);
  }, [round]);

  const nextRound = () => {
    setRound((r) => r + 1);
    setRoundOver(false);
    setCurrentGuesses([]);
    setGuessedCountry("");
  };

  const won = () => {
    setRoundOver(true);
    setStreak((s) => s + 1);
    const index = currentGuesses.length;
    const newScores = [...scores];
    newScores[index] = newScores[index] + 1;
    setScores(newScores);
    list_storage.setList(gameType, newScores);
  };

  const lost = () => {
    setRoundOver(true);
    setStreak(0);
    const newScores = [...scores];
    newScores[0] = newScores[0] + 1;
    setScores(newScores);
    list_storage.setList(gameType, newScores);
  };

  const attemptGuess = () => {
    if (!(guessedCountry in countriesDict)) {
      return;
    }
    const chosen = countriesDict[guessedCountry];
    const guess = new Guess(chosen, chosenCountry);
    setCurrentGuesses((prevGuesses) => [...prevGuesses, guess]);
    setGuessedCountry("");
    if (chosen.name === chosenCountry.name) {
      won();
      return;
    }
    if (currentGuesses.length >= maxGuesses - 1) {
      lost();
    }
  };

  if (chosenCountry === undefined) {
    return (
      <Box fill align="center" justify="center">
        <Text>Loading...</Text>
      </Box>
    );
  }

  return (
    <Box
      fill
      align="center"
      justify="center"
      animation={{ type: "fadeIn" }}
    >
      <Box
        width="large"
        align="center"
        justify="center"
        pad="medium"
        gap="medium"
        background={{ color: "light-2" }}
        round="medium"
        elevation="small"
      >
        <Box
          align="center"
          background={{ color: "light-2" }}
          pad="medium"
          round="medium"
        >
          <DynamicSvg
            svgName={chosenCountry.code_2}
            style={{ height: "200px", width: "200px" }}
            failed={() => nextRound()}
          />
        </Box>

        {roundOver ? (
          <Box align="center" gap="small">
            <Box direction="row" align="center">
              <Heading level={4} margin="none">
                The country is {chosenCountry.name}
              </Heading>
              <Text size="xxlarge" style={{ fontFamily: "NotoColorEmojiLimited", marginLeft: "5px", marginLeft: "5px"}}>
                {chosenCountry.flag}
              </Text>
            </Box>
            <Box>
              <Text><b>Population:</b> {chosenCountry.population.toLocaleString()}</Text>
              <Text><b>Official Name:</b> {chosenCountry.official_name}</Text>
              <Text><b>Continent:</b> {chosenCountry.continents.join(", ")}</Text>
              <Text><b>Area:</b> {chosenCountry.area.toLocaleString()} km<sup>2</sup></Text>
              <Text><b>Capital:</b> {chosenCountry.capitals.join(", ")}</Text>
              <Text><b>Languages:</b> {chosenCountry.languages.join(", ")}</Text>
            </Box>
          </Box>
        ) : (
          <Box align="center" gap="medium">
            <InputSelect
              options={countries}
              key={round}
              value={guessedCountry}
              optionNameOperand={(o) => o.name}
              onChange={(option) => setGuessedCountry(option.value)}
            />
            <Button
              label="Submit"
              onClick={attemptGuess}
              primary
            />
          </Box>
        )}

        {roundOver && (
          <Button onClick={() => nextRound()} label="Next!" primary />
        )}

        <GuessTable max={maxGuesses}>
          {currentGuesses.map((guess, i) => (
            <CountryGuessRow
              country={guess.country}
              distance={guess.distanceKm}
              direction={guess.direction}
              key={i}
            />
          ))}
        </GuessTable>
        <GuessScoreBoard scores={scores} streak={streak} type={gameType} />
      </Box>
    </Box>
  );
};