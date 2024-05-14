import { useState, useEffect } from "react";
import { useLoaderData, useRevalidator } from "@remix-run/react";
import { fetchWeatherApi } from 'openmeteo';
import Instructions from "~/components/instructions";
import LoadingSpinner from "~/components/loadingSpinner";

import { getTwoRandomCities } from "~/data/cityLatLongData";

export const loader = async () => {

  let randomCities = [
                      {"city" : "Error", "lat" : 0, "long" : 0},
                      {"city" : "Error", "lat" : 0, "long" : 0}
                    ];
  let city1Temp = 0;
  let city2Temp = 0;
  const url = "https://api.open-meteo.com/v1/forecast";

  while (Math.abs(city1Temp - city2Temp) <= 4) {
    randomCities = getTwoRandomCities();
    let params = {
      "latitude": [randomCities[0].lat, randomCities[1].lat],
      "longitude": [randomCities[0].long, randomCities[1].long],
      "current": "temperature_2m"
    };

    let responses = await fetchWeatherApi(url, params);
    let firstCityResponse = responses[0].current()!;
    let secondCityResponse = responses[1].current()!;

    city1Temp = Math.round(firstCityResponse.variables(0)!.value());
    city2Temp = Math.round(secondCityResponse.variables(0)!.value());
  }

  const gameData = {
      firstCity: randomCities[0].city,
      firstCityTemp: city1Temp,
      secondCity: randomCities[1].city,
      secondCityTemp: city2Temp
   };  

  return gameData;
};

type GameData = {
  firstCity: string;
  firstCityTemp: number;
  secondCity: string;
  secondCityTemp: number;
}

const firstData: GameData = {
  firstCity: "NEW GAME",
  firstCityTemp: 0,
  secondCity: "NEW GAME",
  secondCityTemp: 0
};

export default function Index() {
  const loadedGameData = useLoaderData<typeof loader>();
  const [gameData, setGameData] = useState<GameData>(firstData);

  if (gameData.firstCity === "NEW GAME") {
    setGameData(loadedGameData);
  }
  
  const revalidator = useRevalidator();

  const [cityLoading, setCityLoading] = useState(false);
  const [citySelected, setCitySelected] = useState(false);
  const [score, setScore] = useState(0);
  const [correctCity, setCorrectCity] = useState(1); // For css styling of .city-card
  const [gameOver, setGameOver] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  // My hacky way of doing this beause I don't know how to use localStorage in React
  useEffect(() => {
    if (!localStorage.getItem('highScore')) {
      localStorage.setItem('highScore', '0');
    }
    if (finalScore > parseInt(localStorage.getItem('highScore')!)) {
      localStorage.setItem('highScore', finalScore.toString());
    }
    document.getElementById('highScore')!.innerText = `High Score: ${localStorage.getItem('highScore')}`;
  }, [finalScore]);

  const handleCityClick = (event: React.MouseEvent<HTMLElement>): void => {
    setCitySelected(true);
    let playerChoice = (event.currentTarget as EventTarget & HTMLElement).id;
    let correctChoice = gameData.firstCityTemp < gameData.secondCityTemp ? "city1" : "city2";
    
    correctChoice === "city1" ? setCorrectCity(1) : setCorrectCity(2);

    if (playerChoice === correctChoice) {
      setScore(score + 1);
      revalidator.revalidate();
      setTimeout(() => {
        setCityLoading(true);
        setCitySelected(false);
        setGameData(loadedGameData);
      }, 1000);
    } else {
      setTimeout(() => {
        setFinalScore(score);
        setGameOver(true);
        setScore(0);
      }, 500);
    }
  }

  const handlePlayAgain = () => {
    setGameOver(false);
    setCityLoading(true);
    setCitySelected(false);
    setGameData(loadedGameData);
    revalidator.revalidate();
  }

  useEffect(() => {
    if (revalidator.state === "idle") {
      setCityLoading(false);
    }
  }, [gameData]);

  return (
    <div className="main-container">
      <h1> WHICH CITY IS COLDER?</h1>
      <div className="game-container">
        <div className={`city-card ${ correctCity === 1 ? 'cold' : 'hot' }`}>
          <span>{gameData.firstCity}</span>
          <span>{gameData.firstCityTemp}°C</span>
          <div id="city1" className={`question ${citySelected ? 'citySelected' : ''}`} onClick={handleCityClick}>
            <span>{gameData.firstCity}</span>
          </div>
          <div className={`loading-spinner ${cityLoading ? '' : 'loaded'}`} hidden={revalidator.state === "idle"}>
            <LoadingSpinner />
          </div>
        </div>
        <div className={`city-card ${ correctCity === 2 ? 'cold' : 'hot' }`}>
          <span>{gameData.secondCity}</span>
          <span>{gameData.secondCityTemp}°C</span>
          <div id="city2" className={`question ${citySelected ? 'citySelected' : ''}`}  onClick={handleCityClick}>
            <span>{gameData.secondCity}</span>          
          </div>
          <div className={`loading-spinner ${cityLoading ? '' : 'loaded'}`}>
            <LoadingSpinner />
          </div>
        </div>
      </div>
      <div className="streak-info">
        SCORE: { score }
      </div>
      <div className={`game-over-container ${gameOver ? '' : 'hidden'}`}>
        <div className="game-over-modal">
          <h1>Game Over!</h1>
          <h2>Score: { finalScore }</h2>
          <h2 id="highScore">High Score: 0</h2>
          <button onClick={handlePlayAgain}>Play Again</button>
        </div>
      </div>
      <Instructions />
    </div>
  );
}
