import { useDataStore } from "@bungie/datastore/DataStoreHooks";
import { CircularProgress, Stack } from "@mui/material";
import React from "react";
import fiveDayForecastDataStore from "../../../Global/FiveDayDataStore";
import _ from "underscore";
import PrecipitationItem from "./PrecipitationItem";

const PrecipitationDisplay = () => {
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
            <PrecipitationItem key={index} forecast={forecast} index={index} />
          )
        )}
      </Stack>
    );
  }
};

export default PrecipitationDisplay;
