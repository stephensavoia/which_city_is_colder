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

export default function Index() {
  const gameData = useLoaderData<typeof loader>();
  const revalidator = useRevalidator();

  const [cityLoading, setCityLoading] = useState(false);
  const [citySelected, setCitySelected] = useState(false);
  const [score, setScore] = useState(0);
  const [correctCity, setCorrectCity] = useState(1); // For css styling of .city-card

  const handleCityClick = (event: React.MouseEvent<HTMLElement>): void => {
    setCitySelected(true);
    let playerChoice = (event.currentTarget as EventTarget & HTMLElement).id;
    let correctChoice = gameData.firstCityTemp < gameData.secondCityTemp ? "city1" : "city2";

    
    correctChoice === "city1" ? setCorrectCity(1) : setCorrectCity(2);

    if (playerChoice === correctChoice) {
      setScore(score + 1);
    } else {
      setTimeout( () => alert(`Game Over! Your score: ${score}`), 100);
      setScore(0);
    }

    setTimeout(() => {
      setCityLoading(true);
      setCitySelected(false);
      revalidator.revalidate();
    }, 2000);
  }

  useEffect(() => {
    if (revalidator.state === "idle") {
      setCityLoading(false);
    }
  }, [revalidator]);

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
      <Instructions />
    </div>
  );
}
