import { useDataStore } from "@bungie/datastore/DataStoreHooks";
import { CircularProgress, Stack } from "@mui/material";
import React from "react";
import fiveDayForecastDataStore from "../../../Global/FiveDayDataStore";
import _ from "underscore";
import WindItem from "./WindItem";

const WindDisplay = () => {
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
            <WindItem key={index} forecast={forecast} index={index} />
          )
        )}
      </Stack>
    );
  }
};

export default WindDisplay;
