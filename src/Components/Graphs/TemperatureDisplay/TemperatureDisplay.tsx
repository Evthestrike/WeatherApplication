import { useDataStore } from "@bungie/datastore/DataStoreHooks";
import { CircularProgress, Stack } from "@mui/material";
import React from "react";
import fiveDayForecastDataStore from "../../../Global/FiveDayDataStore";
import TemperatureItem from "./TemperatureItem";
import _ from "underscore";

const TemperatureDisplay = () => {
  const forecastData = useDataStore(fiveDayForecastDataStore);
  if (typeof forecastData.fiveDayForecast === "undefined") {
    return <CircularProgress />;
  } else {
    return (
      <Stack
        direction="row"
        justifyContent="space-between"
        spacing={0}
        flexWrap="wrap"
      >
        {_.map(
          forecastData.fiveDayForecast.days[forecastData.displayedDayIndex]
            .forecasts,
          (forecast, index) => (
            <TemperatureItem key={index} forecast={forecast} index={index} />
          )
        )}
      </Stack>
    );
  }
};

export default TemperatureDisplay;
