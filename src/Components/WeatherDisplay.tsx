import React, { useEffect } from "react";
import Container from "@mui/material/Container";
import ForecastDisplay from "./ForecastDisplay/ForecastDisplay";
import Graphs from "./Graphs/Graphs";
import WeekForecast from "./WeekForecast/WeekForecast";
import { FiveDayForecast, getFiveDayForecast } from "../GetForecast";
import fiveDayForecastDataStore from "../Global/FiveDayDataStore";
import { useDataStore } from "@bungie/datastore/DataStoreHooks";

const WeatherDisplay = () => {
  useEffect(() => {
    getFiveDayForecast({ lat: 47.67334, lon: -116.773819, units: "imperial" })
      .then(fiveDayForecastDataStore.actions.setFiveDayForecast)
      .catch(console.log);
  }, []);

  return (
    <Container>
      <ForecastDisplay />
      <Graphs />
      <WeekForecast />
    </Container>
  );
};

export default WeatherDisplay;
