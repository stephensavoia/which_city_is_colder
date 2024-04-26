import { useState } from "react";
import { useLoaderData } from "@remix-run/react";
import { fetchWeatherApi } from 'openmeteo';
import Instructions from "~/components/instructions";

import { getTwoRandomCities } from "~/data/cityLatLongData";

export const loader = async () => {

  const randomCities = getTwoRandomCities();

  const url = "https://api.open-meteo.com/v1/forecast";
  const params = {
    "latitude": [randomCities[0].lat, randomCities[1].lat],
    "longitude": [randomCities[0].long, randomCities[1].long],
    "current": "temperature_2m"
  };

  const responses = await fetchWeatherApi(url, params);
  const firstCityResponse = responses[0].current()!;
  const secondCityResponse = responses[1].current()!;

  const gameData = {
      firstCity: randomCities[0].city,
      firstCityTemp: Math.round(firstCityResponse.variables(0)!.value()),
      secondCity: randomCities[1].city,
      secondCityTemp: Math.round(secondCityResponse.variables(0)!.value())
   };  

  return gameData;
};

export default function Index() {
  const gameData = useLoaderData<typeof loader>();

  const [citySelected, setCitySelected] = useState(false);
  const [score, setScore] = useState(0);

  const handleCityClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    console.log(event.target);
    setCitySelected(true);
    setScore(score + 1);
    console.log((event.target as EventTarget & HTMLElement).id);
    setCitySelected(true);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }

  return (
    <div className="main-container">
      <h1> WHICH CITY IS COLDER?</h1>
      <div className="game-container">
        <div className="city-card">
          <span>{gameData.firstCity}</span>
          <span>{gameData.firstCityTemp}°C</span>
          <div id="city1" className={`question ${citySelected ? 'citySelected' : ''}`} onClick={handleCityClick}>
            <span>{gameData.firstCity}</span>
          </div>
        </div>
        <div className="city-card">
          <span>{gameData.secondCity}</span>
          <span>{gameData.secondCityTemp}°C</span>
          <div id="city2" className={`question ${citySelected ? 'citySelected' : ''}`}  onClick={handleCityClick}>
            <span>{gameData.secondCity}</span>          
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
